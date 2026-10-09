// =====================================================================
// INGREDIENT SWAPS — shown as a "Swap" button next to matching ingredients.
// The first rule that matches an ingredient wins, so specific rules come
// before general ones. `not` skips the rule when that word is present.
// A recipe can also set its own:  swaps: { 0: ["…", "…"] }  (by ingredient number, starting at 0)
// =====================================================================

const SWAPS = [
  // ---- stocks, sauces, seasonings (before meats, so "chicken stock" isn't a chicken swap)
  { m: /stock|bouillon/, alts: ["Bouillon cube + water (check it's pork-free)", "Water + a little extra salt and spices"] },
  { m: /oyster sauce/, alts: ["Mushroom stir-fry sauce", "1 extra tbsp soy + pinch of sweetener"] },
  { m: /fish sauce/, alts: ["Soy sauce", "Extra salt + squeeze of lime"] },
  { m: /gochujang|doubanjiang|chili bean paste/, alts: ["Sriracha + 1 tsp miso", "Chili flakes + soy sauce", "Less of it for a milder dish"] },
  { m: /curry paste/, alts: ["2 tsp curry powder + garlic + ginger"] },
  { m: /soy sauce|tamari|\bsoy\b/, not: /soy milk/, alts: ["Tamari (gluten-free)", "Coconut aminos (less salty)"] },
  { m: /pomegranate molasses/, alts: ["Lemon juice + pinch of sweetener", "Tamarind paste"] },
  { m: /tamarind/, alts: ["Lemon juice", "Pomegranate molasses"] },
  { m: /dried lime/, alts: ["Lemon juice + zest"] },
  { m: /saffron/, alts: ["Pinch of turmeric (for colour)"] },
  { m: /sumac/, alts: ["Lemon zest + pinch of salt"] },
  { m: /barberr/, alts: ["Unsweetened dried cranberries", "Leave out"] },
  { m: /fenugreek/, alts: ["Leave out and add more parsley"] },
  { m: /za'atar/, alts: ["Dried thyme + sesame seeds + sumac"] },
  { m: /tahini/, alts: ["Peanut butter", "Greek yogurt + lemon"] },
  { m: /peanut butter/, alts: ["Almond butter", "Tahini", "Sunflower seed butter (nut-free)"] },
  { m: /pesto/, alts: ["Red pesto", "Olive oil blended with basil and garlic"] },
  { m: /tomato paste/, alts: ["Ajvar", "Extra passata"] },
  { m: /passata|chopped tomatoes|crushed tomatoes/, alts: ["Passata", "Crushed tomatoes", "Fresh tomatoes, grated"] },
  { m: /sweetener|honey/, alts: ["Stevia", "Erythritol", "Leave out"] },
  { m: /kaviar/, alts: ["Shrimp", "Smoked salmon", "Lumpfish roe"] },
  { m: /miso/, alts: ["Soy sauce + a little tahini"] },
  { m: /lemongrass/, alts: ["Lemongrass paste", "Lemon zest + ginger"] },

  // ---- meat and fish
  { m: /chicken sausage|sausages/, alts: ["Beef sausages", "Turkey sausages", "Always check the casing is not pork"] },
  { m: /chicken mince|turkey mince/, alts: ["Lean beef mince", "Lamb mince", "Chicken or turkey mince"] },
  { m: /beef mince|lamb mince|beef or lamb mince|lamb or beef mince|mince/, alts: ["Turkey mince (leaner)", "Chicken mince", "Lamb mince", "Half mince + half finely chopped mushrooms"] },
  { m: /drumstick/, alts: ["Chicken thighs", "Chicken legs"] },
  { m: /chicken thigh/, alts: ["Chicken breast (cook a few minutes less)", "Turkey breast", "Firm tofu (vegetarian)"] },
  { m: /chicken/, alts: ["Chicken thighs (juicier)", "Turkey breast", "Firm tofu (vegetarian)"] },
  { m: /turkey/, alts: ["Chicken breast", "Chicken slices"] },
  { m: /lamb/, alts: ["Beef", "Chicken thighs"] },
  { m: /steak|sirloin|beef/, alts: ["Lamb", "Chicken thighs", "Venison or moose (very lean)"] },
  { m: /smoked salmon|gravlax/, alts: ["Gravlax", "Hot-smoked salmon", "Smoked trout"] },
  { m: /salmon/, alts: ["Trout", "Arctic char (röding)", "Mackerel"] },
  { m: /mackerel/, alts: ["Smoked salmon", "Herring", "Sardines"] },
  { m: /\bcod\b|white fish|pollock|sea bass/, alts: ["Pollock (sej)", "Haddock (kolja)", "Hake"] },
  { m: /shrimp|prawn/, alts: ["Chicken strips", "White fish chunks", "Scallops"] },
  { m: /tuna/, alts: ["Canned salmon", "Mackerel in tomato", "Shredded chicken"] },
  { m: /tofu/, alts: ["Chicken", "Paneer", "Tempeh"] },

  // ---- dairy and eggs
  { m: /coconut milk/, alts: ["Light cooking cream", "Greek yogurt (stir in at the end, don't boil)"] },
  { m: /crème fraiche|cooking cream|light cream|\bcream\b/, not: /cream cheese|ice cream/, alts: ["Greek yogurt (add at the end, don't boil)", "Light coconut milk", "Oat cooking cream (a bit more carbs)"] },
  { m: /cream cheese/, alts: ["Light quark (kvarg)", "Ricotta"] },
  { m: /labneh/, alts: ["Thick Greek yogurt with a pinch of salt", "Skyr"] },
  { m: /greek yogurt|yogurt|tzatziki/, not: /coconut/, alts: ["Skyr", "Kvarg (quark)", "Lactose-free yogurt", "Coconut yogurt (dairy-free)"] },
  { m: /skyr|kvarg|quark/, alts: ["Greek yogurt", "Cottage cheese, blended"] },
  { m: /cottage cheese|keso/, alts: ["Kvarg (quark)", "Ricotta", "Skyr"] },
  { m: /ricotta/, alts: ["Cottage cheese, blended", "Kvarg"] },
  { m: /feta/, alts: ["Goat cheese", "Halloumi", "Light feta"] },
  { m: /halloumi/, alts: ["Paneer", "Firm tofu", "Grilling cheese"] },
  { m: /parmesan/, alts: ["Pecorino", "Grana Padano", "Nutritional yeast (dairy-free)"] },
  { m: /mozzarella/, alts: ["Light grated cheese", "Burrata (as a treat)"] },
  { m: /almond milk|soy milk/, alts: ["Unsweetened oat milk (a bit more carbs)", "Regular or lactose-free milk"] },
  { m: /\bmilk\b/, alts: ["Unsweetened almond milk", "Soy milk", "Lactose-free milk"] },
  { m: /butter/, not: /peanut|almond/, alts: ["Olive oil", "Ghee"] },

  // ---- flours and carbs
  { m: /almond flour/, alts: ["Coconut flour (use ¼ of the amount)", "Ground flaxseed", "Ground sunflower seeds (nut-free)"] },
  { m: /coconut flour/, alts: ["Almond flour (use 3–4× the amount)"] },
  { m: /protein powder/, alts: ["Leave out and add 50 g more kvarg"] },
  { m: /cornflour/, alts: ["Potato starch", "Leave out (less crispy / thinner sauce)"] },
  { m: /zucchini noodles|spiralized|zoodles/, alts: ["Shirataki noodles", "Finely shredded cabbage", "Spaghetti squash"] },
  { m: /cauliflower rice|riced cauliflower|cauli rice/, alts: ["Broccoli rice", "Finely shredded cabbage", "Shirataki rice"] },
  { m: /matvete|wheat berr/, alts: ["Quinoa", "Bulgur", "More salad (lower carb)"] },
  { m: /pasta/, alts: ["Lentil or chickpea pasta (more protein)", "Wholegrain pasta"] },
  { m: /noodles/, alts: ["Shirataki noodles", "Rice noodles", "Egg noodles"] },
  { m: /basmati|jasmine rice|\brice\b/, alts: ["Cauliflower rice (for adults)", "Brown rice", "Quinoa"] },
  { m: /sweet potato/, alts: ["Pumpkin or butternut squash (fewer carbs)", "Celeriac"] },
  { m: /kidney beans|black beans|lima|butter beans|chickpeas|split peas/, alts: ["Extra vegetables (lower carb)", "Edamame", "More meat"] },
  { m: /\bpeas\b/, alts: ["Edamame", "Green beans", "Sugar snaps"] },

  // ---- vegetables and fruit
  { m: /eggplant/, alts: ["Zucchini", "Portobello mushrooms"] },
  { m: /zucchini/, alts: ["Eggplant", "Yellow squash", "Mushrooms"] },
  { m: /cauliflower/, alts: ["Broccoli", "Celeriac", "Swede"] },
  { m: /spinach/, alts: ["Kale", "Chard", "Frozen spinach"] },
  { m: /broccoli|broccolini/, alts: ["Cauliflower", "Green beans", "Broccolini"] },
  { m: /green beans/, alts: ["Broccoli", "Asparagus", "Sugar snaps"] },
  { m: /asparagus/, alts: ["Green beans", "Broccolini"] },
  { m: /bok choy/, alts: ["Spinach", "Broccoli", "Pointed cabbage"] },
  { m: /cabbage|coleslaw/, alts: ["White or pointed cabbage", "Kale", "Shredded Brussels sprouts"] },
  { m: /mushroom/, alts: ["Zucchini", "Eggplant"] },
  { m: /bell pepper|peppers/, alts: ["Zucchini", "Mushrooms", "Eggplant"] },
  { m: /rocket|lettuce|salad leaves|romaine|mixed leaves|leaves/, alts: ["Any salad leaves", "Baby spinach", "Shredded cabbage"] },
  { m: /avocado/, alts: ["Guacamole", "Olive oil drizzle + extra veg"] },
  { m: /berr/, alts: ["Strawberries", "Frozen mixed berries", "Half a kiwi"] },
  { m: /walnut/, alts: ["Almonds", "Pecans", "Pumpkin seeds (nut-free)"] },
  { m: /pine nuts/, alts: ["Flaked almonds", "Pumpkin seeds"] },
  { m: /peanuts|almonds/, alts: ["Cashews", "Pumpkin seeds (nut-free)"] },
  { m: /coriander/, alts: ["Parsley (if coriander tastes soapy)", "Thai basil"] },
  { m: /\bdill\b/, alts: ["Parsley", "Chives"] },
  { m: /\bmint\b/, alts: ["Dried mint", "Basil"] },
  { m: /lemon/, alts: ["Lime"] },
  { m: /\blime/, not: /dried lime/, alts: ["Lemon"] },

  // ---- fats
  { m: /coconut oil|olive oil|neutral oil|\boil\b/, not: /sesame oil/, alts: ["Rapeseed oil (great for frying)", "Olive oil", "Avocado oil"] }
];

window.getSwaps = function (recipe, ingredient, index) {
  if (recipe.swaps && recipe.swaps[index]) return recipe.swaps[index];
  const t = ingredient.toLowerCase();
  for (const s of SWAPS) {
    if (s.m.test(t) && !(s.not && s.not.test(t))) return s.alts;
  }
  return null;
};
