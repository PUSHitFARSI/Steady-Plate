// =====================================================================
// STEADY PLATE — app logic. Everything is saved on the device you use.
// =====================================================================
(function () {
  "use strict";

  // ---------- data ----------
  const recipes = RECIPES.map((r, i) => ({ tags: [], cuisine: "Everyday", ...r, id: i }));
  const CUISINES = ["Persian", "Mediterranean", "Asian", "Mexican", "Italian", "Swedish", "Everyday"];
  const byName = new Map(recipes.map(r => [r.name, r]));
  const SLOTS = ["b", "l", "d"];
  const CATS = ["Fruit & veg", "Meat & fish", "Dairy & eggs", "Pantry", "Other"];

  // ---------- storage ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("sp-" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("sp-" + k, JSON.stringify(v)); } catch (e) { } }
  };
  let favs = new Set(store.get("favs", []));
  let pins = new Set(store.get("pins", []));
  let plan = store.get("plan", null) || [0, 1, 2, 3, 4, 5, 6].map(() => ({ b: null, l: null, d: null }));
  let shop = store.get("shop", []);
  let boost = store.get("boost", true);
  let serv = store.get("serv", {});      // recipe name -> servings you usually make
  let eaten = store.get("eaten", {});    // recipe name -> ["2026-10-11", ...]
  let have = new Set(store.get("have", []));
  let edits = store.get("edits", {});        // recipe name -> your changes (name, time, ingredients, steps, kids, note)
  let mine = store.get("mine", []);          // your own recipes
  let planDone = store.get("planDone", {});  // "0b" -> true when that planned meal is eaten
  let carbGoal = store.get("carbGoal", 100);
  let catOrder = store.get("catOrder", null) || CATS.slice();
  CATS.forEach(c => { if (!catOrder.includes(c)) catOrder.push(c); });
  const saveAll = () => { store.set("favs", [...favs]); store.set("pins", [...pins]); store.set("plan", plan); store.set("shop", shop); store.set("boost", boost); store.set("serv", serv); store.set("eaten", eaten); store.set("have", [...have]); store.set("edits", edits); store.set("mine", mine); store.set("planDone", planDone); store.set("carbGoal", carbGoal); store.set("catOrder", catOrder); };
  const liveR = () => recipes.filter(r => !r.deleted);

  // ---------- language ----------
  const guessLang = () => { let n = (navigator.language || "en").slice(0, 2).toLowerCase(); if (n === "no" || n === "nn") n = "nb"; return LANGS.some(l => l.code === n) ? n : "en"; };
  const ui = { view: "recipes", meal: store.get("meal", "breakfast"), speed: "all", cuisine: "all", q: "", openName: null, confirmClear: false, lang: store.get("lang", null) || guessLang(), haveMode: false, nutOpen: store.get("nutOpen", false), g: { p: null, m: null, c: null } };
  const LI = () => Math.max(0, LANGS.findIndex(l => l.code === ui.lang));
  const BASE = ["en", "sv", "fa"]; // languages kept inside i18n.js
  const BI = () => BASE.indexOf(ui.lang);
  const extTR = () => (BI() < 0 && window.TR && window.TR[ui.lang]) || null;
  function t(key, vars) {
    const e = UI[key], x = extTR();
    let s = BI() >= 0 ? (e ? (e[BI()] ?? e[0]) : key) : ((x && x.ui && x.ui[key]) || (e ? e[0] : key));
    if (vars && typeof s === "string") for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }
  const loc = s => { const D = LANGS[LI()].digits; return D ? String(s).replace(/(\d)\.(?=\d)/g, "$1٫").replace(/\d/g, d => D[d]) : String(s); };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const tx = s => esc(loc(s));
  const TRL = () => (ui.lang !== "en" && window.TR && window.TR[ui.lang]) || null;
  const trR = r => { const T = TRL(); return T && T.recipes[r.name]; };
  const ed = r => (!r.own && edits[r.name]) || null;
  const baseName = r => r.own ? r.title : ((trR(r) || {}).name || r.name);
  const baseIngr = r => { const x = trR(r); return x && x.ingredients && x.ingredients.length === r.ingredients.length ? x.ingredients : r.ingredients; };
  const baseSteps = r => { const x = trR(r); return x && x.steps && x.steps.length === r.steps.length ? x.steps : r.steps; };
  const baseKids = r => (trR(r) || {}).kids || r.kids || "";
  const rName = r => (ed(r) && ed(r).name) || baseName(r);
  const rIngr = r => (ed(r) && ed(r).ingredients) || baseIngr(r);
  const rSteps = r => (ed(r) && ed(r).steps) || baseSteps(r);
  const rKids = r => { const e = ed(r); return e && e.kids != null ? e.kids : baseKids(r); };
  const rTime = r => (ed(r) && ed(r).time) || r.time;
  const rNote = r => r.own ? (r.note || "") : ((ed(r) && ed(r).note) || "");
  const tt = s => { const T = TRL(); return (T && T.text[s]) || s; };
  const cuisineName = c => t("c." + c);
  const G = () => esc(t("g"));
  const dayName = i => t("days")[i];
  const slotName = k => t({ b: "breakfast", l: "lunch", d: "dinner" }[k]);

  // ---------- scaling amounts ----------
  const FR = { "½": .5, "¼": .25, "¾": .75, "⅓": 1 / 3, "⅔": 2 / 3 };
  const QTY = /(\d+(?:[.,]\d+)?\s?[½¼¾⅓⅔]?|[½¼¾⅓⅔])(?:\s?[–-]\s?(\d+(?:[.,]\d+)?[½¼¾⅓⅔]?|[½¼¾⅓⅔]))?/g;
  const parseQ = q => { q = q.replace(/\s/g, ""); const m = q.match(/^(\d+(?:[.,]\d+)?)?([½¼¾⅓⅔])?$/); if (!m) return NaN; return (m[1] ? parseFloat(m[1].replace(",", ".")) : 0) + (m[2] ? FR[m[2]] : 0); };
  const UNIT = /^\s?(kg|g|ml|dl|litres?|litre|l|کیلوگرم|گرم|میلی‌لیتر|میلی لیتر|لیتر|كغ|غرام|غ|مل|لتر|κιλό|κιλά|γρ|λίτρ\S*)(?=[\s,.)؛،]|$)/i;
  const unitKind = u => /^(g|ml|گرم|میلی|غرام|غ$|مل$|γρ)/i.test(u) ? "g" : /^(kg|l|litre|litres|dl|کیلوگرم|لیتر|كغ|لتر|κιλ|λίτρ)/i.test(u) ? "kg" : "";
  function fmtQ(v, unit) {
    const k = unitKind(unit);
    if (k === "g") { const st = v >= 500 ? 25 : v >= 50 ? 10 : 5; return String(Math.max(st, Math.round(v / st) * st)); }
    if (k === "kg") return String(Math.round(v * 10) / 10).replace(/\.0$/, "");
    if (v > 10) return String(Math.round(v));
    const q = Math.max(.25, Math.round(v * 4) / 4), w = Math.floor(q), f = q - w;
    const fs = { .25: "¼", .5: "½", .75: "¾" }[f] || "";
    return (w ? String(w) : "") + fs || "¼";
  }
  function scaleText(text, f) {
    if (Math.abs(f - 1) < 1e-6) return text;
    return text.replace(QTY, (m, a, b, off) => {
      const after = text.slice(off + m.length);
      if (/^\s?(°|cm|mm|min|minute|hour|h\b|%|sec|day|week|tim|dag|veck|sek|dakika|saat|gün|minuut|tunti|päiv|minut|godz|dni|stund|uur|heure|jour|hora|día|ora|giorn|λεπτ|ώρ|ημέρ|دقیقه|ساعت|روز|هفته|سانت|درجه|دقيق|ساع|يوم|سم)/i.test(after)) return m;
      const open = text.lastIndexOf("(", off), close = text.indexOf(")", off);
      if (open !== -1 && close !== -1 && text.lastIndexOf(")", off) < open && /each|var\b|styck|\bst\b|هر|hver|cada|لكل|كل|ciascun|καθέν|\bje\b|chacun|tanesi|her biri|kukin|kappale|każd|sztuk|stück|stk/i.test(text.slice(open, close))) return m;
      const unit = (after.match(UNIT) || [])[1] || "";
      const va = parseQ(a); if (isNaN(va)) return m;
      let out = fmtQ(va * f, unit);
      if (b) { const vb = parseQ(b); if (!isNaN(vb)) out += "–" + fmtQ(vb * f, unit); }
      return (/\s$/.test(m) ? out + " " : out);
    });
  }
  const servingsFor = r => serv[r.name] || r.servings;
  const scaledIngredients = r => { const f = servingsFor(r) / r.servings; return rIngr(r).map(x => scaleText(x, f)); };
  const scaledEnglish = (r, f) => { f = f || servingsFor(r) / r.servings; return ((ed(r) && ed(r).ingredients) || r.ingredients).map(x => scaleText(x, f)); };

  // ---------- extra nutrition ----------
  const nutCache = new Map();
  const NUT_FIX = { "Soy-Marinated Eggs (Ajitama)": { salt: 1.4 } };
  const nutrition = r => { if (!nutCache.has(r.name)) nutCache.set(r.name, Object.assign(window.estimateNutrition ? window.estimateNutrition(r) : {}, NUT_FIX[r.name] || {})); return nutCache.get(r.name); };

  // ---------- what do I have (ingredient keys per recipe) ----------
  function computeKeys(r) {
    const txt = r.ingredients.filter(l => !/^kids|\(kids\)/i.test(l) && !/^salt|pepper, to taste$/i.test(l)).join(" | ").toLowerCase();
    r._keys = PICK.filter(p => p.m.test(txt)).map(p => p.k);
  }
  recipes.forEach(computeKeys);
  function addOwn(o) {
    const r = { tags: [], cuisine: "Everyday", kcal: 0, protein: 0, carbs: 0, ...o, own: true, name: "own:" + o.uid, id: recipes.length };
    recipes.push(r); byName.set(r.name, r); computeKeys(r); return r;
  }
  mine.forEach(addOwn);
  const PICKBY = Object.fromEntries(PICK.map(p => [p.k, p]));
  function matchInfo(r) {
    const hit = r._keys.filter(k => have.has(k));
    const miss = r._keys.filter(k => !have.has(k) && !PICKBY[k].staple);
    const main = hit.filter(k => !PICKBY[k].staple).length;
    return { hit, miss, main, score: main * 2 + (hit.length - main) * .5 - miss.length };
  }
  const pickLabel = k => { const x = extTR(); return BI() >= 0 ? (PICKBY[k].l[BI()] || PICKBY[k].l[0]) : ((x && x.pick && x.pick[k]) || PICKBY[k].l[0]); };
  const grocLabel = i => { const x = extTR(); return BI() >= 0 ? (GROCERIES[i][BI()] || GROCERIES[i][0]) : ((x && x.groc && x.groc[i]) || GROCERIES[i][0]); };

  // ---------- eaten log ----------
  const dayKey = d => { const x = d || new Date(); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
  const eatenList = r => eaten[r.name] || [];
  function fmtDay(key) {
    const today = dayKey(), y = new Date(); y.setDate(y.getDate() - 1);
    if (key === today) return t("today");
    if (key === dayKey(y)) return t("yesterday");
    const [Y, M, D] = key.split("-").map(Number);
    const L = LANGS[LI()];
    try { return new Intl.DateTimeFormat(L.locale, { day: "numeric", month: "short" }).format(new Date(Y, M - 1, D)); } catch (e) { return key; }
  }

  // ---------- photos (IndexedDB, on this device) ----------
  const photos = new Map();
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
      try { const tx2 = db.transaction("photos", mode); const rq = fn(tx2.objectStore("photos")); tx2.oncomplete = () => res(rq && rq.result); tx2.onerror = () => res(null); }
      catch (e) { res(null); }
    });
  }
  async function loadPhotos() {
    db = await idbOpen();
    if (!db) return;
    const keys = await idbDo("readonly", s => s.getAllKeys()) || [];
    for (const k of keys) { const blob = await idbDo("readonly", s => s.get(k)); if (blob) photos.set(k, URL.createObjectURL(blob)); }
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
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  function pic(r) {
    if (photos.has(r.name)) return `<img src="${photos.get(r.name)}" alt="">`;
    const src = r.image || (window.PHOTOS && window.PHOTOS[slug(r.name)]);
    if (!src) return r.own ? `<div class="ph own-ph">${I.cam}</div>` : `<div class="ph-wait"></div>`;
    return `<img src="${esc(src)}" alt="" decoding="async">`;
  }
  const photoBySlug = s => (window.PHOTOS && window.PHOTOS[s]) ? `<img src="${window.PHOTOS[s]}" alt="">` : `<div class="ph-wait"></div>`;
  const I = {
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-9.2-8.6C1.3 8.4 3 5 6.4 5c2 0 3.3 1.1 4 2.3h3.2C14.3 6.1 15.6 5 17.6 5 21 5 22.7 8.4 21.2 11.4 19 15.6 12 20 12 20z"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M9 3h6l-1 6 4 3v2h-5v6l-1 1-1-1v-6H6v-2l4-3z"/></svg>',
    swap: '<svg viewBox="0 0 24 24"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    cam: '<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    kid: '<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/></svg>',
    basket: '<svg viewBox="0 0 24 24"><path d="M4 10h16l-1.6 9H5.6z"/><path d="M8 10l3-6M16 10l-3-6"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    therm: '<svg viewBox="0 0 24 24"><path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 9v8"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/></svg>',
    box: '<svg viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 12h18M8 8V5h8v3"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="M6 15l6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 11l7.6-3.8M8.2 13l7.6 3.8"/></svg>',
    flame: '<svg viewBox="0 0 24 24"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.2-3.8 2.5-5 .3 1.6 1 2.6 2 3 0-3.2.5-5.5.5-8z"/></svg>'
  };
  const MI = {
    oven: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><rect x="6" y="9" width="12" height="8" rx="1"/><path d="M7 6.5h.01M10 6.5h.01"/></svg>',
    pan: '<svg viewBox="0 0 24 24"><circle cx="10" cy="13" r="6"/><path d="M16 13h6"/></svg>',
    airfryer: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="4"/><rect x="8" y="12" width="8" height="6" rx="1.5"/><circle cx="12" cy="7.5" r="1.5"/></svg>',
    grill: '<svg viewBox="0 0 24 24"><path d="M4 10h16a8 8 0 0 1-16 0zM7 6v1M12 5v2M17 6v1M8 18l-2 3M16 18l2 3"/></svg>',
    boil: '<svg viewBox="0 0 24 24"><path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h2M20 10h2M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/></svg>',
    steam: '<svg viewBox="0 0 24 24"><path d="M4 12h16v4a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM8 8c0-1.5 1-1.5 1-3M12 8c0-1.5 1-1.5 1-3M16 8c0-1.5 1-1.5 1-3"/></svg>',
    simmer: '<svg viewBox="0 0 24 24"><path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM2 10h2M20 10h2M8 7h8"/></svg>',
    slowcooker: '<svg viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="4"/><path d="M7 8a5 3 0 0 1 10 0M12 13v3"/></svg>',
    poach: '<svg viewBox="0 0 24 24"><path d="M4 10h16v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><ellipse cx="12" cy="14" rx="3" ry="2"/></svg>'
  };
  let toastT;
  function toast(msg) { const el = $("#toast"); el.textContent = loc(msg); el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 2200); }

  function card(r, extra) {
    const n = eatenList(r).length;
    return `<article class="card" data-act="open" data-id="${r.id}" tabindex="0" aria-label="${esc(rName(r))}">
      <div class="pic">${pic(r)}</div>
      ${r.speed === "quick" ? `<span class="badge-fast">${esc(t("fast"))}</span>` : ""}
      <div class="icons">
        <button class="ico pin" data-act="pin" data-id="${r.id}" aria-pressed="${pins.has(r.name)}" aria-label="${esc(t("pin"))}">${I.pin}</button>
        <button class="ico heart" data-act="fav" data-id="${r.id}" aria-pressed="${favs.has(r.name)}" aria-label="${esc(t("fav"))}">${I.heart}</button>
      </div>
      <div class="body">
        <span class="eyebrow">${r.own ? esc(t("myRecipe")) : (r.family ? esc(t("ourRecipe")) + " · " : "") + esc(cuisineName(r.cuisine))}${ed(r) ? ` · <span class="edited">${esc(t("edited"))}</span>` : ""}</span>
        <h3>${tx(rName(r))}</h3>
        <div class="facts"><span><b>${tx(rTime(r))}</b> ${esc(t("min"))}</span><span><b>${tx(r.protein)} ${G()}</b> ${esc(t("protein"))}</span><span><b>${tx(r.carbs)} ${G()}</b> ${esc(t("carbs"))}</span>${n ? `<span class="eaten-badge">${I.check}${tx(n)}×</span>` : ""}</div>
        ${extra || ""}
      </div>
    </article>`;
  }

  // ---------- nav, header, footer ----------
  const NAV = [
    ["recipes", '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/></svg>'],
    ["favs", I.heart],
    ["week", '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>'],
    ["shop", '<svg viewBox="0 0 24 24"><path d="M5 7h14l-1.5 12h-11z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>'],
    ["guide", I.flame]
  ];
  function renderNav() {
    $("#nav").innerHTML = NAV.map(([k, ic]) => `<button data-nav="${k}" ${ui.view === k ? 'aria-current="page"' : ""}>${ic}<span>${esc(t("nav." + k))}</span>${k === "shop" ? '<span class="count" id="shop-count" hidden></span>' : ""}</button>`).join("");
    updateCount();
  }
  const langBtn = () => `<div class="lang-wrap"><button class="lang-btn" data-act="lang-menu" aria-haspopup="true" aria-label="${esc(t("language"))}">${I.globe}<span>${LANGS[LI()].code.toUpperCase()}</span></button>
    <div class="lang-menu" id="lang-menu" hidden>${LANGS.map(L => `<button data-act="lang" data-v="${L.code}" aria-pressed="${L.code === ui.lang}" lang="${L.code}">${esc(L.name)}</button>`).join("")}</div></div>`;
  function renderTop() {
    const el = $("#topbar");
    if (ui.view === "recipes") {
      el.innerHTML = `
        <div class="brand"><img class="logo" src="logo.png" alt="" width="48" height="48"><h1>Steady<span>Plate</span></h1>${langBtn()}</div>
        <div class="seg" role="group">
          <button data-act="meal" data-v="breakfast" aria-pressed="${ui.meal === "breakfast"}">${esc(t("breakfast"))}</button>
          <button data-act="meal" data-v="main" aria-pressed="${ui.meal === "main"}">${esc(t("lunchDinner"))}</button>
        </div>
        <div class="row">
          <input class="search" id="search" type="search" placeholder="${esc(t("search"))}" aria-label="${esc(t("search"))}" value="${esc(ui.q)}">
          <button class="chip" data-act="speed" data-v="all" aria-pressed="${ui.speed === "all"}">${esc(t("all"))}</button>
          <button class="chip" data-act="speed" data-v="quick" aria-pressed="${ui.speed === "quick"}">${esc(t("fast"))}</button>
          <button class="chip" data-act="speed" data-v="normal" aria-pressed="${ui.speed === "normal"}">${esc(t("normal"))}</button>
        </div>
        <div class="cuis" role="group">
          ${["all", ...(mine.length ? ["mine"] : []), "family", ...CUISINES].map(c => `<button class="chip" data-act="cuisine" data-v="${c}" aria-pressed="${ui.cuisine === c}">${esc(c === "all" ? t("allCuisines") : c === "family" ? t("ourRecipes") : c === "mine" ? t("myRecipes") : cuisineName(c))}</button>`).join("")}
        </div>`;
      $("#search").oninput = e => { ui.q = e.target.value; renderRecipes(); };
    } else {
      el.innerHTML = `<div class="brand"><h2 class="view-title">${esc(t("nav." + ui.view))}</h2>${langBtn()}</div>`;
    }
  }

  // ---------- views ----------
  function haystack(r) {
    if (!r._hay || r._hayLang !== ui.lang) {
      r._hay = [rName(r), ...rIngr(r), r.name, ...r.ingredients, ...r.tags, ...r.tags.map(tt), cuisineName(r.cuisine)].join(" ").toLowerCase();
      r._hayLang = ui.lang;
    }
    return r._hay;
  }
  function renderRecipes() {
    const q = ui.q.trim().toLowerCase();
    let list = liveR().filter(r => r.meal === ui.meal && (ui.speed === "all" || r.speed === ui.speed) && (ui.cuisine === "all" || (ui.cuisine === "family" ? r.family : ui.cuisine === "mine" ? r.own : r.cuisine === ui.cuisine)) && (!q || haystack(r).includes(q)));
    let h = "";
    if (ui.haveMode && have.size) {
      const scored = list.map(r => ({ r, m: matchInfo(r) })).filter(x => x.m.main > 0).sort((a, b) => b.m.score - a.m.score || a.m.miss.length - b.m.miss.length);
      h += `<div class="have-banner"><div><b>${esc(t("haveBanner"))}</b><span>${[...have].map(pickLabel).map(esc).join(" · ")}</span></div>
        <div class="have-acts"><button class="btn small ghost" data-act="finder">${esc(t("change"))}</button><button class="btn small ghost" data-act="have-off">${esc(t("stop"))}</button></div></div>`;
      h += `<h2 class="sec">${tx(t("nRecipes", { n: scored.length }))}</h2>`;
      h += scored.length ? `<div class="grid">${scored.map(({ r, m }) => card(r, `<div class="match"><span class="ok">${I.check}${tx(t("uses", { a: m.hit.length }))}</span>${m.miss.length ? `<span class="miss">${esc(t("missing"))} ${m.miss.slice(0, 3).map(pickLabel).map(esc).join(", ")}${m.miss.length > 3 ? "…" : ""}</span>` : `<span class="ok">${esc(t("noneMissing"))}</span>`}</div>`)).join("")}</div>` : `<p class="empty">${esc(t("noHave"))}</p>`;
      $("#v-recipes").innerHTML = h; return;
    }
    h += `<div class="cta-row"><button class="finder-cta" data-act="finder">${I.basket}<span><b>${esc(t("finderTitle"))}</b><small>${esc(t("finderIntro"))}</small></span></button>
      <button class="finder-cta alt" data-act="new-recipe">${I.plus}<span><b>${esc(t("addRecipe"))}</b><small>${esc(t("addRecipeSub"))}</small></span></button></div>`;
    const pinned = liveR().filter(r => pins.has(r.name));
    if (pinned.length && !q) h += `<h2 class="sec">${esc(t("pinned"))}</h2><div class="strip">${pinned.map(r => card(r)).join("")}</div>`;
    h += `<h2 class="sec">${tx(t("nRecipes", { n: list.length }))}</h2>`;
    h += list.length ? `<div class="grid">${list.map(r => card(r)).join("")}</div>` : `<p class="empty">${esc(t("nothing"))}</p>`;
    $("#v-recipes").innerHTML = h;
  }

  function renderFavs() {
    const pinned = liveR().filter(r => pins.has(r.name));
    const fav = liveR().filter(r => favs.has(r.name));
    const recent = liveR().filter(r => eatenList(r).length).sort((a, b) => eatenList(b).at(-1).localeCompare(eatenList(a).at(-1))).slice(0, 9);
    let h = `<h2 class="sec">${esc(t("pinned"))}</h2>` + (pinned.length ? `<div class="grid">${pinned.map(r => card(r)).join("")}</div>` : `<p class="empty">${esc(t("pinEmpty"))}</p>`);
    h += `<h2 class="sec">${esc(t("nav.favs"))}</h2>` + (fav.length ? `<div class="grid">${fav.map(r => card(r)).join("")}</div>` : `<p class="empty">${esc(t("favEmpty"))}</p>`);
    h += `<h2 class="sec">${esc(t("recent"))}</h2>` + (recent.length ? `<div class="grid">${recent.map(r => card(r, `<div class="match"><span class="ok">${I.check}${tx(fmtDay(eatenList(r).at(-1)))}</span></div>`)).join("")}</div>` : `<p class="empty">${esc(t("recentEmpty"))}</p>`);
    $("#v-favs").innerHTML = h;
  }

  // a planned cell is a recipe name, or "@lo:<name>" for leftovers from yesterday's dinner
  const cellRecipe = (di, k) => { const c = plan[di] && plan[di][k]; if (!c) return null; const lo = c.startsWith("@lo:"); const r = byName.get(lo ? c.slice(4) : c); return r && !r.deleted ? { r, lo } : null; };
  function renderWeek() {
    let h = `<div class="actions">
        <button class="btn" data-act="suggest">${esc(t("suggest"))}</button>
        <button class="btn ghost" data-act="week-to-shop">${esc(t("weekToShop"))}</button>
      </div>
      <label class="check"><input type="checkbox" id="boost" ${boost ? "checked" : ""}> ${esc(t("boost"))}</label>
      <div class="goal"><label for="carb-goal">${esc(t("carbGoal"))}</label><span><input type="number" id="carb-goal" min="20" max="400" step="5" value="${carbGoal}" inputmode="numeric"> ${G()}</span><small>${esc(t("carbNote"))}</small></div>`;
    for (let di = 0; di < 7; di++) {
      let carbs = 0, n = 0;
      SLOTS.forEach(k => { const c = cellRecipe(di, k); if (c && c.r.carbs) { carbs += c.r.carbs; n++; } });
      const pct = Math.min(100, Math.round(carbs / (carbGoal || 1) * 100)), over = carbs > carbGoal;
      h += `<div class="day"><div class="day-head"><h3>${esc(dayName(di))}</h3>${n ? `<div class="carbs ${over ? "over" : ""}"><small>${tx(t("carbDay", { a: Math.round(carbs), n: carbGoal }))}</small><span class="bar"><i style="width:${pct}%"></i></span></div>` : ""}</div>`;
      SLOTS.forEach(k => {
        const c = cellRecipe(di, k), r = c && c.r, done = !!planDone[di + k];
        h += `<div class="slot ${done ? "is-done" : ""}">
          <div class="thumb">${r ? pic(r) : ""}</div>
          <div><div class="lbl">${esc(slotName(k))}</div>${r
            ? `<button class="nm" data-act="open" data-id="${r.id}">${tx(c.lo ? t("lunchboxOf", { n: rName(r) }) : rName(r))}</button>`
            : `<span class="nm none">${esc(t("nothingPlanned"))}</span>`}</div>
          <div class="acts">${r
            ? `<button class="mini ok" data-act="slot-eat" data-day="${di}" data-slot="${k}" aria-pressed="${done}" aria-label="${esc(t("markEaten"))}">${I.check}</button>
               ${k === "d" && di < 6 ? `<button class="mini" data-act="lunchbox" data-day="${di}" aria-pressed="${!!plan[di].lb}" aria-label="${esc(t("lunchbox"))}" title="${esc(t("lunchbox"))}">${I.box}</button>` : ""}
               <button class="mini" data-act="swap" data-day="${di}" data-slot="${k}" aria-label="${esc(t("swapMeal"))}">${I.swap}</button>
               <button class="mini" data-act="clear-slot" data-day="${di}" data-slot="${k}" aria-label="${esc(t("remove"))}">${I.x}</button>`
            : `<button class="mini" data-act="swap" data-day="${di}" data-slot="${k}" aria-label="${esc(t("suggestOne"))}">${I.plus}</button>`}</div>
        </div>`;
      });
      h += `</div>`;
    }
    h += `<div class="actions"><button class="btn danger small" data-act="clear-week">${esc(t("clearWeek"))}</button></div>`;
    $("#v-week").innerHTML = h;
    $("#boost").onchange = e => { boost = e.target.checked; saveAll(); };
    $("#carb-goal").onchange = e => { const v = Math.round(+e.target.value); if (v >= 20 && v <= 400) { carbGoal = v; saveAll(); } renderWeek(); };
  }

  function category(text) {
    const s = text.toLowerCase();
    if (/\b(stock|paste|sauce|spice|powder|vinegar|flour|can |canned|passata|seeds|oil|mustard|salsa|coconut milk|curry|pesto|capers|honey|cocoa|baking|vanilla|cinnamon|cumin|paprika|oregano|sweetener|peanut butter|tahini|nuts|walnut|almond|hemp|flax|chia|beans|olives|sun-dried|cream of tartar|allspice|caraway|fennel|sesame|worcestershire|fish sauce|soy|saffron|sumac|dijon|turmeric|barberr|dried lime|fenugreek|raisin|kimchi|nori|chipotle|edamame|tofu|nutmeg|peanuts|salt|pepper, to taste|black pepper)/.test(s) && !/almond milk|soy milk|green beans/.test(s)) return "Pantry";
    if (/(chicken|turkey|beef|lamb|salmon|cod|tuna|shrimp|mackerel|fish|steak|sausage|mince|pollock|sirloin)/.test(s)) return "Meat & fish";
    if (/(spinach|tomato|pepper|onion|garlic|zucchini|broccoli|lettuce|cucumber|avocado|lemon|lime|berr|cauliflower|cabbage|mushroom|leek|carrot|celery|asparagus|green beans|dill|parsley|mint|basil|coriander|chives|rocket|ginger|eggplant|radish|peas|celeriac|chili|herbs|salad|leaves|thyme|rosemary|banana|snap|romaine|coleslaw|spring onion)/.test(s)) return "Fruit & veg";
    if (/(egg|yogurt|yoghurt|cheese|feta|halloumi|mozzarella|parmesan|cottage|kvarg|skyr|milk|cream|ricotta|butter|crème|tzatziki|keso)/.test(s)) return "Dairy & eggs";
    return "Other";
  }
  function addShop(text, from, english, cat) {
    const key = text.trim().toLowerCase();
    if (!key) return;
    const ex = shop.find(i => !i.done && i.text.toLowerCase() === key);
    if (ex) { ex.n = (ex.n || 1) + 1; if (from && !ex.from.includes(from)) ex.from.push(from); return; }
    shop.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text: text.trim(), cat: cat || (english ? category(english) : "Other"), done: false, n: 1, from: from ? [from] : [] });
  }

  // ---------- shopping suggestions: your own recent items first, then common groceries ----------
  const GCAT = { F: "Fruit & veg", M: "Meat & fish", D: "Dairy & eggs", P: "Pantry", O: "Other" };
  let hist = store.get("shopHist", {}); // lower-case text -> { text, cat, t, n }
  function guessCat(text) {
    const k = text.trim().toLowerCase();
    if (hist[k]) return hist[k].cat;
    for (let i = 0; i < GROCERIES.length; i++) if (GROCERIES[i].slice(0, 3).some(x => x.toLowerCase() === k) || grocLabel(i).toLowerCase() === k) return GCAT[GROCERIES[i][3]];
    const c = category(text); return c;
  }
  function addManual(text, cat) {
    text = text.trim(); if (!text) return;
    cat = cat || guessCat(text);
    addShop(text, null, null, cat);
    const k = text.toLowerCase(); const h = hist[k] || { text, cat, n: 0 };
    h.text = text; h.cat = cat; h.t = Date.now(); h.n++; hist[k] = h;
    store.set("shopHist", hist); saveAll();
  }
  function matchRank(label, q) {
    const l = label.toLowerCase();
    if (l.startsWith(q)) return 0;
    if (l.split(/[\s\-\/]+/).some(w => w.startsWith(q))) return 1;
    if (l.includes(q)) return 2;
    return -1;
  }
  function suggestions(q) {
    q = q.trim().toLowerCase();
    const onList = new Set(shop.filter(i => !i.done).map(i => shopText(i).toLowerCase()));
    const recent = Object.values(hist).filter(h => !onList.has(h.text.toLowerCase())).sort((a, b) => b.t - a.t);
    if (!q) return recent.slice(0, 6).map(h => ({ text: h.text, cat: h.cat, mine: true }));
    const mine = recent.map(h => ({ h, r: matchRank(h.text, q) })).filter(x => x.r >= 0).sort((a, b) => a.r - b.r || b.h.t - a.h.t).map(x => ({ text: x.h.text, cat: x.h.cat, mine: true }));
    const seen = new Set(mine.map(m => m.text.toLowerCase()));
    const common = GROCERIES.map((g, i) => ({ text: grocLabel(i), cat: GCAT[g[3]] })).filter(g => !seen.has(g.text.toLowerCase()) && !onList.has(g.text.toLowerCase()))
      .map(g => ({ g, r: matchRank(g.text, q) })).filter(x => x.r >= 0).sort((a, b) => a.r - b.r || a.g.text.length - b.g.text.length || a.g.text.localeCompare(b.g.text)).map(x => x.g);
    return [...mine, ...common].slice(0, 8);
  }
  function renderSuggest() {
    const box = $("#suggest"), inp = $("#shop-input"); if (!box || !inp) return;
    const q = inp.value, list = suggestions(q);
    const show = list.length && (q.trim() || document.activeElement === inp);
    box.hidden = !show; if (!show) { box.innerHTML = ""; return; }
    box.innerHTML = (!q.trim() ? `<div class="sg-head">${esc(t("recentItems"))}</div>` : "") + list.map(x => `<div class="sg-row">
        <button type="button" class="sg" data-act="sugg" data-text="${esc(x.text)}" data-cat="${esc(x.cat)}">${x.mine ? I.clock : I.plus}<span>${esc(x.text)}</span><small>${esc(t("cat." + x.cat))}</small></button>
        ${x.mine ? `<button type="button" class="sg-x" data-act="hist-del" data-text="${esc(x.text)}" aria-label="${esc(t("forget"))}">✕</button>` : ""}</div>`).join("");
  }
  function addRecipeToShop(r, plus) {
    const f = (servingsFor(r) + (plus || 0)) / r.servings, e = scaledEnglish(r, f);
    e.forEach((en, i) => {
      const key = en.trim().toLowerCase();
      const ex = shop.find(it => !it.done && (it.en || it.text).toLowerCase() === key);
      if (ex) { ex.n = (ex.n || 1) + 1; if (!ex.from.includes(r.name)) ex.from.push(r.name); return; }
      shop.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), text: en, en, ref: { n: r.name, i, f }, cat: category(en), done: false, n: 1, from: [r.name] });
    });
  }
  const shopText = it => { const r = it.ref && byName.get(it.ref.n); return r ? scaleText(rIngr(r)[it.ref.i], it.ref.f) : it.text; };
  const fromName = n => byName.has(n) ? rName(byName.get(n)) : n;

  function renderShop() {
    let h = `<form class="add-row" id="shop-form">
        <input id="shop-input" placeholder="${esc(t("addItem"))}" aria-label="${esc(t("addItem"))}" autocomplete="off">
        <button class="btn" type="submit">${esc(t("add"))}</button>
      </form>
      <div class="suggest" id="suggest" hidden></div>
      <div class="actions"><button class="btn ghost small" data-act="week-to-shop">${esc(t("addWeekMeals"))}</button>
      ${shop.length ? `<button class="btn ghost small" data-act="share-list">${I.share}${esc(t("shareList"))}</button><button class="btn ghost small" data-act="copy">${esc(t("copyList"))}</button>` : ""}
      <button class="btn ghost small" data-act="sort-mode" aria-pressed="${!!ui.sortMode}">${esc(ui.sortMode ? t("storeOrderDone") : t("storeOrder"))}</button></div>`;
    if (!shop.length) h += `<p class="empty">${esc(t("shopEmpty"))}</p>`;
    if (ui.importList) h = `<div class="have-banner import"><div><b>${esc(t("importTitle"))}</b><span>${tx(t("importText", { n: ui.importList.length }))}</span></div>
      <div class="have-acts"><button class="btn small" data-act="import-yes">${esc(t("importBtn"))}</button><button class="btn small ghost" data-act="import-no">${esc(t("dismiss"))}</button></div></div>` + h;
    if (ui.sortMode) h += `<p class="note">${esc(t("storeOrderHint"))}</p>`;
    const visible = catOrder.filter(cat => ui.sortMode || shop.some(i => i.cat === cat));
    visible.forEach((cat, vi) => {
      const items = shop.filter(i => i.cat === cat);
      if (!items.length && !ui.sortMode) return;
      items.sort((a, b) => a.done - b.done);
      h += `<div class="shop-group"><div class="sg-title"><h3>${esc(t("cat." + cat))}</h3>${ui.sortMode ? `<span class="order"><button class="mini" data-act="cat-up" data-v="${esc(cat)}" ${vi === 0 ? "disabled" : ""} aria-label="${esc(t("moveUp"))}">${I.up}</button><button class="mini" data-act="cat-down" data-v="${esc(cat)}" ${vi === visible.length - 1 ? "disabled" : ""} aria-label="${esc(t("moveDown"))}">${I.down}</button></span>` : ""}</div>${items.map(i => `
        <div class="item ${i.done ? "done" : ""}">
          <input type="checkbox" id="i-${i.id}" data-act="shop-toggle" data-sid="${i.id}" ${i.done ? "checked" : ""}>
          <label for="i-${i.id}">${tx(shopText(i))}${i.n > 1 ? ` <b>×${tx(i.n)}</b>` : ""}${i.from.length ? `<small>${esc(i.from.map(fromName).join(", "))}</small>` : ""}</label>
          <button class="x" data-act="shop-del" data-sid="${i.id}" aria-label="${esc(t("remove"))}">✕</button>
        </div>`).join("")}</div>`;
    });
    if (shop.length) h += `<div class="actions">
        <button class="btn ghost small" data-act="shop-clear-done">${esc(t("removeTicked"))}</button>
        <button class="btn danger small" data-act="shop-clear-all">${esc(ui.confirmClear ? t("tapAgain") : t("clearList"))}</button></div>`;
    $("#v-shop").innerHTML = h;
    const inp = $("#shop-input");
    $("#shop-form").onsubmit = e => { e.preventDefault(); const v = inp.value; if (v.trim()) { addManual(v); renderShop(); $("#shop-input").focus(); renderSuggest(); } };
    inp.oninput = renderSuggest;
    inp.onfocus = renderSuggest;
    inp.onblur = () => setTimeout(() => { if (document.activeElement !== $("#shop-input")) { const b = $("#suggest"); if (b && !$("#shop-input").value.trim()) b.hidden = true; } }, 200);
    updateCount();
  }
  function updateCount() { const c = $("#shop-count"); if (!c) return; const n = shop.filter(i => !i.done).length; c.hidden = !n; c.textContent = loc(n); }

  // ---------- cooking guide ----------
  const heatLabel = hv => /°/.test(hv) ? hv : t("h." + hv);
  function renderGuide() {
    const g = ui.g;
    let h = `<p class="lead">${esc(t("guideIntro"))}</p>
      <h2 class="sec">${esc(t("step1"))}</h2>
      <div class="tiles">${GUIDE.map((p, i) => `<button class="tile" data-act="g-p" data-i="${i}" aria-pressed="${g.p === i}"><span class="tile-pic">${photoBySlug(p.photo)}</span><span class="tile-name">${tx(tt(p.name))}</span></button>`).join("")}</div>`;
    if (g.p != null) {
      const P = GUIDE[g.p];
      const methods = [...new Set(P.cuts.flatMap(c => c.methods.map(m => m.m)))];
      h += `<h2 class="sec" id="g-step2">${esc(t("step2"))}</h2>
        <div class="mchips">${methods.map(m => `<button class="mchip" data-act="g-m" data-v="${m}" aria-pressed="${g.m === m}">${MI[m] || ""}<span>${esc(t("m." + m))}</span></button>`).join("")}</div>`;
      if (g.m) {
        const cuts = P.cuts.map((c, i) => ({ c, i })).filter(x => x.c.methods.some(m => m.m === g.m));
        if (!cuts.some(x => x.i === g.c)) g.c = cuts.length ? cuts[0].i : null;
        if (cuts.length > 1) h += `<h2 class="sec">${esc(t("step3"))}</h2>
          <div class="cuis wrap-chips">${cuts.map(x => `<button class="chip" data-act="g-c" data-i="${x.i}" aria-pressed="${g.c === x.i}">${tx(tt(x.c.name))}</button>`).join("")}</div>`;
        if (g.c != null) {
          const C = P.cuts[g.c], M = C.methods.find(m => m.m === g.m);
          h += `<div class="result" id="g-result">
            <div class="result-head">${MI[g.m] || ""}<div><small>${tx(tt(P.name))}</small><b>${tx(tt(C.name))}</b>${C.size ? `<span>${tx(tt(C.size))}</span>` : ""}</div></div>
            <div class="result-grid">
              <div class="rbox"><span>${I.flame}${esc(t("heat"))}</span><b>${tx(heatLabel(M.heat))}</b><em>${esc(t("m." + g.m))}</em></div>
              <div class="rbox"><span>${I.clock}${esc(t("time"))}</span><b>${tx(M.t)} ${esc(t("u." + M.u))}</b>${M.side ? `<em>${esc(t("perSide"))}</em>` : ""}</div>
            </div>
            ${C.core ? `<div class="core">${I.therm}<span>${esc(t("core"))}</span><b>${tx(tt(C.core))}</b></div>` : ""}
            ${M.tip ? `<p class="tip">${tx(tt(M.tip))}</p>` : ""}
          </div>
          <p class="note">${esc(t("thermo"))}</p>`;
        }
      }
    }
    $("#v-guide").innerHTML = h;
  }

  function renderView() {
    ({ recipes: renderRecipes, favs: renderFavs, week: renderWeek, shop: renderShop, guide: renderGuide })[ui.view]();
    updateCount();
  }
  function go(view) {
    ui.view = view; ui.confirmClear = false;
    document.querySelectorAll("section[data-view]").forEach(s => s.hidden = s.dataset.view !== view);
    renderNav(); renderTop(); renderView(); window.scrollTo(0, 0);
  }
  const triedLang = new Set();
  function ensureLang(code, then) {
    if (BASE.indexOf(code) === 0 || (window.TR && window.TR[code]) || triedLang.has(code)) return then();
    triedLang.add(code);
    const sc = document.createElement("script"); sc.src = "tr-" + code + ".js";
    sc.onload = then; sc.onerror = then; document.body.appendChild(sc);
  }
  function applyLang() {
    const L = LANGS[LI()];
    if (!(BI() === 0 || (window.TR && window.TR[ui.lang])) && !triedLang.has(ui.lang)) { ensureLang(ui.lang, applyLang); }
    document.documentElement.lang = L.code;
    document.documentElement.dir = L.rtl ? "rtl" : "ltr";
    $("#footer-text").textContent = t("footer");
    renderNav(); renderTop(); renderView();
    if (ui.openName) openRecipe(byName.get(ui.openName));
    else if (!$("#sheet").hidden && $("#sheet").dataset.kind === "finder") openFinder();
  }

  // ---------- planner ----------
  function rule(di, k) {
    const weekend = di >= 5;
    if (k === "b") return r => r.meal === "breakfast" && (weekend || r.speed === "quick");
    if (k === "l") return r => r.meal === "main" && r.speed === "quick";
    return r => r.meal === "main" && (di < 4 || r.speed === "normal");
  }
  function choose(pred, used, avoid) {
    let pool = liveR().filter(r => pred(r) && !used.has(r.name));
    if (!pool.length) pool = liveR().filter(pred);
    if (avoid && avoid.size) { const varied = pool.filter(r => !avoid.has(r.cuisine)); if (varied.length) pool = varied; }
    const w = pool.map(r => boost ? 1 + (favs.has(r.name) ? 3 : 0) + (pins.has(r.name) ? 3 : 0) : 1);
    let x = Math.random() * w.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) { x -= w[i]; if (x <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }
  function usedNames() { const u = new Set(); plan.forEach(p => SLOTS.forEach(k => p[k] && !p[k].startsWith("@lo:") && u.add(p[k]))); return u; }
  function syncLunchbox(di) { if (di >= 6) return; const p = plan[di], nx = plan[di + 1]; if (p.lb && p.d) nx.l = "@lo:" + p.d; else if (nx.l && nx.l.startsWith("@lo:")) nx.l = null; if (!p.d) p.lb = false; }
  function suggestWeek() {
    const used = new Set(); let yesterdayDinner = null;
    plan = [0, 1, 2, 3, 4, 5, 6].map(di => {
      const o = {}, today = new Set();
      SLOTS.forEach(k => {
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
    plan.forEach((p, di) => SLOTS.forEach(k => { const c = cellRecipe(di, k); if (c && !c.lo) { addRecipeToShop(c.r, k === "d" && p.lb ? 1 : 0); n++; } }));
    saveAll(); return n;
  }

  // ---------- sheets ----------
  function showSheet(kind) { const sh = $("#sheet"); sh.dataset.kind = kind; sh.hidden = false; $("#scrim").hidden = false; sh.scrollTop = 0; document.body.style.overflow = "hidden"; document.body.classList.add("sheet-open"); }
  function closeSheet() { $("#sheet").hidden = true; $("#scrim").hidden = true; document.body.style.overflow = ""; ui.openName = null; document.body.classList.remove("sheet-open"); }

  // ---------- timers in steps ----------
  const TIME_RE = /(\d+(?:[.,]\d+)?\s?[½¼¾]?|[½¼¾])(?:\s?[–-]\s?(\d+(?:[.,]\d+)?\s?[½¼¾]?|[½¼¾]))?\s?(minutes?|minuter|minutter|minuttia|minuutin|minuten|minutos|minuti|minut[aeyów]*|min\.?|dk|dakika|λεπτ\S*|دقیقه|دقائق|دقيقة|hours?|timmar|timme|tim|timer|time|tuntia|tunti|stunden|stunde|std\.?|heures?|horas?|ore|ora|saat|godz\S*|ώρ\S*|ساعت|ساعات|ساعة|h)(?![a-zåäöéèA-ZÅÄÖ])/gi;
  const isHour = u => /^(h|hour|tim|timer|time|tunti|stund|std|heure|hora|or[ae]$|saat|godz|ώρ|ساعت|ساع)/i.test(u);
  function timerBtns(step, si, r) {
    const out = []; let m; TIME_RE.lastIndex = 0;
    while ((m = TIME_RE.exec(step)) && out.length < 2) {
      const v = parseQ(m[1]); if (!v || isNaN(v)) continue;
      const sec = Math.round(v * (isHour(m[3]) ? 3600 : 60)); if (sec < 30 || sec > 12 * 3600) continue;
      out.push(`<button class="tbtn" data-act="timer" data-sec="${sec}" data-id="${r.id}" data-step="${si + 1}" aria-label="${esc(t("timerStart", { n: Math.round(sec / 60) }))}">${I.clock}${tx(m[0].trim())}</button>`);
    }
    return out.length ? `<span class="tbtns">${out.join("")}</span>` : "";
  }
  let timers = [], timerTick = null, audioCtx = null, wakeLock = null;
  const mmss = s => { s = Math.max(0, Math.ceil(s)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); };
  function beep() {
    try { if (!audioCtx) return; [0, .35, .7, 1.4, 1.75, 2.1].forEach(d => { const o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(.0001, audioCtx.currentTime + d); g.gain.exponentialRampToValueAtTime(.3, audioCtx.currentTime + d + .02); g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime + d + .25); o.connect(g).connect(audioCtx.destination); o.start(audioCtx.currentTime + d); o.stop(audioCtx.currentTime + d + .3); }); } catch (e) { }
    try { navigator.vibrate && navigator.vibrate([300, 150, 300, 150, 600]); } catch (e) { }
  }
  function renderTimers() {
    const box = $("#timers"); if (!box) return;
    const now = Date.now();
    box.hidden = !timers.length;
    box.innerHTML = timers.map(tm => { const left = (tm.end - now) / 1000, done = left <= 0; return `<div class="timer ${done ? "done" : ""}">${I.clock}<div class="tm-txt"><b>${tx(done ? t("timerDone") : mmss(left))}</b><small>${tx(tm.label)}</small></div>
      ${done ? "" : `<button class="mini" data-act="timer-add" data-tid="${tm.id}">${tx(t("plusMin"))}</button>`}<button class="mini" data-act="timer-stop" data-tid="${tm.id}" aria-label="${esc(t("stopTimer"))}">${I.x}</button></div>`; }).join("");
  }
  function tickTimers() {
    const now = Date.now();
    timers.forEach(tm => { if (!tm.rang && tm.end <= now) { tm.rang = true; beep(); toast(t("timerDone") + " " + tm.label); } });
    renderTimers();
    if (!timers.length) { clearInterval(timerTick); timerTick = null; try { wakeLock && wakeLock.release(); } catch (e) { } wakeLock = null; }
  }
  function startTimer(sec, label) {
    try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); audioCtx.resume && audioCtx.resume(); } catch (e) { }
    timers.push({ id: Date.now().toString(36), end: Date.now() + sec * 1000, label });
    if (!timerTick) timerTick = setInterval(tickTimers, 1000);
    try { if (navigator.wakeLock && !wakeLock) navigator.wakeLock.request("screen").then(w => wakeLock = w).catch(() => { }); } catch (e) { }
    renderTimers();
  }

  // ---------- leftovers: tomorrow's lunch ideas ----------
  function leftoverIdeas(r) {
    const pk = r._keys.filter(k => PICKBY[k].g === "protein" && k !== "eggs");
    if (!pk.length || r.meal !== "main") return [];
    return liveR().filter(x => x !== r && x.meal === "main" && x.speed === "quick" && x._keys.some(k => pk.includes(k)))
      .map(x => ({ x, s: (x.tags.includes("Uses leftovers") ? 3 : 0) + (/salad|wrap|soup|broth|bowl|fried|lettuce|cups|stir|hash|pytt/i.test(x.name) ? 2 : 0) + (favs.has(x.name) ? 1 : 0) + Math.random() * .5 }))
      .sort((a, b) => b.s - a.s).slice(0, 3).map(o => o.x);
  }
  function leftoverBlock(r) {
    const ideas = leftoverIdeas(r);
    return ideas.length ? `<div class="leftovers"><h4>${esc(t("leftoversTitle"))}</h4><div class="lo-list">${ideas.map(x => `<button class="lo" data-act="open" data-id="${x.id}"><span class="lo-pic">${pic(x)}</span><span>${tx(rName(x))}</span></button>`).join("")}</div></div>` : "";
  }

  // ---------- edit a recipe / add your own ----------
  const lines = v => v.split("\n").map(x => x.trim()).filter(Boolean);
  function openEditor(r) {
    ui.openName = null; ui.editId = r ? r.id : null; ui.confirmDel = false;
    const own = !r || r.own;
    const v = r ? { name: rName(r), time: rTime(r), ingredients: rIngr(r).join("\n"), steps: rSteps(r).join("\n"), kids: rKids(r), note: rNote(r) } : { name: "", time: 20, ingredients: "", steps: "", kids: "", note: "" };
    const num = (id, label, val) => `<label class="fld small"><span>${esc(label)}</span><input type="number" id="${id}" min="0" inputmode="numeric" value="${val ?? ""}"></label>`;
    $("#sheet").innerHTML = `<div class="sheet-in editor">
      <div class="title-row"><h2 id="d-name">${esc(r ? t("editTitle") : t("newRecipe"))}</h2><button class="close-plain" data-act="${r ? "edit-cancel" : "close"}" data-id="${r ? r.id : ""}" aria-label="${esc(t("close"))}">✕</button></div>
      <label class="fld"><span>${esc(t("f.name"))}</span><input id="e-name" value="${esc(v.name)}" autocomplete="off"></label>
      <div class="fld-row">
        ${num("e-time", t("f.time"), v.time)}
        ${own ? num("e-serv", t("servings"), r ? r.servings : 4) : ""}
        ${own ? `<label class="fld small"><span>${esc(t("f.meal"))}</span><select id="e-meal"><option value="main" ${!r || r.meal === "main" ? "selected" : ""}>${esc(t("lunchDinner"))}</option><option value="breakfast" ${r && r.meal === "breakfast" ? "selected" : ""}>${esc(t("breakfast"))}</option></select></label>` : ""}
      </div>
      <label class="fld"><span>${esc(t("f.ingr"))}</span><textarea id="e-ingr" rows="8">${esc(v.ingredients)}</textarea></label>
      <label class="fld"><span>${esc(t("f.steps"))}</span><textarea id="e-steps" rows="8">${esc(v.steps)}</textarea></label>
      <label class="fld"><span>${esc(t("forKids"))}</span><textarea id="e-kids" rows="2">${esc(v.kids)}</textarea></label>
      <label class="fld"><span>${esc(t("f.note"))}</span><textarea id="e-note" rows="3">${esc(v.note)}</textarea></label>
      ${own ? `<p class="note">${esc(t("f.nutrition"))}</p><div class="fld-row">${num("e-kcal", t("kcal"), r ? r.kcal || "" : "")}${num("e-prot", t("protein") + " (" + t("g") + ")", r ? r.protein || "" : "")}${num("e-carb", t("carbs") + " (" + t("g") + ")", r ? r.carbs || "" : "")}</div>` : ""}
      <div class="finder-bar">
        ${r && !r.own && ed(r) ? `<button class="btn ghost" data-act="edit-reset" data-id="${r.id}">${esc(t("resetRecipe"))}</button>` : ""}
        ${r && r.own ? `<button class="btn danger" data-act="own-delete" data-id="${r.id}" id="del-btn">${esc(t("deleteRecipe"))}</button>` : ""}
        <button class="btn" data-act="edit-save" data-id="${r ? r.id : ""}">${esc(t("save"))}</button>
      </div></div>`;
    showSheet("editor");
  }
  function saveEditor(r) {
    const name = $("#e-name").value.trim(); if (!name) { toast(t("needName")); $("#e-name").focus(); return null; }
    const time = Math.max(1, Math.round(+$("#e-time").value || 0)) || (r ? rTime(r) : 20);
    const ingredients = lines($("#e-ingr").value), steps = lines($("#e-steps").value), kids = $("#e-kids").value.trim(), note = $("#e-note").value.trim();
    if (!r || r.own) {
      const o = { title: name, time, speed: time <= 20 ? "quick" : "normal", meal: $("#e-meal").value, servings: Math.max(1, Math.round(+$("#e-serv").value || 4)),
        kcal: Math.round(+$("#e-kcal").value || 0), protein: Math.round(+$("#e-prot").value || 0), carbs: Math.round(+$("#e-carb").value || 0), ingredients, steps, kids, note };
      if (!r) { o.uid = Date.now().toString(36); mine.push(o); r = addOwn(o); }
      else { const m = mine.find(x => x.uid === r.uid); Object.assign(m, o); Object.assign(r, o); computeKeys(r); }
    } else {
      const e = {};
      if (name !== baseName(r)) e.name = name;
      if (time !== r.time) e.time = time;
      if (ingredients.join("\n") !== baseIngr(r).join("\n")) e.ingredients = ingredients;
      if (steps.join("\n") !== baseSteps(r).join("\n")) e.steps = steps;
      if (kids !== baseKids(r)) e.kids = kids;
      if (note) e.note = note;
      if (Object.keys(e).length) edits[r.name] = e; else delete edits[r.name];
    }
    r._hayLang = null; saveAll(); toast(t("saved")); return r;
  }

  function openRecipe(r) {
    ui.openName = r.name;
    const todayIdx = (new Date().getDay() + 6) % 7;
    const defSlot = r.meal === "breakfast" ? "b" : "d";
    const N = r.own ? { fat: Math.max(0, Math.round(((r.kcal || 0) - 4 * (r.protein || 0) - 4 * (r.carbs || 0)) / 9)), sat: "–", fiber: "–", sugar: "–", salt: "–", net: r.carbs || 0 } : nutrition(r);
    const nutRow = (k, v, u, sub) => `<div class="nrow ${sub ? "sub" : ""}"><span>${esc(t(k))}</span><b>${tx(v)} ${u}</b></div>`;
    $("#sheet").innerHTML = `
      <div class="hero">${pic(r)}<button class="close" data-act="close" aria-label="${esc(t("close"))}">✕</button><button class="cam" data-act="photo" data-id="${r.id}">${I.cam}<span>${esc(photos.has(r.name) ? t("changeOwn") : t("useOwn"))}</span></button></div>
      <div class="sheet-in">
        <div class="title-row">
          <h2 id="d-name">${tx(rName(r))}</h2>
          <div class="icons">
            <button class="ico pin" data-act="pin" data-id="${r.id}" aria-pressed="${pins.has(r.name)}" aria-label="${esc(t("pin"))}">${I.pin}</button>
            <button class="ico heart" data-act="fav" data-id="${r.id}" aria-pressed="${favs.has(r.name)}" aria-label="${esc(t("fav"))}">${I.heart}</button>
            <button class="ico edit" data-act="edit" data-id="${r.id}" aria-label="${esc(t("edit"))}">${I.edit}</button>
          </div>
        </div>
        ${ed(r) ? `<p class="note edited-note">${I.edit}${esc(t("edited"))} · <button class="sv-reset" data-act="edit" data-id="${r.id}">${esc(t("edit"))}</button></p>` : ""}
        <div class="checkin" id="checkin"></div>
        <div class="stats">
          <div class="stat"><b>${tx(rTime(r))}</b><span>${esc(t("min"))}</span></div>
          <div class="stat"><b>${tx(r.protein)}<small>${G()}</small></b><span>${esc(t("protein"))}</span></div>
          <div class="stat"><b>${tx(r.carbs)}<small>${G()}</small></b><span>${esc(t("carbs"))}</span></div>
          <div class="stat"><b>${tx(r.kcal)}</b><span>${esc(t("kcal"))}</span></div>
        </div>
        <div class="nut">
          <button class="nut-toggle" data-act="nut" aria-expanded="${ui.nutOpen}" aria-controls="nut-body"><span>${esc(ui.nutOpen ? t("lessNut") : t("moreNut"))}</span>${I.chev}</button>
          <div class="nut-body" id="nut-body" ${ui.nutOpen ? "" : "hidden"}>
            ${nutRow("fat", N.fat, G())}${nutRow("satFat", N.sat, G(), true)}
            ${nutRow("carbs", r.carbs, G())}${nutRow("sugar", N.sugar, G(), true)}${nutRow("fiber", N.fiber, G(), true)}
            ${nutRow("netCarbs", N.net, G())}${nutRow("protein", r.protein, G())}${nutRow("salt", N.salt, G())}
            <p class="note">${esc(t("nutNote"))}</p>
          </div>
        </div>
        <p class="note">${r.family ? esc(t("ourRecipe")) + " · " : ""}${esc(cuisineName(r.cuisine))} · ${esc(t("perServing"))}${r.tags.length ? " · " + r.tags.map(x => tx(tt(x))).join(" · ") : ""}</p>
        <div class="servings" id="servings"></div>
        ${rKids(r) ? `<div class="kids">${I.kid}<div><b>${esc(t("forKids"))}</b><p>${tx(rKids(r))}</p></div></div>` : ""}
        ${rNote(r) ? `<div class="kids mynote">${I.edit}<div><b>${esc(t("f.note"))}</b><p>${tx(rNote(r))}</p></div></div>` : ""}
        <div><h4>${esc(t("youNeed"))}</h4><ul class="ingr" id="ingr-list"></ul></div>
        <div><h4>${esc(t("steps"))}</h4><p class="note" id="steps-note" hidden></p><ol class="steps">${rSteps(r).map((s, si) => `<li><span>${tx(s)}${timerBtns(s, si, r)}</span></li>`).join("")}</ol></div>
        ${leftoverBlock(r)}
        <div class="plan-box">
          <h4 style="margin:0">${esc(t("addWeek"))}</h4>
          <div class="row">
            <select id="pl-day" aria-label="${esc(t("nav.week"))}">${[0, 1, 2, 3, 4, 5, 6].map(i => `<option value="${i}" ${i === todayIdx ? "selected" : ""}>${esc(dayName(i))}</option>`).join("")}</select>
            <select id="pl-slot" aria-label="${esc(t("breakfast"))}">${SLOTS.map(k => `<option value="${k}" ${k === defSlot ? "selected" : ""}>${esc(slotName(k))}</option>`).join("")}</select>
            <button class="btn small" data-act="plan-add" data-id="${r.id}">${esc(t("add"))}</button>
          </div>
        </div>
        <div class="actions">
          <button class="btn ghost" data-act="ing-to-shop" data-id="${r.id}">${esc(t("addShopBtn"))}</button>
          ${photos.has(r.name) ? `<button class="btn danger" data-act="photo-del" data-id="${r.id}">${esc(t("backOriginal"))}</button>` : ""}
        </div>
      </div>`;
    renderCheckin(r); renderServings(r);
    showSheet("recipe");
  }
  function renderCheckin(r) {
    const list = eatenList(r), n = list.length, todayDone = list.at(-1) === dayKey();
    const stat = n ? `${esc(n === 1 ? t("eaten1") : t("eatenN", { n: loc(n) }))} · ${tx(t("lastOn", { d: fmtDay(list.at(-1)) }))}` : esc(t("never"));
    $("#checkin").innerHTML = todayDone
      ? `<span class="ci-done">${I.check}${esc(t("ateToday"))}</span><button class="sv-reset" data-act="uneat" data-id="${r.id}">${esc(t("undo"))}</button><span class="ci-stat">${stat}</span>`
      : `<button class="btn ci-btn" data-act="eat" data-id="${r.id}">${I.check}${esc(t("ate"))}</button><span class="ci-stat">${stat}</span>`;
  }
  function renderServings(r) {
    const n = servingsFor(r), changed = n !== r.servings;
    $("#servings").innerHTML = `
      <span class="sv-label">${esc(t("servings"))}</span>
      <div class="stepper">
        <button data-act="serv" data-d="-1" data-id="${r.id}" aria-label="${esc(t("fewer"))}" ${n <= 1 ? "disabled" : ""}>−</button>
        <b aria-live="polite">${tx(n)}</b>
        <button data-act="serv" data-d="1" data-id="${r.id}" aria-label="${esc(t("more"))}" ${n >= 24 ? "disabled" : ""}>+</button>
      </div>
      ${changed ? `<span class="sv-hint">${tx(n > r.servings ? t("leftovers", { n: n - r.servings }) : t("smaller"))}</span><button class="sv-reset" data-act="serv-reset" data-id="${r.id}">${tx(t("resetTo", { n: r.servings }))}</button>` : `<span class="sv-hint">${esc(t("tapPlus"))}</span>`}`;
    const done = new Set([...document.querySelectorAll("#ingr-list input:checked")].map(i => i.id));
    const open = new Set([...document.querySelectorAll("#ingr-list .swaps:not([hidden])")].map(p => p.id));
    $("#ingr-list").innerHTML = scaledIngredients(r).map((x, i) => {
      const sw = window.getSwaps && !(ed(r) && ed(r).ingredients) && !r.own ? window.getSwaps(r, r.ingredients[i], i) : null; const op = open.has("sw-" + i);
      return `<li><div class="ing-row"><label><input type="checkbox" id="ing-${i}" ${done.has("ing-" + i) ? "checked" : ""}><span>${tx(x)}</span></label>${sw ? `<button class="swap" data-act="swap-ing" data-i="${i}" aria-expanded="${op}" aria-controls="sw-${i}">${esc(op ? t("hide") : t("swap"))}</button>` : ""}</div>${sw ? `<p class="swaps" id="sw-${i}" ${op ? "" : "hidden"}>${esc(t("orUse"))} ${sw.map(a => tx(tt(a))).join(" · ")}</p>` : ""}</li>`;
    }).join("");
    const sn = $("#steps-note"); sn.hidden = !changed; sn.textContent = changed ? loc(t("stepsNote", { n: r.servings })) : "";
  }

  function finderCount() { return liveR().filter(r => matchInfo(r).main > 0).length; }
  function openFinder() {
    ui.openName = null;
    const groups = ["protein", "veg", "dairy", "pantry"];
    $("#sheet").innerHTML = `<div class="sheet-in finder">
      <div class="title-row"><h2 id="d-name">${esc(t("finderTitle"))}</h2><button class="close-plain" data-act="close" aria-label="${esc(t("close"))}">✕</button></div>
      <p class="note">${esc(t("finderIntro"))}</p>
      ${groups.map(gk => `<div><h4>${esc(t("g." + gk))}</h4><div class="pick">${PICK.filter(p => p.g === gk).map(p => `<button class="chip" data-act="have" data-v="${p.k}" aria-pressed="${have.has(p.k)}">${esc(pickLabel(p.k))}</button>`).join("")}</div></div>`).join("")}
      <div class="finder-bar"><button class="btn ghost" data-act="have-clear" ${have.size ? "" : "disabled"}>${esc(t("clearSel"))}</button><button class="btn" data-act="have-show" id="have-show">${tx(t("showN", { n: finderCount() }))}</button></div>
    </div>`;
    showSheet("finder");
  }

  // ---------- events ----------
  // ---------- share the shopping list ----------
  const CATCODE = { "Fruit & veg": "F", "Meat & fish": "M", "Dairy & eggs": "D", "Pantry": "P", "Other": "O" };
  const b64e = str => btoa(unescape(encodeURIComponent(str))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const b64d = str => decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/"))));
  async function shareList() {
    const items = shop.filter(i => !i.done).map(i => ({ t: shopText(i) + (i.n > 1 ? " ×" + i.n : ""), c: CATCODE[i.cat] || "O" }));
    if (!items.length) return;
    const url = location.href.split("#")[0] + "#list=" + b64e(JSON.stringify(items));
    const text = t("shareTitle") + ":\n" + catOrder.map(c => items.filter(x => GCAT[x.c] === c).map(x => "- " + x.t).join("\n")).filter(Boolean).join("\n");
    try { if (navigator.share) { await navigator.share({ title: t("shareTitle"), text, url }); return; } } catch (e) { if (e && e.name === "AbortError") return; }
    try { await navigator.clipboard.writeText(text + "\n\n" + url); toast(t("shareCopied")); }
    catch (e) { const ta = document.createElement("textarea"); ta.value = text + "\n\n" + url; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch (e2) { } ta.remove(); toast(ok ? t("shareCopied") : t("copyBlocked")); }
  }
  function readSharedList() {
    const m = (location.hash || "").match(/^#list=([A-Za-z0-9_-]+)/); if (!m) return false;
    try { const items = JSON.parse(b64d(m[1])); if (Array.isArray(items) && items.length) ui.importList = items.filter(x => x && typeof x.t === "string").slice(0, 300); } catch (e) { }
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) { }
    return !!ui.importList;
  }

  let photoFor = null;
  document.addEventListener("click", async e => {
    const menu = $("#lang-menu");
    if (menu && !menu.hidden && !e.target.closest(".lang-wrap")) menu.hidden = true;
    const nav = e.target.closest("[data-nav]");
    if (nav) { closeSheet(); go(nav.dataset.nav); return; }
    if (e.target.id === "scrim") { closeSheet(); return; }
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    const r = el.dataset.id != null && el.dataset.id !== "" ? recipes[+el.dataset.id] : null;
    if (act !== "open" && act !== "shop-toggle") e.stopPropagation();

    switch (act) {
      case "open": openRecipe(r); break;
      case "close": closeSheet(); break;
      case "lang-menu": { const m = $("#lang-menu"); m.hidden = !m.hidden; break; }
      case "lang": ui.lang = el.dataset.v; store.set("lang", ui.lang); recipes.forEach(x => x._hayLang = null); ensureLang(ui.lang, applyLang); break;
      case "meal": ui.meal = el.dataset.v; store.set("meal", ui.meal); renderTop(); renderRecipes(); break;
      case "speed": ui.speed = el.dataset.v; renderTop(); renderRecipes(); break;
      case "cuisine": { const sc = el.parentElement.scrollLeft; ui.cuisine = el.dataset.v; renderTop(); const row = document.querySelector(".cuis"); if (row) row.scrollLeft = sc; renderRecipes(); break; }
      case "fav":
        favs.has(r.name) ? favs.delete(r.name) : favs.add(r.name); saveAll();
        document.querySelectorAll(`[data-act="fav"][data-id="${r.id}"]`).forEach(b => b.setAttribute("aria-pressed", favs.has(r.name)));
        toast(favs.has(r.name) ? t("favAdded") : t("favRemoved"));
        if (ui.view === "favs") renderFavs();
        break;
      case "pin":
        pins.has(r.name) ? pins.delete(r.name) : pins.add(r.name); saveAll();
        toast(pins.has(r.name) ? t("pinOn") : t("pinOff"));
        renderView(); if (ui.openName) openRecipe(r);
        break;
      case "eat": { (eaten[r.name] = eaten[r.name] || []).push(dayKey()); saveAll(); renderCheckin(r); renderView(); toast(t("logged")); break; }
      case "uneat": { const l = eaten[r.name] || []; if (l.at(-1) === dayKey()) l.pop(); if (!l.length) delete eaten[r.name]; saveAll(); renderCheckin(r); renderView(); toast(t("unlogged")); break; }
      case "nut": { ui.nutOpen = !ui.nutOpen; store.set("nutOpen", ui.nutOpen); const b = $("#nut-body"); b.hidden = !ui.nutOpen; el.setAttribute("aria-expanded", ui.nutOpen); el.querySelector("span").textContent = ui.nutOpen ? t("lessNut") : t("moreNut"); break; }
      case "suggest": suggestWeek(); planDone = {}; saveAll(); renderWeek(); toast(t("freshWeek")); break;
      case "swap": {
        const di = +el.dataset.day, k = el.dataset.slot;
        const oc = cellRecipe(di, k === "l" ? "d" : "l"); const avoid = new Set(k !== "b" && oc ? [oc.r.cuisine] : []);
        if (k === "l" && di > 0 && plan[di].l && plan[di].l.startsWith("@lo:")) plan[di - 1].lb = false;
        plan[di][k] = choose(rule(di, k), usedNames(), avoid).name; delete planDone[di + k];
        if (k === "d") syncLunchbox(di);
        saveAll(); renderWeek(); break;
      }
      case "clear-slot": { const di = +el.dataset.day, k = el.dataset.slot; if (k === "l" && di > 0 && plan[di].l && plan[di].l.startsWith("@lo:")) plan[di - 1].lb = false; plan[di][k] = null; delete planDone[di + k]; if (k === "d") syncLunchbox(di); saveAll(); renderWeek(); break; }
      case "clear-week": plan = [0, 1, 2, 3, 4, 5, 6].map(() => ({ b: null, l: null, d: null })); planDone = {}; saveAll(); renderWeek(); toast(t("weekCleared")); break;
      case "slot-eat": {
        const di = +el.dataset.day, k = el.dataset.slot, c = cellRecipe(di, k); if (!c) break;
        const key = di + k, l = eaten[c.r.name] = eaten[c.r.name] || [];
        if (planDone[key]) { delete planDone[key]; if (l.at(-1) === dayKey()) l.pop(); if (!l.length) delete eaten[c.r.name]; toast(t("unlogged")); }
        else { planDone[key] = true; l.push(dayKey()); toast(t("logged")); }
        saveAll(); renderWeek(); break;
      }
      case "lunchbox": { const di = +el.dataset.day; plan[di].lb = !plan[di].lb; syncLunchbox(di); saveAll(); renderWeek(); if (plan[di].lb) toast(t("lunchbox")); break; }
      case "edit": openEditor(r); break;
      case "new-recipe": openEditor(null); break;
      case "edit-cancel": openRecipe(r); break;
      case "edit-save": { const x = saveEditor(r); if (x) { renderTop(); renderView(); openRecipe(x); } break; }
      case "edit-reset": delete edits[r.name]; r._hayLang = null; saveAll(); toast(t("restored")); renderView(); openRecipe(r); break;
      case "own-delete":
        if (!ui.confirmDel) { ui.confirmDel = true; el.textContent = t("tapAgainDelete"); setTimeout(() => { ui.confirmDel = false; const b = $("#del-btn"); if (b) b.textContent = t("deleteRecipe"); }, 4000); break; }
        r.deleted = true; mine = mine.filter(x => x.uid !== r.uid); favs.delete(r.name); pins.delete(r.name);
        plan.forEach((p, di) => SLOTS.forEach(k => { if (p[k] === r.name || p[k] === "@lo:" + r.name) p[k] = null; }));
        saveAll(); closeSheet(); renderTop(); renderView(); toast(t("deleted")); break;
      case "timer": { const rr = recipes[+el.dataset.id]; startTimer(+el.dataset.sec, rName(rr) + " · " + t("timerStep", { n: el.dataset.step })); break; }
      case "timer-add": { const tm = timers.find(x => x.id === el.dataset.tid); if (tm) { tm.end += 60000; tm.rang = false; } renderTimers(); break; }
      case "timer-stop": timers = timers.filter(x => x.id !== el.dataset.tid); tickTimers(); break;
      case "sort-mode": ui.sortMode = !ui.sortMode; renderShop(); break;
      case "cat-up": case "cat-down": {
        const vis = catOrder.filter(c => ui.sortMode || shop.some(i => i.cat === c)), i = vis.indexOf(el.dataset.v), j = act === "cat-up" ? i - 1 : i + 1;
        if (j < 0 || j >= vis.length) break;
        const a = catOrder.indexOf(vis[i]), b = catOrder.indexOf(vis[j]); [catOrder[a], catOrder[b]] = [catOrder[b], catOrder[a]];
        saveAll(); renderShop(); break;
      }
      case "share-list": await shareList(); break;
      case "import-yes": { const n = ui.importList.length; ui.importList.forEach(x => addShop(x.t, null, null, GCAT[x.c] || "Other")); ui.importList = null; saveAll(); renderShop(); toast(t("imported", { n })); break; }
      case "import-no": ui.importList = null; renderShop(); break;
      case "week-to-shop": {
        const n = weekToShop();
        if (!n) { toast(t("planFirst")); break; }
        toast(t("addedMeals", { n })); updateCount();
        if (ui.view === "shop") renderShop();
        break;
      }
      case "plan-add": {
        const di = +$("#pl-day").value, k = $("#pl-slot").value;
        plan[di][k] = r.name; saveAll();
        toast(t("addedTo", { day: dayName(di), slot: slotName(k).toLowerCase() }));
        if (ui.view === "week") renderWeek();
        break;
      }
      case "ing-to-shop": addRecipeToShop(r); saveAll(); updateCount(); toast(t("addedShop")); if (ui.view === "shop") renderShop(); break;
      case "shop-toggle": { const it = shop.find(i => i.id === el.dataset.sid); if (it) { it.done = el.checked; saveAll(); renderShop(); } break; }
      case "shop-del": shop = shop.filter(i => i.id !== el.dataset.sid); saveAll(); renderShop(); break;
      case "shop-clear-done": shop = shop.filter(i => !i.done); saveAll(); renderShop(); break;
      case "shop-clear-all":
        if (!ui.confirmClear) { ui.confirmClear = true; renderShop(); setTimeout(() => { if (ui.confirmClear) { ui.confirmClear = false; if (ui.view === "shop") renderShop(); } }, 4000); }
        else { shop = []; ui.confirmClear = false; saveAll(); renderShop(); toast(t("listCleared")); }
        break;
      case "copy": {
        const text = catOrder.map(c => { const it = shop.filter(i => i.cat === c && !i.done); return it.length ? t("cat." + c) + ":\n" + it.map(i => "- " + loc(shopText(i)) + (i.n > 1 ? " ×" + loc(i.n) : "")).join("\n") : ""; }).filter(Boolean).join("\n\n");
        try { await navigator.clipboard.writeText(text); toast(t("copied")); }
        catch (err) {
          const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
          let ok = false; try { ok = document.execCommand("copy"); } catch (e2) { }
          ta.remove(); toast(ok ? t("copied") : t("copyBlocked"));
        }
        break;
      }
      case "serv": { const n = Math.min(24, Math.max(1, servingsFor(r) + +el.dataset.d)); if (n === r.servings) delete serv[r.name]; else serv[r.name] = n; saveAll(); renderServings(r); break; }
      case "serv-reset": delete serv[r.name]; saveAll(); renderServings(r); break;
      case "swap-ing": { const p = document.getElementById("sw-" + el.dataset.i); p.hidden = !p.hidden; el.setAttribute("aria-expanded", String(!p.hidden)); el.textContent = p.hidden ? t("swap") : t("hide"); break; }
      case "photo": photoFor = r; $("#photo-input").value = ""; $("#photo-input").click(); break;
      case "photo-del":
        await idbDo("readwrite", s => s.delete(r.name));
        if (photos.has(r.name)) URL.revokeObjectURL(photos.get(r.name));
        photos.delete(r.name); renderView(); openRecipe(r); toast(t("photoRestored"));
        break;
      case "finder": openFinder(); break;
      case "sugg": addManual(el.dataset.text, el.dataset.cat); renderShop(); { const i2 = $("#shop-input"); i2.value = ""; i2.focus(); renderSuggest(); } break;
      case "hist-del": delete hist[el.dataset.text.toLowerCase()]; store.set("shopHist", hist); { const i2 = $("#shop-input"); i2.focus(); renderSuggest(); } break;
      case "have": {
        const k = el.dataset.v; have.has(k) ? have.delete(k) : have.add(k); saveAll();
        el.setAttribute("aria-pressed", have.has(k));
        $("#have-show").textContent = loc(t("showN", { n: finderCount() }));
        $('[data-act="have-clear"]').disabled = !have.size;
        break;
      }
      case "have-clear": have.clear(); saveAll(); openFinder(); break;
      case "have-show":
        if (!have.size) { toast(t("pickSome")); break; }
        ui.haveMode = true; closeSheet(); if (ui.view !== "recipes") go("recipes"); else renderRecipes(); window.scrollTo(0, 0); break;
      case "have-off": ui.haveMode = false; renderRecipes(); break;
      case "g-p": ui.g = { p: +el.dataset.i, m: null, c: null }; renderGuide(); { const s = $("#g-step2"); if (s) s.scrollIntoView({ behavior: "smooth", block: "start" }); } break;
      case "g-m": ui.g.m = el.dataset.v; ui.g.c = null; renderGuide(); { const s = $("#g-result"); if (s) s.scrollIntoView({ behavior: "smooth", block: "nearest" }); } break;
      case "g-c": ui.g.c = +el.dataset.i; renderGuide(); break;
    }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { if (!$("#sheet").hidden) closeSheet(); const m = $("#lang-menu"); if (m) m.hidden = true; }
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
      toast(db ? t("photoSaved") : t("photoNoSave"));
    } catch (err) { toast(t("photoBad")); }
  });

  // ---------- start ----------
  if (!["breakfast", "main"].includes(ui.meal)) ui.meal = "breakfast";
  if (!LANGS.some(l => l.code === ui.lang)) ui.lang = "en";
  document.querySelectorAll("section[data-view]").forEach(s => s.hidden = s.dataset.view !== ui.view);
  if (readSharedList()) ui.view = "shop";
  document.querySelectorAll("section[data-view]").forEach(s2 => s2.hidden = s2.dataset.view !== ui.view);
  applyLang();
  loadPhotos();
  let photoT;
  window.onPhotos = () => { clearTimeout(photoT); photoT = setTimeout(() => { renderView(); if (ui.openName) { const r = byName.get(ui.openName); const h = document.querySelector(".hero"); if (r && h && h.querySelector(".ph-wait")) h.querySelector(".ph-wait").outerHTML = pic(r); } }, 60); };
  [1, 2, 3, 4].forEach(n => { const sc = document.createElement("script"); sc.src = "photos-" + n + ".js"; sc.async = true; document.body.appendChild(sc); });
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(() => { });
})();
