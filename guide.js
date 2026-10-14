// =====================================================================
// COOKING GUIDE — temperature and time per protein, cut and method.
// Text is in English; translations live in i18n-data.js (by exact text).
//   m: method  (oven, pan, airfryer, grill, boil, steam, simmer, slowcooker, poach)
//   heat: oven/air-fryer temperature like "200°C", or a stove level (low, medium, medium-high, high)
//   t: time, u: "min" or "h", side: true = per side
// Times are guides for typical sizes; ovens and pans vary.
// =====================================================================
const GUIDE = [
  { id: "chicken", name: "Chicken", photo: "joojeh-kabab-saffron-chicken", cuts: [
    { name: "Breast fillet", size: "150–200 g", core: "72°C", methods: [
      { m: "oven", heat: "200°C", t: "20–25", u: "min", tip: "Rest 5 minutes before slicing." },
      { m: "pan", heat: "medium-high", t: "5–7", u: "min", side: true, tip: "Butterfly or flatten thick fillets so they cook evenly." },
      { m: "airfryer", heat: "190°C", t: "16–20", u: "min", tip: "Turn halfway." },
      { m: "grill", heat: "high", t: "5–7", u: "min", side: true },
      { m: "poach", heat: "low", t: "12–15", u: "min", tip: "Keep the water just below boiling. Great for salads." } ] },
    { name: "Thigh fillet, boneless", size: "100–120 g each", core: "75°C", methods: [
      { m: "oven", heat: "200°C", t: "20–25", u: "min", tip: "Thighs stay juicy even at 80°C." },
      { m: "pan", heat: "medium-high", t: "5–6", u: "min", side: true },
      { m: "airfryer", heat: "190°C", t: "15–18", u: "min", tip: "Turn halfway." },
      { m: "grill", heat: "high", t: "5–6", u: "min", side: true } ] },
    { name: "Inner fillets", size: "30–40 g each", core: "72°C", methods: [
      { m: "pan", heat: "medium-high", t: "2–3", u: "min", side: true },
      { m: "oven", heat: "200°C", t: "12–15", u: "min" },
      { m: "airfryer", heat: "180°C", t: "10–12", u: "min" } ] },
    { name: "Drumsticks & legs, bone-in", size: "120–250 g each", core: "80°C", methods: [
      { m: "oven", heat: "200°C", t: "40–50", u: "min", tip: "The juices should run clear by the bone." },
      { m: "airfryer", heat: "190°C", t: "22–25", u: "min", tip: "Turn halfway." },
      { m: "grill", heat: "medium", t: "30–40", u: "min", tip: "Turn often so the skin doesn't burn." } ] },
    { name: "Whole chicken", size: "1.5–1.8 kg", core: "75°C", methods: [
      { m: "oven", heat: "200°C", t: "60–80", u: "min", tip: "Measure in the thickest part of the thigh. Rest 10–15 minutes before carving." } ] } ] },

  { id: "salmon", name: "Salmon", photo: "lemon-dill-salmon-broccoli", cuts: [
    { name: "Fillet piece", size: "125–150 g, about 3 cm thick", core: "52°C", methods: [
      { m: "oven", heat: "200°C", t: "12–15", u: "min", tip: "For extra juicy salmon: 150°C for 18–22 minutes." },
      { m: "pan", heat: "medium-high", t: "6–7", u: "min", tip: "Skin side down for 4–5 minutes, then flip for 1–2 minutes." },
      { m: "airfryer", heat: "200°C", t: "8–10", u: "min" },
      { m: "grill", heat: "medium-high", t: "3–4", u: "min", side: true },
      { m: "steam", heat: "medium", t: "8–10", u: "min" } ] },
    { name: "Whole side", size: "0.8–1.2 kg", core: "52°C", methods: [
      { m: "oven", heat: "175°C", t: "20–25", u: "min", tip: "Or 150°C for 25–30 minutes for a silky texture." } ] } ] },

  { id: "whitefish", name: "White fish (cod, pollock, haddock)", photo: "herb-crusted-cod-asparagus", cuts: [
    { name: "Thin fillet", size: "1–2 cm thick", core: "55°C", methods: [
      { m: "oven", heat: "200°C", t: "10–12", u: "min" },
      { m: "pan", heat: "medium", t: "2–3", u: "min", side: true, tip: "Flip carefully with a wide spatula." },
      { m: "steam", heat: "medium", t: "6–8", u: "min" },
      { m: "airfryer", heat: "200°C", t: "8–10", u: "min" } ] },
    { name: "Thick loin", size: "3–4 cm thick", core: "55°C", methods: [
      { m: "oven", heat: "200°C", t: "15–18", u: "min" },
      { m: "pan", heat: "medium-high", t: "4", u: "min", side: true } ] },
    { name: "Whole fish (sea bass, trout)", size: "400–600 g", core: "55°C", methods: [
      { m: "oven", heat: "200°C", t: "20–25", u: "min", tip: "Done when the flesh comes away easily from the bone." },
      { m: "grill", heat: "medium-high", t: "6–8", u: "min", side: true } ] } ] },

  { id: "shrimp", name: "Shrimp", photo: "gambas-al-ajillo-garlic-shrimp", cuts: [
    { name: "Raw, peeled", size: "", core: "Pink and opaque", methods: [
      { m: "pan", heat: "high", t: "2–3", u: "min", tip: "Take them off as soon as they curl and turn pink." },
      { m: "oven", heat: "220°C", t: "6–8", u: "min" },
      { m: "grill", heat: "high", t: "1–2", u: "min", side: true },
      { m: "boil", heat: "high", t: "2–3", u: "min" },
      { m: "airfryer", heat: "200°C", t: "6–8", u: "min" } ] } ] },

  { id: "beef", name: "Beef", photo: "steak-rocket-salad", cuts: [
    { name: "Steak", size: "about 2.5 cm thick", core: "52°C rare · 56°C medium-rare · 60°C medium · 70°C well done", methods: [
      { m: "pan", heat: "high", t: "2–3", u: "min", side: true, tip: "Take it out of the fridge 30 minutes before. Rest 5 minutes after cooking." },
      { m: "grill", heat: "high", t: "2–4", u: "min", side: true },
      { m: "oven", heat: "125°C", t: "25–35", u: "min", tip: "Slow oven first, then sear 1 minute per side in a very hot pan." } ] },
    { name: "Roast beef", size: "about 1 kg", core: "55–58°C pink", methods: [
      { m: "oven", heat: "125°C", t: "60–80", u: "min", tip: "Brown all sides in a pan first. Rest 10 minutes before slicing thinly." } ] },
    { name: "Stew chunks", size: "3–4 cm cubes", core: "Fork-tender", methods: [
      { m: "simmer", heat: "low", t: "1½–2½", u: "h", tip: "Brown the meat first and keep the lid on." },
      { m: "oven", heat: "160°C", t: "2–2½", u: "h", tip: "Use a covered ovenproof pot." },
      { m: "slowcooker", heat: "low", t: "7–8", u: "h" } ] } ] },

  { id: "mince", name: "Mince (beef, lamb, chicken, turkey)", photo: "beef-meatballs-in-tomato-sauce", cuts: [
    { name: "Burger patties", size: "about 2 cm thick", core: "72°C", methods: [
      { m: "pan", heat: "medium-high", t: "4–5", u: "min", side: true },
      { m: "grill", heat: "medium-high", t: "4–5", u: "min", side: true },
      { m: "oven", heat: "200°C", t: "15–20", u: "min" },
      { m: "airfryer", heat: "190°C", t: "10–12", u: "min" } ] },
    { name: "Meatballs", size: "walnut-sized", core: "72°C", methods: [
      { m: "oven", heat: "225°C", t: "12–15", u: "min" },
      { m: "pan", heat: "medium", t: "8–10", u: "min", tip: "Shake the pan so they brown on all sides." },
      { m: "airfryer", heat: "200°C", t: "8–10", u: "min" },
      { m: "simmer", heat: "low", t: "15–20", u: "min", tip: "Cook raw meatballs straight in the sauce." } ] },
    { name: "Kabab koobideh / kofta", size: "long flat kebabs", core: "72°C", methods: [
      { m: "grill", heat: "high", t: "4–5", u: "min", side: true },
      { m: "oven", heat: "240°C", t: "10–12", u: "min", tip: "Use the top shelf or the grill function for colour." } ] },
    { name: "Loose mince", size: "", core: "No pink left", methods: [
      { m: "pan", heat: "medium-high", t: "6–8", u: "min", tip: "Break it up as it browns." } ] } ] },

  { id: "lamb", name: "Lamb", photo: "kabab-barg-saffron-lamb-fillet", cuts: [
    { name: "Chops & cutlets", size: "2–3 cm thick", core: "58–60°C pink · 65°C medium", methods: [
      { m: "pan", heat: "high", t: "3–4", u: "min", side: true },
      { m: "grill", heat: "high", t: "3–4", u: "min", side: true },
      { m: "airfryer", heat: "200°C", t: "8–10", u: "min" } ] },
    { name: "Fillet strips (kabab barg)", size: "", core: "58–60°C pink", methods: [
      { m: "grill", heat: "high", t: "2–3", u: "min", side: true },
      { m: "pan", heat: "high", t: "2–3", u: "min", side: true } ] },
    { name: "Leg of lamb, bone-in", size: "about 2 kg", core: "58–60°C pink · 65°C medium", methods: [
      { m: "oven", heat: "175°C", t: "1½–1¾", u: "h", tip: "Rest 15 minutes before carving." } ] },
    { name: "Shoulder, slow-cooked", size: "1.5–2 kg", core: "Falls apart", methods: [
      { m: "oven", heat: "160°C", t: "3–3½", u: "h", tip: "Cover tightly with a lid or foil." },
      { m: "slowcooker", heat: "low", t: "8", u: "h" } ] } ] },

  { id: "turkey", name: "Turkey", photo: "shirazi-salad-with-saffron-chicken", cuts: [
    { name: "Whole breast fillet", size: "0.8–1 kg", core: "72°C", methods: [
      { m: "oven", heat: "175°C", t: "50–70", u: "min", tip: "Brown it in a pan first. Rest 10 minutes." } ] },
    { name: "Steaks & slices", size: "1–2 cm thick", core: "72°C", methods: [
      { m: "pan", heat: "medium-high", t: "3–4", u: "min", side: true },
      { m: "grill", heat: "medium-high", t: "3–4", u: "min", side: true } ] } ] },

  { id: "eggs", name: "Eggs", photo: "soft-boiled-eggs-asparagus-soldiers", cuts: [
    { name: "Soft-boiled, runny yolk", size: "large eggs from the fridge", core: "", methods: [
      { m: "boil", heat: "high", t: "6–6½", u: "min", tip: "Lower into boiling water, then cool in cold water for 1 minute." } ] },
    { name: "Medium, jammy yolk", size: "large eggs from the fridge", core: "", methods: [
      { m: "boil", heat: "high", t: "7–8", u: "min" } ] },
    { name: "Hard-boiled", size: "large eggs from the fridge", core: "", methods: [
      { m: "boil", heat: "high", t: "9–10", u: "min", tip: "Cool in cold water so they are easy to peel." } ] },
    { name: "Fried", size: "", core: "", methods: [
      { m: "pan", heat: "medium", t: "2–3", u: "min" } ] },
    { name: "Poached", size: "", core: "", methods: [
      { m: "poach", heat: "low", t: "3", u: "min", tip: "Use very fresh eggs and gently simmering water." } ] },
    { name: "Baked (egg muffins)", size: "", core: "", methods: [
      { m: "oven", heat: "180°C", t: "18–22", u: "min" } ] } ] },

  { id: "veg-protein", name: "Tofu & halloumi", photo: "crispy-baked-tofu-with-wok-rice", cuts: [
    { name: "Firm tofu, cubes", size: "2 cm cubes", core: "", methods: [
      { m: "oven", heat: "210°C", t: "25", u: "min", tip: "Press the tofu for 15 minutes first for a crispier result." },
      { m: "airfryer", heat: "200°C", t: "12–15", u: "min" },
      { m: "pan", heat: "medium-high", t: "8–10", u: "min", tip: "Turn so every side gets golden." } ] },
    { name: "Halloumi slices", size: "1 cm thick", core: "", methods: [
      { m: "pan", heat: "medium-high", t: "2", u: "min", side: true, tip: "No oil needed." },
      { m: "grill", heat: "high", t: "1–2", u: "min", side: true },
      { m: "airfryer", heat: "200°C", t: "6–8", u: "min" } ] } ] },

  { id: "veg", name: "Vegetables", photo: "chicken-thigh-veggie-traybake", cuts: [
    { name: "Broccoli & cauliflower florets", size: "", core: "", methods: [
      { m: "oven", heat: "220°C", t: "15–20", u: "min" },
      { m: "steam", heat: "medium", t: "4–5", u: "min" },
      { m: "airfryer", heat: "200°C", t: "10–12", u: "min" } ] },
    { name: "Zucchini, eggplant & peppers", size: "", core: "", methods: [
      { m: "oven", heat: "220°C", t: "20–30", u: "min" },
      { m: "grill", heat: "medium-high", t: "3–4", u: "min", side: true } ] },
    { name: "Cauliflower rice", size: "", core: "", methods: [
      { m: "pan", heat: "medium-high", t: "5–6", u: "min", tip: "Don't cover the pan, so it stays fluffy." } ] },
    { name: "Zucchini noodles", size: "", core: "", methods: [
      { m: "pan", heat: "medium-high", t: "1–2", u: "min", tip: "Don't overcook them, or they turn watery." } ] },
    { name: "Green beans & asparagus", size: "", core: "", methods: [
      { m: "steam", heat: "medium", t: "3–5", u: "min" },
      { m: "pan", heat: "medium-high", t: "4–6", u: "min" },
      { m: "oven", heat: "220°C", t: "10–12", u: "min" } ] },
    { name: "Sweet potato cubes (for the kids)", size: "2 cm cubes", core: "", methods: [
      { m: "oven", heat: "220°C", t: "25–30", u: "min" },
      { m: "airfryer", heat: "200°C", t: "15–18", u: "min" } ] } ] }
];
