// =====================================================================
// EXTRA NUTRITION — rough per-serving estimate of fat, saturated fat,
// fibre, sugars and salt, worked out from the English ingredient list.
// Values per 100 g: fib, sug, sat, salt. w = grams for one piece,
// d = grams when no amount is given, can/bunch = grams for that unit.
// Kids' side carbs (rice, pasta, bread…) are left out on purpose.
// =====================================================================
(function () {
  const R = [
    [/peanut butter|almond butter/, { fib: 6, sug: 6, sat: 10, salt: .5, d: 15 }],
    [/tahini/, { fib: 9, sug: .5, sat: 8, d: 15 }],
    [/coconut milk/, { sug: 2, sat: 7, d: 200, can: 400 }],
    [/coconut oil/, { sat: 87, d: 10 }],
    [/sesame oil|olive oil|rapeseed|neutral oil|avocado oil|\boil\b/, { sat: 10, d: 10 }],
    [/ghee/, { sat: 60, d: 10 }],
    [/butter(?! beans)/, { sat: 51, salt: 1.2, d: 5 }],
    [/cream cheese/, { sug: 3, sat: 9, salt: .8, d: 30 }],
    [/crème fraiche|cooking cream|light cream|\bcream\b/, { sug: 3, sat: 9, salt: .1, d: 100 }],
    [/tzatziki|raita|mast-o/, { sug: 3.5, sat: 2.5, salt: .6, d: 100 }],
    [/labneh/, { sug: 3.5, sat: 5, salt: 1, d: 100 }],
    [/yogurt|yoghurt/, { sug: 3.5, sat: 2.5, salt: .1, d: 100 }],
    [/skyr|kvarg|quark/, { sug: 3.5, sat: .2, salt: .1, d: 150 }],
    [/cottage|keso/, { sug: 2.7, sat: 2, salt: .9, d: 150 }],
    [/ricotta/, { sug: 3, sat: 8, salt: .3, d: 100 }],
    [/feta|goat cheese/, { sug: 1, sat: 15, salt: 2.6, d: 40 }],
    [/halloumi/, { sug: 1.5, sat: 17, salt: 2.7, w: 225, d: 80 }],
    [/parmesan|pecorino/, { sat: 19, salt: 1.6, d: 20 }],
    [/mozzarella/, { sug: 1, sat: 10, salt: .6, w: 125, d: 60 }],
    [/cheese/, { sug: .5, sat: 15, salt: 1.6, w: 20, d: 30 }],
    [/almond milk|soy milk|oat milk/, { fib: .3, sug: .5, sat: .2, salt: .1, d: 200 }],
    [/\bmilk\b/, { sug: 4.8, sat: 1, salt: .1, d: 100 }],
    [/\beggs?\b|egg yolk/, { sug: .4, sat: 3.1, salt: .35, w: 55, d: 55 }],
    [/kaviar|roe/, { sug: 5, sat: 3, salt: 8, d: 15 }],
    [/smoked salmon|hot-smoked|gravlax|mackerel/, { sat: 4, salt: 3, w: 60, d: 60 }],
    [/salmon|trout|arctic char/, { sat: 2.5, salt: .1, w: 140, d: 140 }],
    [/\bcod\b|white fish|pollock|haddock|hake|sea bass|fish(?! sauce)/, { sat: .1, salt: .2, w: 170, d: 160 }],
    [/shrimp|prawn/, { sat: .2, salt: 1, d: 150 }],
    [/tuna/, { sat: .3, salt: .9, w: 120, can: 120, d: 120 }],
    [/sausage/, { sat: 4, salt: 2, w: 70, d: 70 }],
    [/turkey slices|turkey breast slices|sliced turkey/, { sat: .5, salt: 2, d: 60 }],
    [/drumstick/, { sat: 3, salt: .2, w: 110 }],
    [/whole chicken/, { sat: 3, salt: .2, w: 1100 }],
    [/thigh/, { sat: 2.5, salt: .2, w: 110, d: 110 }],
    [/chicken(?! stock| broth)|turkey/, { sat: .5, salt: .15, w: 170, d: 150 }],
    [/lamb/, { sat: 8, salt: .2, d: 150 }],
    [/mince|beef|steak|sirloin/, { sat: 4.5, salt: .2, d: 150 }],
    [/tofu/, { fib: 1, sug: .5, sat: .7, d: 150 }],
    [/soy sauce|tamari|\bsoy\b|coconut aminos/, { sug: 1, salt: 14, d: 10 }],
    [/fish sauce/, { sug: 4, salt: 23, d: 10 }],
    [/oyster sauce/, { sug: 15, salt: 10, d: 15 }],
    [/gochujang/, { fib: 3, sug: 25, salt: 7, d: 15 }],
    [/doubanjiang|chili bean paste/, { salt: 12, d: 15 }],
    [/miso/, { fib: 5, sug: 6, salt: 12, d: 15 }],
    [/curry paste|tandoori spice|tikka paste/, { sug: 5, salt: 6, d: 20 }],
    [/pesto/, { sug: 1, sat: 8, salt: 2.5, d: 30 }],
    [/tomato paste/, { fib: 4, sug: 12, salt: .2, d: 15 }],
    [/passata|chopped tomatoes|crushed tomatoes|canned tomato/, { fib: 1.5, sug: 4.5, salt: .1, can: 400, d: 200 }],
    [/sun-dried/, { fib: 12, sug: 30, salt: 1, w: 8 }],
    [/cherry tomato/, { fib: 1.2, sug: 2.6, w: 15, d: 100 }],
    [/tomato/, { fib: 1.2, sug: 2.6, w: 120, d: 100 }],
    [/salsa|pico de gallo/, { fib: 1.5, sug: 4, salt: 1.5, d: 40 }],
    [/stock|broth|bouillon/, { sug: .3, salt: .8, d: 250 }],
    [/kidney beans|black beans|lima|butter beans|cannellini|chickpeas/, { fib: 6, sug: .5, salt: .4, can: 240, d: 60 }],
    [/split peas|lentil/, { fib: 25, sug: 2.5, d: 60 }],
    [/edamame/, { fib: 5, sug: 2, d: 60 }],
    [/\bpeas\b/, { fib: 5, sug: 5, d: 80 }],
    [/sweet potato/, { fib: 3, sug: 4.2, w: 250 }],
    [/broccoli|broccolini/, { fib: 2.6, sug: 1.7, w: 350, d: 150 }],
    [/cauliflower|cauli\b/, { fib: 2, sug: 1.9, w: 600, d: 200 }],
    [/zucchini/, { fib: 1, sug: 2.5, w: 250, d: 150 }],
    [/eggplant/, { fib: 3, sug: 3.5, w: 300 }],
    [/bell pepper|sweet pepper|green peppers?|red pepper|yellow pepper|\bpeppers?\b(?! flakes)/, { fib: 2, sug: 4.2, w: 150, d: 100 }],
    [/mushroom/, { fib: 1, sug: 2, w: 20, d: 150 }],
    [/spinach/, { fib: 2.2, sug: .4, handful: 30, d: 60 }],
    [/kale|chard|bok choy|pak choi/, { fib: 2, sug: 1, w: 150, d: 100 }],
    [/cabbage|coleslaw/, { fib: 2.5, sug: 3.2, w: 900, d: 150 }],
    [/lettuce|romaine|rocket|salad leaves|mixed leaves|little gem|leaves/, { fib: 1.3, sug: 1.2, w: 250, d: 60, handful: 25 }],
    [/cucumber/, { fib: .5, sug: 1.7, w: 300, d: 100 }],
    [/avocado|guacamole/, { fib: 6.7, sug: .7, sat: 2.1, w: 150, d: 75 }],
    [/asparagus/, { fib: 2.1, sug: 1.9, w: 18, bunch: 250, d: 120 }],
    [/green beans|sugar snap|snap peas/, { fib: 3, sug: 3, d: 100 }],
    [/spring onion|scallion/, { fib: 2.6, sug: 2.3, w: 15, bunch: 100 }],
    [/onion|leek|shallot/, { fib: 1.7, sug: 4.2, w: 110, d: 60 }],
    [/carrot/, { fib: 2.8, sug: 4.7, w: 80, d: 60 }],
    [/celery|celeriac|swede/, { fib: 1.6, sug: 1.5, w: 40, d: 60 }],
    [/radish/, { fib: 1.6, sug: 1.9, w: 15, d: 40 }],
    [/fennel bulb/, { fib: 3, sug: 3.9, w: 250 }],
    [/lemon|lime/, { sug: 2.5, w: 40, d: 15 }],
    [/blueberr/, { fib: 2.4, sug: 10, d: 50 }],
    [/raspberr|strawberr|berries|berry(?! molasses)/, { fib: 6, sug: 4.5, d: 80 }],
    [/pomegranate molasses/, { sug: 60, d: 15 }],
    [/pomegranate seeds/, { fib: 4, sug: 14, d: 30 }],
    [/raisin|cranberr|barberr/, { fib: 3, sug: 60, d: 10 }],
    [/honey|maple/, { sug: 82, d: 10 }],
    [/walnut|pecan/, { fib: 6.7, sug: 2.6, sat: 6, d: 20 }],
    [/almond flour/, { fib: 10, sug: 4, sat: 4, d: 50 }],
    [/coconut flour/, { fib: 39, sug: 9, sat: 12, d: 30 }],
    [/protein powder/, { sug: 5, salt: .5, d: 25 }],
    [/cocoa/, { fib: 33, sug: 2, sat: 13, d: 10 }],
    [/almond|cashew|pistach|pine nuts|hazelnut/, { fib: 12, sug: 4.4, sat: 4, d: 20, w: 1.2 }],
    [/peanut/, { fib: 8, sug: 4, sat: 7, salt: .5, d: 20 }],
    [/chia/, { fib: 34, sat: 3.3, d: 12 }],
    [/flax|linseed/, { fib: 27, sat: 3.7, d: 7 }],
    [/hemp/, { fib: 4, sat: 4.5, d: 10 }],
    [/sesame/, { fib: 12, sat: 7, d: 5 }],
    [/olives?\b/, { fib: 3.3, sat: 2, salt: 3.5, w: 4, d: 30 }],
    [/capers/, { salt: 7, d: 10 }],
    [/pickle|kimchi/, { sug: 2, salt: 2, d: 30 }],
    [/mustard|dijon/, { sug: 3, salt: 5, d: 5 }],
    [/matvete|wheat berr/, { fib: 10, sug: .5, d: 30 }],
    [/parsley|coriander|\bdill\b|\bmint\b|basil|chives|tarragon|thyme|rosemary|herbs/, { fib: 3, sug: .8, bunch: 40, handful: 10, d: 5 }]
  ];
  const KIDS_CARBS = /\b(rice|pasta|noodles|tortilla|bread|pita|naan|potato(?!.*sweet)|couscous|bulgur|orzo|lavash)\b/;
  const FR = { "½": .5, "¼": .25, "¾": .75, "⅓": 1 / 3, "⅔": 2 / 3 };
  const num = s => { s = s.replace(/\s/g, ""); const m = s.match(/^(\d+(?:[.,]\d+)?)?([½¼¾⅓⅔])?$/); return m ? (m[1] ? parseFloat(m[1].replace(",", ".")) : 0) + (m[2] ? FR[m[2]] : 0) : NaN; };
  const AMT = /^\s*(?:(?:adults|sauce|marinade|dressing|topping|glaze|slaw|mast-o-khiar|chermoula)\s*:\s*)?(\d+(?:[.,]\d+)?\s?[½¼¾⅓⅔]?|[½¼¾⅓⅔])(?:\s?[–-]\s?(\d+(?:[.,]\d+)?[½¼¾⅓⅔]?|[½¼¾⅓⅔]))?\s*(kg|g|ml|l|litres?|litre|tbsp|tsp|cups?|cans?|jars?|bunch(?:es)?|handfuls?|cloves?|pinch|packs?|heads?|bags?)?\b/i;

  function grams(seg, v) {
    const m = seg.match(AMT);
    if (!m) return v.d ?? v.w ?? 50;
    let q = num(m[1]); if (m[2]) { const b = num(m[2]); if (!isNaN(b)) q = (q + b) / 2; }
    if (isNaN(q)) return v.d ?? 50;
    const u = (m[3] || "").toLowerCase();
    if (u === "kg") return q * 1000;
    if (u === "g" || u === "ml") return q;
    if (/^l|litre/.test(u)) return q * 1000;
    if (u === "tbsp") return q * 15;
    if (u === "tsp") return q * 5;
    if (/^cup/.test(u)) return q * 240;
    if (/^can|^jar/.test(u)) return q * (v.can || 400);
    if (/^bunch/.test(u)) return q * (v.bunch || 40);
    if (/^handful/.test(u)) return q * (v.handful || 30);
    if (/^clove/.test(u)) return q * 4;
    if (u === "pinch") return q * .3;
    if (/^pack|^bag/.test(u)) return q * 300;
    if (/^head/.test(u)) return q * (v.w || 300);
    return q * (v.w ?? v.d ?? 50);
  }

  window.estimateNutrition = function (r) {
    const tot = { fib: 0, sug: 0, sat: 0, salt: 0 };
    let tasteSalt = false;
    for (const line of r.ingredients) {
      const l = line.toLowerCase();
      if (/^kids\b|\(kids\)|kids:/.test(l)) continue;
      if (/\bsalt\b/.test(l) && /taste|pinch|salt,|salt and|salt &/.test(l) && !/fish|soy/.test(l)) tasteSalt = true;
      for (const seg of l.split(/,(?![^(]*\))|;|\s\+\s/)) {
        if (KIDS_CARBS.test(seg) && !/cauliflower|broccoli|shirataki/.test(seg)) continue;
        const rule = R.find(([re]) => re.test(seg));
        if (!rule) continue;
        const v = rule[1], g = grams(seg, v) / 100;
        tot.fib += (v.fib || 0) * g; tot.sug += (v.sug || 0) * g; tot.sat += (v.sat || 0) * g; tot.salt += (v.salt || 0) * g;
      }
    }
    const s = r.servings || 1;
    let fib = tot.fib / s, sug = tot.sug / s, sat = tot.sat / s, salt = tot.salt / s + (tasteSalt ? .8 : 0);
    const fat = Math.max(0, (r.kcal - 4 * r.protein - 4 * r.carbs) / 9);
    if (fib + sug > r.carbs) { const k = (r.carbs * .9) / (fib + sug || 1); fib *= k; sug *= k; }
    sat = Math.min(sat, fat * .6);
    const r1 = x => Math.round(x * 10) / 10;
    return { fat: Math.round(fat), sat: r1(sat), fiber: r1(fib), sugar: r1(sug), salt: r1(salt), net: Math.max(0, Math.round(r.carbs - fib)) };
  };
})();
