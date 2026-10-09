// =====================================================================
// STEADY PLATE — app logic. Everything is saved on the device you use.
// =====================================================================
(function () {
  "use strict";

  // ---------- data ----------
  const recipes = RECIPES.map((r, i) => ({ tags: [], cuisine: "Everyday", ...r, id: i }));
  const CUISINES = ["Persian", "Mediterranean", "Asian", "Mexican", "Italian", "Swedish", "Everyday"];
  const byName = new Map(recipes.map(r => [r.name, r]));
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const SLOTS = [["b", "Breakfast"], ["l", "Lunch"], ["d", "Dinner"]];

  // ---------- storage ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("sp-" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("sp-" + k, JSON.stringify(v)); } catch (e) { } }
  };
  let favs = new Set(store.get("favs", []));
  let pins = new Set(store.get("pins", []));
  let plan = store.get("plan", null) || DAYS.map(() => ({ b: null, l: null, d: null }));
  let shop = store.get("shop", []);
  let boost = store.get("boost", true);
  let serv = store.get("serv", {}); // recipe name -> servings you usually make
  const saveAll = () => { store.set("favs", [...favs]); store.set("pins", [...pins]); store.set("plan", plan); store.set("shop", shop); store.set("boost", boost); store.set("serv", serv); };

  // ---------- scaling amounts ----------
  const FR = { "½": .5, "¼": .25, "¾": .75, "⅓": 1 / 3, "⅔": 2 / 3 };
  const QTY = /(\d+(?:[.,]\d+)?\s?[½¼¾⅓⅔]?|[½¼¾⅓⅔])(?:\s?[–-]\s?(\d+(?:[.,]\d+)?[½¼¾⅓⅔]?|[½¼¾⅓⅔]))?/g;
  const parseQ = q => { q = q.replace(/\s/g, ""); const m = q.match(/^(\d+(?:[.,]\d+)?)?([½¼¾⅓⅔])?$/); if (!m) return NaN; return (m[1] ? parseFloat(m[1].replace(",", ".")) : 0) + (m[2] ? FR[m[2]] : 0); };
  function fmtQ(v, unit) {
    if (/^(g|ml)$/.test(unit)) { const st = v >= 500 ? 25 : v >= 50 ? 10 : 5; return String(Math.max(st, Math.round(v / st) * st)); }
    if (/^(kg|l|litres?|litre)$/.test(unit)) return String(Math.round(v * 10) / 10).replace(/\.0$/, "");
    if (v > 10) return String(Math.round(v));
    const q = Math.max(.25, Math.round(v * 4) / 4), w = Math.floor(q), f = q - w;
    const fs = { .25: "¼", .5: "½", .75: "¾" }[f] || "";
    return (w ? String(w) : "") + fs || "¼";
  }
  function scaleText(text, f) {
    if (Math.abs(f - 1) < 1e-6) return text;
    return text.replace(QTY, (m, a, b, off) => {
      const after = text.slice(off + m.length);
      if (/^\s?(°|cm|mm|min|minute|hour|h\b|%|sec|day|week)/i.test(after)) return m;
      const open = text.lastIndexOf("(", off), close = text.indexOf(")", off);
      if (open !== -1 && close !== -1 && text.lastIndexOf(")", off) < open && /each/i.test(text.slice(open, close))) return m;
      const unit = ((after.match(/^\s?(kg|g|ml|litres?|litre|l)\b/i) || [])[1] || "").toLowerCase();
      const va = parseQ(a); if (isNaN(va)) return m;
      let out = fmtQ(va * f, unit);
      if (b) { const vb = parseQ(b); if (!isNaN(vb)) out += "–" + fmtQ(vb * f, unit); }
      return (/\s$/.test(m) ? out + " " : out);
    });
  }
  const servingsFor = r => serv[r.name] || r.servings;
  const scaledIngredients = r => { const f = servingsFor(r) / r.servings; return r.ingredients.map(x => scaleText(x, f)); };

  const ui = { view: "recipes", meal: store.get("meal", "breakfast"), speed: "all", cuisine: "all", q: "", openName: null, confirmClear: false };

  // ---------- photos (IndexedDB, on this device) ----------
  const photos = new Map(); // name -> objectURL
  let db = null;
  function idbOpen() {
    return new Promise(res => {
      try {
        const rq = indexedDB.open("steady-plate", 1);
        rq.onupgradeneeded = () => rq.result.createObjectStore("photos");
        rq.onsuccess = () => res(rq.result);
        rq.onerror = () => res(null);
      } catch (e) { res(null); }
    });
  }
  function idbDo(mode, fn) {
    return new Promise(res => {
      if (!db) return res(null);
      try { const tx = db.transaction("photos", mode); const rq = fn(tx.objectStore("photos")); tx.oncomplete = () => res(rq && rq.result); tx.onerror = () => res(null); }
      catch (e) { res(null); }
    });
  }
  async function loadPhotos() {
    db = await idbOpen();
    if (!db) return;
    const keys = await idbDo("readonly", s => s.getAllKeys()) || [];
    for (const k of keys) {
      const blob = await idbDo("readonly", s => s.get(k));
      if (blob) photos.set(k, URL.createObjectURL(blob));
    }
    if (keys.length) renderView();
  }
  function resize(file) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.onload = () => {
        const max = 1000, sc = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        c.toBlob(b => b ? res(b) : rej(), "image/jpeg", .84);
        URL.revokeObjectURL(img.src);
      };
      img.onerror = rej;
      img.src = URL.createObjectURL(file);
    });
  }

  // ---------- helpers ----------
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const CUIS_COLOR = { Persian: "#c98a1b", Mediterranean: "#2f7fa0", Asian: "#c0392b", Mexican: "#d35f2a", Italian: "#3f8a3f", Swedish: "#2b5fa8", Everyday: "#6b7a70" };
  // size: "card" | "hero" | "thumb"
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  function pic(r, size) {
    if (photos.has(r.name)) return `<img src="${photos.get(r.name)}" alt="${esc(r.name)}">`;
    const src = r.image || (window.PHOTOS && window.PHOTOS[slug(r.name)]);
    if (!src) return `<div class="ph-wait"></div>`;
    return `<img src="${esc(src)}" alt="${esc(r.name)}" decoding="async">`;
    const c = r.family ? "#9b4f96" : (CUIS_COLOR[r.cuisine] || "#6b7a70");
    if (size === "thumb") return `<div class="ph" style="--c:${c}"></div>`;
    return `<div class="ph ${size === "hero" ? "ph-hero" : ""}" style="--c:${c}">
      <button class="ph-btn" data-act="photo" data-id="${r.id}" aria-label="Add a photo of ${esc(r.name)}">${I.cam}<span>${size === "hero" ? "Add your photo" : "Add photo"}</span></button></div>`;
  }
  const I = {
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.2-8.6C1.3 8.4 3 5 6.4 5c2 0 3.3 1.1 4 2.3h3.2C14.3 6.1 15.6 5 17.6 5 21 5 22.7 8.4 21.2 11.4 19 15.6 12 20 12 20z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M9 3h6l-1 6 4 3v2h-5v6l-1 1-1-1v-6H6v-2l4-3z"/></svg>',
    swap: '<svg viewBox="0 0 24 24"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    cam: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    kid: '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/></svg>'
  };
  let toastT;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, 2200); }

  function card(r) {
    return `<article class="card" data-act="open" data-id="${r.id}" tabindex="0" aria-label="${esc(r.name)}">
      <div class="pic">${pic(r, "card")}</div>
      ${r.speed === "quick" ? '<span class="badge-fast">Fast</span>' : ""}
      <div class="icons">
        <button class="ico pin" data-act="pin" data-id="${r.id}" aria-pressed="${pins.has(r.name)}" aria-label="Pin">${I.pin}</button>
        <button class="ico heart" data-act="fav" data-id="${r.id}" aria-pressed="${favs.has(r.name)}" aria-label="Favourite">${I.heart}</button>
      </div>
      <div class="body">
        <span class="eyebrow">${r.family ? "Our recipe · " : ""}${esc(r.cuisine)}</span>
        <h3>${esc(r.name)}</h3>
        <div class="facts"><span><b>${r.time}</b> min</span><span><b>${r.protein}g</b> protein</span><span><b>${r.carbs}g</b> carbs</span></div>
      </div>
    </article>`;
  }

  // ---------- top bar ----------
  function renderTop() {
    const t = $("#topbar");
    if (ui.view === "recipes") {
      t.innerHTML = `
        <div class="brand"><img class="logo" src="logo.png" alt="" width="48" height="48"><h1>Steady<span>Plate</span></h1></div>
        <div class="seg" role="group" aria-label="Meal">
          <button data-act="meal" data-v="breakfast" aria-pressed="${ui.meal === "breakfast"}">Breakfast</button>
          <button data-act="meal" data-v="main" aria-pressed="${ui.meal === "main"}">Lunch &amp; Dinner</button>
        </div>
        <div class="row">
          <input class="search" id="search" type="search" placeholder="Search: chicken, salmon…" aria-label="Search recipes" value="${esc(ui.q)}">
          <button class="chip" data-act="speed" data-v="all" aria-pressed="${ui.speed === "all"}">All</button>
          <button class="chip" data-act="speed" data-v="quick" aria-pressed="${ui.speed === "quick"}">Fast</button>
          <button class="chip" data-act="speed" data-v="normal" aria-pressed="${ui.speed === "normal"}">Normal</button>
        </div>
        <div class="cuis" role="group" aria-label="Cuisine">
          ${["all", "family", ...CUISINES].map(c => `<button class="chip" data-act="cuisine" data-v="${c}" aria-pressed="${ui.cuisine === c}">${c === "all" ? "All cuisines" : c === "family" ? "Our recipes" : c}</button>`).join("")}
        </div>`;
      $("#search").oninput = e => { ui.q = e.target.value; renderRecipes(); };
    } else {
      const titles = { favs: "Favourites", week: "My week", shop: "Shopping list" };
      t.innerHTML = `<h2 class="view-title">${titles[ui.view]}</h2>`;
    }
  }

  // ---------- views ----------
  function renderRecipes() {
    const q = ui.q.trim().toLowerCase();
    const list = recipes.filter(r => r.meal === ui.meal && (ui.speed === "all" || r.speed === ui.speed) && (ui.cuisine === "all" || (ui.cuisine === "family" ? r.family : r.cuisine === ui.cuisine)) &&
      (!q || (r.name + " " + r.ingredients.join(" ") + " " + r.tags.join(" ")).toLowerCase().includes(q)));
    const pinned = recipes.filter(r => pins.has(r.name));
    let h = "";
    if (pinned.length && !q) h += `<h2 class="sec">Pinned</h2><div class="strip">${pinned.map(card).join("")}</div>`;
    h += `<h2 class="sec">${list.length} ${ui.cuisine === "all" ? "" : ui.cuisine === "family" ? "of our own " : ui.cuisine + " "}${ui.meal === "breakfast" ? "breakfasts" : "lunches & dinners"}</h2>`;
    h += list.length ? `<div class="grid">${list.map(card).join("")}</div>` : `<p class="empty">Nothing matches. Try another word.</p>`;
    $("#v-recipes").innerHTML = h;
  }

  function renderFavs() {
    const pinned = recipes.filter(r => pins.has(r.name));
    const fav = recipes.filter(r => favs.has(r.name));
    let h = `<h2 class="sec">Pinned</h2>` + (pinned.length ? `<div class="grid">${pinned.map(card).join("")}</div>` : `<p class="empty">Tap the pin on a recipe to keep it at the top.</p>`);
    h += `<h2 class="sec">Favourites</h2>` + (fav.length ? `<div class="grid">${fav.map(card).join("")}</div>` : `<p class="empty">Tap the heart on any recipe to save it here. Favourites show up more often in your week plan.</p>`);
    $("#v-favs").innerHTML = h;
  }

  function renderWeek() {
    let h = `<div class="actions">
        <button class="btn" data-act="suggest">Suggest my week</button>
        <button class="btn ghost" data-act="week-to-shop">Add week to shopping list</button>
      </div>
      <label class="check"><input type="checkbox" id="boost" ${boost ? "checked" : ""}> Use my favourites more often</label>`;
    DAYS.forEach((d, di) => {
      h += `<div class="day"><h3>${d}</h3>`;
      SLOTS.forEach(([k, label]) => {
        const r = plan[di][k] && byName.get(plan[di][k]);
        h += `<div class="slot">
          <div class="thumb">${r ? pic(r, "thumb") : ""}</div>
          <div><div class="lbl">${label}</div>${r
            ? `<button class="nm" data-act="open" data-id="${r.id}">${esc(r.name)}</button>`
            : `<span class="nm none">Nothing planned</span>`}</div>
          <div class="acts">${r
            ? `<button class="mini" data-act="swap" data-day="${di}" data-slot="${k}" aria-label="Swap ${label}">${I.swap}</button>
               <button class="mini" data-act="clear-slot" data-day="${di}" data-slot="${k}" aria-label="Remove ${label}">${I.x}</button>`
            : `<button class="mini" data-act="swap" data-day="${di}" data-slot="${k}" aria-label="Suggest ${label}">${I.plus}</button>`}</div>
        </div>`;
      });
      h += `</div>`;
    });
    h += `<div class="actions"><button class="btn danger small" data-act="clear-week">Clear week</button></div>`;
    $("#v-week").innerHTML = h;
    $("#boost").onchange = e => { boost = e.target.checked; saveAll(); };
  }

  const CATS = ["Fruit & veg", "Meat & fish", "Dairy & eggs", "Pantry", "Other"];
  function category(text) {
    const t = text.toLowerCase();
    if (/\b(stock|paste|sauce|spice|powder|vinegar|flour|can |canned|passata|seeds|oil|mustard|salsa|coconut milk|curry|pesto|capers|honey|cocoa|baking|vanilla|cinnamon|cumin|paprika|oregano|sweetener|peanut butter|tahini|nuts|walnut|almond|hemp|flax|chia|beans|olives|sun-dried|cream of tartar|allspice|caraway|fennel|sesame|worcestershire|fish sauce|soy|saffron|sumac|dijon|turmeric|barberr|dried lime|fenugreek|raisin|kimchi|nori|chipotle|edamame|tofu|nutmeg|peanuts)/.test(t) && !/almond milk|soy milk|green beans/.test(t)) return "Pantry";
    if (/(chicken|turkey|beef|lamb|salmon|cod|tuna|shrimp|mackerel|fish|steak|sausage|mince|pollock|sirloin)/.test(t)) return "Meat & fish";
    if (/(spinach|tomato|pepper|onion|garlic|zucchini|broccoli|lettuce|cucumber|avocado|lemon|lime|berr|cauliflower|cabbage|mushroom|leek|carrot|celery|asparagus|green beans|dill|parsley|mint|basil|coriander|chives|rocket|ginger|eggplant|radish|peas|celeriac|chili|herbs|salad|leaves|thyme|rosemary|banana|snap|romaine|coleslaw|spring onion)/.test(t)) return "Fruit & veg";
    if (/(egg|yogurt|yoghurt|cheese|feta|halloumi|mozzarella|parmesan|cottage|kvarg|skyr|milk|cream|ricotta|butter|crème|tzatziki|keso)/.test(t)) return "Dairy & eggs";
    return "Other";
  }
  function addShop(text, from) {
    const key = text.trim().toLowerCase();
    if (!key) return;
    const ex = shop.find(i => !i.done && i.text.toLowerCase() === key);
    if (ex) { ex.n = (ex.n || 1) + 1; if (from && !ex.from.includes(from)) ex.from.push(from); return; }
    shop.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text: text.trim(), cat: from ? category(text) : "Other", done: false, n: 1, from: from ? [from] : [] });
  }

  function renderShop() {
    const left = shop.filter(i => !i.done).length;
    let h = `<form class="add-row" id="shop-form">
        <input id="shop-input" placeholder="Add an item, e.g. coffee" aria-label="New item" autocomplete="off">
        <button class="btn" type="submit">Add</button>
      </form>
      <div class="actions"><button class="btn ghost small" data-act="week-to-shop">Add this week's meals</button>
      ${shop.length ? `<button class="btn ghost small" data-act="copy">Copy list</button>` : ""}</div>`;
    if (!shop.length) h += `<p class="empty">Your list is empty. Add items above, or tap "Add this week's meals" to fill it from your plan.</p>`;
    CATS.forEach(cat => {
      const items = shop.filter(i => i.cat === cat);
      if (!items.length) return;
      items.sort((a, b) => a.done - b.done);
      h += `<div class="shop-group"><h3>${cat}</h3>${items.map(i => `
        <div class="item ${i.done ? "done" : ""}">
          <input type="checkbox" id="i-${i.id}" data-act="shop-toggle" data-sid="${i.id}" ${i.done ? "checked" : ""}>
          <label for="i-${i.id}">${esc(i.text)}${i.n > 1 ? ` <b>×${i.n}</b>` : ""}${i.from.length ? `<small>${esc(i.from.join(", "))}</small>` : ""}</label>
          <button class="x" data-act="shop-del" data-sid="${i.id}" aria-label="Remove">✕</button>
        </div>`).join("")}</div>`;
    });
    if (shop.length) h += `<div class="actions">
        <button class="btn ghost small" data-act="shop-clear-done">Remove ticked items</button>
        <button class="btn danger small" data-act="shop-clear-all">${ui.confirmClear ? "Tap again to clear all" : "Clear list"}</button></div>`;
    $("#v-shop").innerHTML = h;
    $("#shop-form").onsubmit = e => { e.preventDefault(); const v = $("#shop-input").value; if (v.trim()) { addShop(v); saveAll(); renderShop(); updateCount(); $("#shop-input").focus(); } };
    updateCount();
  }
  function updateCount() { const n = shop.filter(i => !i.done).length, c = $("#shop-count"); c.hidden = !n; c.textContent = n; }

  function renderView() {
    ({ recipes: renderRecipes, favs: renderFavs, week: renderWeek, shop: renderShop })[ui.view]();
    updateCount();
  }
  function go(view) {
    ui.view = view; ui.confirmClear = false;
    document.querySelectorAll("section[data-view]").forEach(s => s.hidden = s.dataset.view !== view);
    document.querySelectorAll("nav.bottom button").forEach(b => b.dataset.nav === view ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current"));
    renderTop(); renderView(); window.scrollTo(0, 0);
  }

  // ---------- planner ----------
  function rule(di, k) {
    const weekend = di >= 5;
    if (k === "b") return r => r.meal === "breakfast" && (weekend || r.speed === "quick");
    if (k === "l") return r => r.meal === "main" && r.speed === "quick";
    return r => r.meal === "main" && (di < 4 || r.speed === "normal");
  }
  function choose(pred, used, avoid) {
    let pool = recipes.filter(r => pred(r) && !used.has(r.name));
    if (!pool.length) pool = recipes.filter(pred);
    if (avoid && avoid.size) { const varied = pool.filter(r => !avoid.has(r.cuisine)); if (varied.length) pool = varied; }
    const w = pool.map(r => boost ? 1 + (favs.has(r.name) ? 3 : 0) + (pins.has(r.name) ? 3 : 0) : 1);
    let x = Math.random() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) { x -= w[i]; if (x <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
  function usedNames() { const u = new Set(); plan.forEach(p => SLOTS.forEach(([k]) => p[k] && u.add(p[k]))); return u; }
  function suggestWeek() {
    const used = new Set();
    let yesterdayDinner = null;
    plan = DAYS.map((_, di) => {
      const o = {}, today = new Set();
      SLOTS.forEach(([k]) => {
        const avoid = new Set(k === "b" ? [] : [...today]);
        if (k === "d" && yesterdayDinner) avoid.add(yesterdayDinner);
        const r = choose(rule(di, k), used, avoid);
        used.add(r.name); o[k] = r.name;
        if (k !== "b") today.add(r.cuisine);
        if (k === "d") yesterdayDinner = r.cuisine;
      });
      return o;
    });
  }
  function weekToShop() {
    let n = 0;
    plan.forEach(p => SLOTS.forEach(([k]) => { const r = p[k] && byName.get(p[k]); if (r) { scaledIngredients(r).forEach(i => addShop(i, r.name)); n++; } }));
    saveAll();
    return n;
  }

  // ---------- recipe sheet ----------
  function openRecipe(r) {
    ui.openName = r.name;
    const todayIdx = (new Date().getDay() + 6) % 7;
    const defSlot = r.meal === "breakfast" ? "b" : "d";
    const sh = $("#sheet");
    sh.innerHTML = `
      <div class="hero">${pic(r, "hero")}<button class="close" data-act="close" aria-label="Close">✕</button><button class="cam" data-act="photo" data-id="${r.id}">${I.cam}<span>${photos.has(r.name) ? "Change my photo" : "Use my own photo"}</span></button></div>
      <div class="sheet-in">
        <div class="title-row">
          <h2 id="d-name">${esc(r.name)}</h2>
          <div class="icons">
            <button class="ico pin" data-act="pin" data-id="${r.id}" aria-pressed="${pins.has(r.name)}" aria-label="Pin">${I.pin}</button>
            <button class="ico heart" data-act="fav" data-id="${r.id}" aria-pressed="${favs.has(r.name)}" aria-label="Favourite">${I.heart}</button>
          </div>
        </div>
        <div class="stats">
          <div class="stat"><b>${r.time}</b><span>min</span></div>
          <div class="stat"><b>${r.protein}g</b><span>protein</span></div>
          <div class="stat"><b>${r.carbs}g</b><span>carbs</span></div>
          <div class="stat"><b>${r.kcal}</b><span>kcal</span></div>
        </div>
        <p class="note">${r.family ? "Our recipe · " : ""}${esc(r.cuisine)} · nutrition per adult serving${r.tags.length ? " · " + r.tags.map(esc).join(" · ") : ""}</p>
        <div class="servings" id="servings"></div>
        <div class="kids">${I.kid}<div><b>For the kids</b><p>${esc(r.kids)}</p></div></div>
        <div><h4>You need</h4><ul class="ingr" id="ingr-list"></ul></div>
        <div><h4>Steps</h4><p class="note" id="steps-note" hidden></p><ol class="steps">${r.steps.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
        <div class="plan-box">
          <h4 style="margin:0">Add to my week</h4>
          <div class="row">
            <select id="pl-day" aria-label="Day">${DAYS.map((d, i) => `<option value="${i}" ${i === todayIdx ? "selected" : ""}>${d}</option>`).join("")}</select>
            <select id="pl-slot" aria-label="Meal">${SLOTS.map(([k, l]) => `<option value="${k}" ${k === defSlot ? "selected" : ""}>${l}</option>`).join("")}</select>
            <button class="btn small" data-act="plan-add" data-id="${r.id}">Add</button>
          </div>
        </div>
        <div class="actions">
          <button class="btn ghost" data-act="ing-to-shop" data-id="${r.id}">Add to shopping list</button>
          ${photos.has(r.name) ? `<button class="btn danger" data-act="photo-del" data-id="${r.id}">Go back to original photo</button>` : ""}
        </div>
      </div>`;
    renderServings(r);
    sh.hidden = false; $("#scrim").hidden = false;
    sh.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }
  function renderServings(r) {
    const n = servingsFor(r), changed = n !== r.servings;
    $("#servings").innerHTML = `
      <span class="sv-label">Servings</span>
      <div class="stepper">
        <button data-act="serv" data-d="-1" data-id="${r.id}" aria-label="Fewer servings" ${n <= 1 ? "disabled" : ""}>−</button>
        <b aria-live="polite">${n}</b>
        <button data-act="serv" data-d="1" data-id="${r.id}" aria-label="More servings" ${n >= 24 ? "disabled" : ""}>+</button>
      </div>
      ${changed ? `<span class="sv-hint">${n > r.servings ? "+" + (n - r.servings) + " for leftovers" : "smaller batch"}</span><button class="sv-reset" data-act="serv-reset" data-id="${r.id}">Reset to ${r.servings}</button>` : `<span class="sv-hint">Tap + to make extra for leftovers</span>`}`;
    const done = new Set([...document.querySelectorAll("#ingr-list input:checked")].map(i => i.id));
    const open = new Set([...document.querySelectorAll("#ingr-list .swaps:not([hidden])")].map(p => p.id));
    $("#ingr-list").innerHTML = scaledIngredients(r).map((x, i) => { const sw = window.getSwaps ? window.getSwaps(r, r.ingredients[i], i) : null; const op = open.has("sw-" + i); return `<li><div class="ing-row"><label><input type="checkbox" id="ing-${i}" ${done.has("ing-" + i) ? "checked" : ""}><span>${esc(x)}</span></label>${sw ? `<button class="swap" data-act="swap-ing" data-i="${i}" aria-expanded="${op}" aria-controls="sw-${i}">${op ? "Hide" : "Swap"}</button>` : ""}</div>${sw ? `<p class="swaps" id="sw-${i}" ${op ? "" : "hidden"}>Or use: ${sw.map(esc).join(" · ")}</p>` : ""}</li>`; }).join("");
    const sn = $("#steps-note"); sn.hidden = !changed; sn.textContent = changed ? `Amounts in the steps are for the original ${r.servings} servings. Cooking times stay about the same; use a bigger pan or two trays if needed.` : "";
  }
  function closeSheet() { $("#sheet").hidden = true; $("#scrim").hidden = true; document.body.style.overflow = ""; ui.openName = null; }

  // ---------- events ----------
  let photoFor = null;
  document.addEventListener("click", async e => {
    const nav = e.target.closest("[data-nav]");
    if (nav) { closeSheet(); go(nav.dataset.nav); return; }
    if (e.target.id === "scrim") { closeSheet(); return; }
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    const r = el.dataset.id != null ? recipes[+el.dataset.id] : null;
    if (act !== "open" && act !== "shop-toggle") e.stopPropagation();

    switch (act) {
      case "open": openRecipe(r); break;
      case "close": closeSheet(); break;
      case "meal": ui.meal = el.dataset.v; store.set("meal", ui.meal); renderTop(); renderRecipes(); break;
      case "speed": ui.speed = el.dataset.v; renderTop(); renderRecipes(); break;
      case "cuisine": { const sc = el.parentElement.scrollLeft; ui.cuisine = el.dataset.v; renderTop(); const row = document.querySelector(".cuis"); if (row) row.scrollLeft = sc; renderRecipes(); break; }
      case "fav":
        favs.has(r.name) ? favs.delete(r.name) : favs.add(r.name); saveAll();
        document.querySelectorAll(`[data-act="fav"][data-id="${r.id}"]`).forEach(b => b.setAttribute("aria-pressed", favs.has(r.name)));
        toast(favs.has(r.name) ? "Added to favourites" : "Removed from favourites");
        if (ui.view === "favs") renderFavs();
        break;
      case "pin":
        pins.has(r.name) ? pins.delete(r.name) : pins.add(r.name); saveAll();
        toast(pins.has(r.name) ? "Pinned to the top" : "Unpinned");
        renderView();
        if (ui.openName) openRecipe(r);
        break;
      case "suggest": suggestWeek(); saveAll(); renderWeek(); toast("Here's a fresh week"); break;
      case "swap": {
        const di = +el.dataset.day, k = el.dataset.slot;
        const other = plan[di][k === "l" ? "d" : "l"]; const avoid = new Set(k !== "b" && other && byName.get(other) ? [byName.get(other).cuisine] : []);
        plan[di][k] = choose(rule(di, k), usedNames(), avoid).name; saveAll(); renderWeek(); break;
      }
      case "clear-slot": plan[+el.dataset.day][el.dataset.slot] = null; saveAll(); renderWeek(); break;
      case "clear-week": plan = DAYS.map(() => ({ b: null, l: null, d: null })); saveAll(); renderWeek(); toast("Week cleared"); break;
      case "week-to-shop": {
        const n = weekToShop();
        if (!n) { toast("Plan some meals first"); break; }
        toast(`Added ingredients for ${n} meals`); updateCount();
        if (ui.view === "shop") renderShop();
        break;
      }
      case "plan-add": {
        const di = +$("#pl-day").value, k = $("#pl-slot").value;
        plan[di][k] = r.name; saveAll();
        toast(`Added to ${DAYS[di]} ${SLOTS.find(s => s[0] === k)[1].toLowerCase()}`);
        if (ui.view === "week") renderWeek();
        break;
      }
      case "ing-to-shop": scaledIngredients(r).forEach(i => addShop(i, r.name)); saveAll(); updateCount(); toast("Added to shopping list"); if (ui.view === "shop") renderShop(); break;
      case "shop-toggle": { const it = shop.find(i => i.id === el.dataset.sid); if (it) { it.done = el.checked; saveAll(); renderShop(); } break; }
      case "shop-del": shop = shop.filter(i => i.id !== el.dataset.sid); saveAll(); renderShop(); break;
      case "shop-clear-done": shop = shop.filter(i => !i.done); saveAll(); renderShop(); break;
      case "shop-clear-all":
        if (!ui.confirmClear) { ui.confirmClear = true; renderShop(); setTimeout(() => { if (ui.confirmClear) { ui.confirmClear = false; if (ui.view === "shop") renderShop(); } }, 4000); }
        else { shop = []; ui.confirmClear = false; saveAll(); renderShop(); toast("List cleared"); }
        break;
      case "copy": {
        const text = CATS.map(c => { const it = shop.filter(i => i.cat === c && !i.done); return it.length ? c + ":\n" + it.map(i => "- " + i.text + (i.n > 1 ? " ×" + i.n : "")).join("\n") : ""; }).filter(Boolean).join("\n\n");
        try { await navigator.clipboard.writeText(text); toast("List copied"); }
        catch (err) {
          const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
          let ok = false; try { ok = document.execCommand("copy"); } catch (e2) { }
          ta.remove(); toast(ok ? "List copied" : "Copying isn't allowed here");
        }
        break;
      }
      case "serv": { const n = Math.min(24, Math.max(1, servingsFor(r) + +el.dataset.d)); if (n === r.servings) delete serv[r.name]; else serv[r.name] = n; saveAll(); renderServings(r); break; }
      case "serv-reset": delete serv[r.name]; saveAll(); renderServings(r); break;
      case "swap-ing": { const p = document.getElementById("sw-" + el.dataset.i); p.hidden = !p.hidden; el.setAttribute("aria-expanded", String(!p.hidden)); el.textContent = p.hidden ? "Swap" : "Hide"; break; }
      case "photo": photoFor = r; $("#photo-input").value = ""; $("#photo-input").click(); break;
      case "photo-del":
        await idbDo("readwrite", s => s.delete(r.name));
        if (photos.has(r.name)) URL.revokeObjectURL(photos.get(r.name));
        photos.delete(r.name); renderView(); openRecipe(r); toast("Original photo restored");
        break;
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !$("#sheet").hidden) closeSheet();
    const c = e.target.closest && e.target.closest(".card");
    if (c && e.target === c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openRecipe(recipes[+c.dataset.id]); }
  });
  $("#photo-input").addEventListener("change", async e => {
    const f = e.target.files && e.target.files[0];
    if (!f || !photoFor) return;
    try {
      const blob = await resize(f);
      if (db) await idbDo("readwrite", s => s.put(blob, photoFor.name));
      if (photos.has(photoFor.name)) URL.revokeObjectURL(photos.get(photoFor.name));
      photos.set(photoFor.name, URL.createObjectURL(blob));
      renderView(); if (ui.openName === photoFor.name) openRecipe(photoFor);
      toast(db ? "Photo saved" : "Photo shown, but this browser can't save it");
    } catch (err) { toast("That file couldn't be opened as a photo"); }
  });

  // ---------- start ----------
  if (!["breakfast", "main"].includes(ui.meal)) ui.meal = "breakfast";
  go("recipes");
  loadPhotos();
  // dish photos arrive in 4 bundles; refresh pictures as each one lands
  let photoT;
  window.onPhotos = () => { clearTimeout(photoT); photoT = setTimeout(() => { renderView(); if (ui.openName) { const r = byName.get(ui.openName); const h = document.querySelector(".hero"); if (r && h && h.querySelector(".ph-wait")) h.querySelector(".ph-wait").outerHTML = pic(r, "hero"); } }, 60); };
  [1, 2, 3, 4].forEach(n => { const sc = document.createElement("script"); sc.src = "photos-" + n + ".js"; sc.async = true; document.body.appendChild(sc); });
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => { });
})();
