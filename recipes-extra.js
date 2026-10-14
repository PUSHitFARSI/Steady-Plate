// =====================================================================
// EXTRA RECIPES — more Persian, Mediterranean and Asian, plus boiled eggs.
// Same fields as recipes.js.
// =====================================================================

RECIPES.push(

/* ------------------------------- PERSIAN ------------------------------- */
{
  name: "Nimroo with Sumac Tomatoes", cuisine: "Persian",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 290, protein: 18, carbs: 7, tags: ["Vegetarian"],
  ingredients: ["3 eggs", "2 tomatoes, halved", "1 tsp butter or oil", "½ tsp sumac", "Fresh mint and basil", "Radishes", "Salt and black pepper, to taste"],
  steps: ["Fry tomato halves cut-side down 3 minutes.", "Crack eggs into the pan; cook until whites set, yolks runny.", "Sprinkle sumac and salt; serve with herbs and radishes."],
  kids: "Serve with warm lavash or barbari bread."
},
{
  name: "Kuku Kadoo (Zucchini Kuku)", cuisine: "Persian",
  meal: "breakfast", speed: "normal", time: 35, servings: 4,
  kcal: 240, protein: 15, carbs: 7, tags: ["Vegetarian", "Meal prep"],
  ingredients: ["3 zucchini, grated", "1 onion, grated", "7 eggs", "2 tbsp dried mint", "1 tsp turmeric", "30 g walnuts", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Squeeze water from zucchini and onion; fry 8 minutes until dry.", "Cool slightly, mix with eggs, mint, turmeric, walnuts and salt.", "Cook in an oiled pan, covered, on low 15 minutes; flip or grill to finish."],
  kids: "Wrap slices in lavash with yogurt."
},
{
  name: "Kuku Bademjan (Eggplant Kuku)", cuisine: "Persian",
  meal: "breakfast", speed: "normal", time: 45, servings: 4,
  kcal: 250, protein: 14, carbs: 9, tags: ["Vegetarian", "Weekend"],
  ingredients: ["2 eggplants", "1 onion, 3 garlic cloves", "6 eggs", "1 tsp turmeric", "Pinch saffron", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Roast eggplants whole at 220°C for 25 minutes; peel and mash.", "Fry onion and garlic with turmeric.", "Mix with eggs, saffron and salt; cook covered on low 15 minutes."],
  kids: "Serve with bread and yogurt."
},
{
  name: "Fesenjan (Walnut Pomegranate Chicken)", cuisine: "Persian",
  meal: "main", speed: "normal", time: 90, servings: 4,
  kcal: 480, protein: 40, carbs: 14, tags: ["Weekend", "Celebration"],
  ingredients: ["800 g chicken thighs", "150 g walnuts, finely ground", "2 tbsp pomegranate molasses", "1 onion", "½ tsp turmeric, ½ tsp cinnamon", "500 ml water or stock", "Sweetener to taste (optional)", "Pomegranate seeds", "Salt and black pepper, to taste"],
  steps: ["Toast ground walnuts in a dry pot 5 minutes; add water and simmer 30 minutes, stirring.", "Brown chicken with onion and spices.", "Add chicken and molasses to the walnut sauce; simmer 40 minutes until thick and dark.", "Adjust sweet-sour; top with pomegranate seeds."],
  kids: "Serve with saffron rice."
},
{
  name: "Kabab Torsh (Pomegranate Walnut Beef)", cuisine: "Persian",
  meal: "main", speed: "normal", time: 30, servings: 4,
  kcal: 400, protein: 38, carbs: 8, tags: ["Marinate ahead"],
  ingredients: ["700 g beef sirloin, in cubes", "Marinade: 2 tbsp pomegranate molasses, 40 g walnuts ground, 1 garlic clove, 1 tbsp dried mint, handful parsley chopped, 1 tbsp olive oil", "Tomatoes for grilling", "Salt and black pepper, to taste"],
  steps: ["Mix the marinade and coat the beef; rest at least 2 hours.", "Thread onto skewers with tomatoes.", "Grill or bake at 240°C for 8–10 minutes."],
  kids: "Serve with rice and butter."
},
{
  name: "Persian Kotlet (Lighter)", cuisine: "Persian",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 360, protein: 30, carbs: 9, tags: ["Family favourite", "Lunch box"],
  ingredients: ["500 g beef mince", "300 g cauliflower, steamed and mashed dry", "1 onion, grated and squeezed", "1 egg", "1 tsp turmeric", "1 tbsp oil", "Pickles, tomatoes, herbs", "Salt and black pepper, to taste"],
  steps: ["Mix mince, cauliflower, onion, egg, turmeric and salt.", "Shape into flat ovals.", "Fry 4 minutes per side until browned and cooked through.", "Serve with pickles, tomatoes and herbs."],
  kids: "Use grated potato instead of cauliflower for theirs, serve in lavash or bread."
},
{
  name: "Dolmeh Felfel (Stuffed Peppers)", cuisine: "Persian",
  meal: "main", speed: "normal", time: 60, servings: 4,
  kcal: 340, protein: 30, carbs: 14, tags: [],
  ingredients: ["4 bell peppers", "500 g beef or lamb mince", "1 onion", "Herbs: parsley, dill, tarragon, mint", "1 tsp turmeric, ½ tsp cinnamon", "2 tbsp tomato paste", "Juice of 1 lemon", "Kids: 100 g cooked rice", "Salt and black pepper, to taste"],
  steps: ["Brown mince with onion and turmeric; add herbs and cinnamon.", "Kids' peppers: stir rice into a portion of the filling.", "Fill the peppers and stand them in a pot.", "Add 300 ml water with tomato paste and lemon; cover and simmer 40 minutes."],
  kids: "Their peppers have rice in the filling; serve with yogurt."
},
{
  name: "Mahi Shekam-por (Herb-Stuffed Fish)", cuisine: "Persian",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 330, protein: 36, carbs: 6, tags: ["Fish"],
  ingredients: ["2 whole fish (sea bass or trout) or 4 fillets", "1 bunch each coriander, parsley, fenugreek or dill", "4 garlic cloves", "1 tbsp tamarind paste or juice of 1 lemon", "1 tsp turmeric", "½ tsp chili", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Heat oven to 200°C.", "Fry garlic and herbs in oil 5 minutes; add tamarind, turmeric and chili.", "Stuff the fish (or spread between two fillets).", "Bake 20–25 minutes."],
  kids: "Serve with rice."
},
{
  name: "Lighter Gheimeh with Eggplant", cuisine: "Persian",
  meal: "main", speed: "normal", time: 100, servings: 5,
  kcal: 380, protein: 38, carbs: 15, tags: ["Freezes well"],
  ingredients: ["700 g beef or lamb, small cubes", "60 g yellow split peas (less than usual)", "2 eggplants, in thick slices", "1 onion", "2 tbsp tomato paste", "3 dried limes", "1 tsp turmeric, ½ tsp cinnamon", "Pinch saffron", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Brown meat with onion and turmeric; add tomato paste.", "Add split peas, dried limes and 800 ml water; simmer 70 minutes.", "Roast oiled eggplant at 220°C for 20 minutes.", "Add saffron, cinnamon and eggplant on top for the last 10 minutes."],
  kids: "Serve with rice and a few oven fries on top, like the classic."
},
{
  name: "Lubia-Style Beef & Green Beans", cuisine: "Persian",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 340, protein: 32, carbs: 10, tags: ["Family favourite"],
  ingredients: ["500 g beef mince or small cubes", "400 g green beans, in 2 cm pieces", "1 onion", "2 tbsp tomato paste", "1 tsp turmeric, 1 tsp cinnamon, ½ tsp cumin", "Pinch saffron", "1 tbsp oil", "Kids: 200 g basmati rice", "Salt and black pepper, to taste"],
  steps: ["Brown beef with onion and turmeric.", "Add beans, tomato paste and spices with 150 ml water; simmer 15 minutes.", "Adults: serve as is with yogurt.", "Kids: layer it with rice (lubia polo)."],
  kids: "Lubia polo: mix their share with cooked rice and a little butter."
},
{
  name: "Morgh-e Torsh (Sour Herb Chicken)", cuisine: "Persian",
  meal: "main", speed: "normal", time: 60, servings: 4,
  kcal: 400, protein: 40, carbs: 9, tags: ["Northern Iran"],
  ingredients: ["800 g chicken thighs", "1 large bunch each parsley and coriander, 1 bunch mint, chopped", "4 garlic cloves", "30 g walnuts, ground", "2 tbsp pomegranate molasses or juice of 2 lemons", "1 tsp turmeric", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Fry herbs and garlic in oil 10 minutes.", "Brown chicken with turmeric.", "Add herbs, walnuts, molasses and 300 ml water; simmer 40 minutes."],
  kids: "Serve with rice."
},
{
  name: "Kabab Barg (Saffron Lamb Fillet)", cuisine: "Persian",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 380, protein: 38, carbs: 5, tags: ["Marinate ahead"],
  ingredients: ["500 g lamb or beef fillet, in strips", "1 onion, grated (juice only)", "Pinch saffron in 1 tbsp hot water", "1 tbsp olive oil", "Tomatoes, sumac, raw onion", "Salt and black pepper, to taste"],
  steps: ["Marinate meat in onion juice, saffron and oil (overnight is best).", "Thread flat onto skewers or lay on a tray.", "Grill 2–3 minutes per side with tomatoes.", "Sprinkle sumac; serve with raw onion and herbs."],
  kids: "Serve with rice and butter."
},

/* ---------------------------- MEDITERRANEAN ---------------------------- */
{
  name: "Turkish Menemen", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 15, servings: 2,
  kcal: 280, protein: 18, carbs: 10, tags: ["Vegetarian"],
  ingredients: ["5 eggs", "2 green peppers (or 1 bell pepper)", "3 tomatoes, chopped", "½ tsp chili flakes", "1 tbsp olive oil", "30 g feta (optional)", "Salt and black pepper, to taste"],
  steps: ["Soften peppers in oil 4 minutes.", "Add tomatoes and cook down 5 minutes.", "Stir in eggs gently until just set; add chili and feta."],
  kids: "Dip with crusty bread."
},
{
  name: "Labneh, Eggs & Za'atar Plate", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 360, protein: 24, carbs: 7, tags: ["Vegetarian"],
  ingredients: ["150 g labneh or thick Greek yogurt", "2 eggs", "1 tsp za'atar", "1 tsp olive oil", "Cucumber, tomato, olives, mint", "Salt and black pepper, to taste"],
  steps: ["Boil eggs 7 minutes; peel and halve.", "Spread labneh on a plate, drizzle oil and za'atar.", "Add eggs, vegetables, olives and mint."],
  kids: "Serve with warm pita."
},
{
  name: "Shish Tawook", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 340, protein: 44, carbs: 6, tags: ["Family favourite", "Marinate ahead"],
  ingredients: ["800 g chicken breast, cubed", "150 g Greek yogurt", "1 tbsp tomato paste", "3 garlic cloves", "1 lemon", "1 tsp paprika, ½ tsp allspice", "Garlic yogurt sauce, pickles, salad", "Salt and black pepper, to taste"],
  steps: ["Mix yogurt, tomato paste, garlic, lemon and spices; marinate chicken 1 hour+.", "Thread on skewers.", "Grill or bake at 230°C for 15 minutes.", "Serve with garlic sauce, pickles and salad."],
  kids: "Wrap in pita with fries or rice."
},
{
  name: "Gambas al Ajillo (Garlic Shrimp)", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 10, servings: 2,
  kcal: 290, protein: 36, carbs: 4, tags: ["Seafood"],
  ingredients: ["400 g shrimp", "5 garlic cloves, sliced", "1 dried chili", "1 tbsp olive oil", "Smoked paprika, parsley, lemon", "Green salad", "Salt and black pepper, to taste"],
  steps: ["Gently heat oil with garlic and chili until golden.", "Add shrimp and paprika; cook 2–3 minutes.", "Finish with parsley and lemon; serve with salad."],
  kids: "Serve with bread to dip in the garlic oil."
},
{
  name: "Basque Chicken (Pollo a la Vasca)", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 50, servings: 4,
  kcal: 380, protein: 38, carbs: 12, tags: ["One pot"],
  ingredients: ["8 chicken thighs", "3 bell peppers (red, green, yellow)", "1 onion, 3 garlic cloves", "1 can chopped tomatoes", "2 tsp smoked paprika", "Thyme, bay leaf", "1 tbsp olive oil", "Salt and black pepper, to taste"],
  steps: ["Brown chicken; set aside.", "Soften peppers, onion and garlic 10 minutes.", "Add tomatoes, paprika and herbs; return chicken.", "Cover and simmer 30 minutes."],
  kids: "Serve with rice or potatoes."
},
{
  name: "Psari Plaki (Greek Baked Fish)", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 300, protein: 36, carbs: 10, tags: ["Fish"],
  ingredients: ["4 white fish fillets", "1 onion, 2 garlic cloves", "1 can chopped tomatoes", "1 tsp oregano", "1 lemon", "Parsley", "1 tbsp olive oil", "Salt and black pepper, to taste"],
  steps: ["Heat oven to 200°C.", "Soften onion and garlic; add tomatoes and oregano for 10 minutes.", "Place fish in a dish, pour over sauce, top with lemon slices.", "Bake 20 minutes; add parsley."],
  kids: "Serve with bread or orzo."
},
{
  name: "Kafta bil Tahini Traybake", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 45, servings: 4,
  kcal: 420, protein: 32, carbs: 9, tags: ["Family favourite"],
  ingredients: ["500 g beef or lamb mince", "1 onion, grated; parsley", "1 tsp seven spice or allspice", "2 tomatoes, sliced", "Sauce: 3 tbsp tahini, 150 g Greek yogurt, lemon, garlic, water", "Pine nuts", "Salt and black pepper, to taste"],
  steps: ["Mix mince, onion, parsley, spice and salt; press into a dish.", "Bake at 200°C for 15 minutes.", "Top with tomato slices and the tahini sauce.", "Bake 15 minutes more; scatter toasted pine nuts."],
  kids: "Add potato slices under their portion, or serve with pita."
},
{
  name: "Chermoula Fish", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 20, servings: 2,
  kcal: 290, protein: 36, carbs: 6, tags: ["Fish"],
  ingredients: ["2 white fish or salmon fillets", "Chermoula: coriander, parsley, 2 garlic cloves, 1 tsp cumin, 1 tsp paprika, lemon, 1 tbsp olive oil", "Zucchini and cherry tomatoes", "Salt and black pepper, to taste"],
  steps: ["Blend or chop the chermoula ingredients.", "Spread over fish on a tray with vegetables.", "Bake at 200°C for 12–15 minutes."],
  kids: "Serve with couscous."
},
{
  name: "Patlıcan Kebab (Lamb & Eggplant)", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 50, servings: 4,
  kcal: 400, protein: 30, carbs: 12, tags: ["Turkish"],
  ingredients: ["500 g lamb or beef mince", "2 eggplants, in thick rounds", "2 tomatoes, 2 green peppers", "1 onion, grated", "1 tsp cumin, 1 tsp paprika", "1 tbsp tomato paste + 200 ml water", "Salt and black pepper, to taste"],
  steps: ["Mix mince with onion and spices; shape small patties.", "Alternate patties, eggplant and tomato slices upright in a dish; add peppers.", "Pour over tomato paste mixed with water.", "Bake at 200°C for 35–40 minutes."],
  kids: "Serve with bulgur or bread."
},
{
  name: "Lamb Kleftiko (Lighter)", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 180, servings: 5,
  kcal: 450, protein: 40, carbs: 10, tags: ["Weekend", "Slow"],
  ingredients: ["1 kg lamb shoulder, in chunks", "1 lemon", "6 garlic cloves", "2 tsp oregano", "2 bell peppers, 1 onion", "2 tomatoes", "100 g feta", "1 tbsp olive oil", "Salt and black pepper, to taste"],
  steps: ["Marinate lamb with lemon, garlic, oregano and oil.", "Put lamb and vegetables on a large sheet of baking paper; top with feta. Seal tightly.", "Bake at 160°C for 2½–3 hours."],
  kids: "Add potato wedges to their part of the parcel."
},

/* -------------------------------- ASIAN -------------------------------- */
{
  name: "Chinese Tomato & Egg Stir-Fry", cuisine: "Asian",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 290, protein: 19, carbs: 9, tags: ["Vegetarian"],
  ingredients: ["3 eggs", "2 tomatoes, in wedges", "1 spring onion", "1 tsp soy sauce", "1 tsp oil", "Salt and black pepper, to taste"],
  steps: ["Scramble eggs softly; set aside.", "Stir-fry tomatoes 2–3 minutes until juicy.", "Return eggs, add soy and spring onion."],
  kids: "Serve over rice."
},
{
  name: "Korean Steamed Egg (Gyeran-jjim)", cuisine: "Asian",
  meal: "breakfast", speed: "quick", time: 15, servings: 1,
  kcal: 230, protein: 19, carbs: 3, tags: ["Vegetarian", "Gentle"],
  ingredients: ["3 eggs", "150 ml stock or water", "1 spring onion", "½ tsp sesame seeds", "Pinch salt", "Black pepper, to taste"],
  steps: ["Whisk eggs with stock and salt; strain into a small pot or bowl.", "Cover and cook on very low heat (or steam) 10–12 minutes until puffed and set.", "Top with spring onion and sesame."],
  kids: "Serve with rice and seaweed."
},
{
  name: "Japanese Salmon & Miso Breakfast", cuisine: "Asian",
  meal: "breakfast", speed: "quick", time: 15, servings: 1,
  kcal: 360, protein: 32, carbs: 6, tags: ["Fish", "Omega-3"],
  ingredients: ["1 small salmon fillet (120 g)", "1 tbsp miso paste", "300 ml hot water", "50 g silken tofu, cubed", "Spring onion, wakame (optional)", "Cucumber pickles", "Salt and black pepper, to taste"],
  steps: ["Salt the salmon and grill or pan-fry 4 minutes per side.", "Stir miso into hot water (don't boil); add tofu and spring onion.", "Serve with cucumber pickles."],
  kids: "Add a small bowl of rice."
},
{
  name: "Kung Pao Chicken", cuisine: "Asian",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 360, protein: 40, carbs: 10, tags: ["Family favourite"],
  ingredients: ["500 g chicken thigh, cubed", "Sauce: 2 tbsp soy, 1 tbsp rice vinegar, 1 tsp sesame oil, 1 tsp cornflour, pinch sweetener", "4 dried chilies (optional)", "2 garlic cloves, 1 tbsp ginger", "1 bell pepper, 1 zucchini", "30 g peanuts", "Spring onions", "Salt and black pepper, to taste"],
  steps: ["Stir-fry chicken in hot oil 5 minutes.", "Add chilies, garlic, ginger and vegetables for 3 minutes.", "Pour in the sauce; toss until glossy.", "Add peanuts and spring onions."],
  kids: "Serve with rice; leave out the chilies."
},
{
  name: "Palak Chicken (Spinach Curry)", cuisine: "Asian",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 360, protein: 42, carbs: 10, tags: ["Indian"],
  ingredients: ["700 g chicken breast or thigh", "400 g spinach (fresh or frozen)", "1 onion, 3 garlic cloves, 1 tbsp ginger", "1 tomato", "2 tsp garam masala, 1 tsp cumin, ½ tsp turmeric", "100 g Greek yogurt", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Wilt and blend the spinach.", "Fry onion, garlic, ginger and spices; add tomato.", "Add chicken and brown; then spinach. Simmer 15 minutes.", "Off the heat, stir in yogurt."],
  kids: "Serve with rice or naan."
},
{
  name: "Thai Basil Chicken (Pad Krapow)", cuisine: "Asian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 380, protein: 40, carbs: 8, tags: ["Thai"],
  ingredients: ["400 g chicken mince", "3 garlic cloves, 1–2 chilies", "1 tbsp soy, 1 tbsp oyster sauce, 1 tsp fish sauce", "Big handful Thai basil", "Green beans, sliced", "2 fried eggs", "Salt and black pepper, to taste"],
  steps: ["Fry garlic and chili 30 seconds.", "Add chicken and beans; cook 5 minutes.", "Add sauces and basil.", "Serve topped with a crispy fried egg."],
  kids: "Serve over jasmine rice; skip the chili."
},
{
  name: "Korean Dakgalbi (Spicy Chicken & Cabbage)", cuisine: "Asian",
  meal: "main", speed: "normal", time: 30, servings: 4,
  kcal: 380, protein: 40, carbs: 14, tags: ["One pan"],
  ingredients: ["700 g chicken thigh, in pieces", "Sauce: 2 tbsp gochujang, 2 tbsp soy, 2 garlic cloves, 1 tbsp ginger, 1 tsp sesame oil", "½ white cabbage", "1 onion, 1 sweet pepper", "Perilla or sesame leaves (optional)", "60 g grated mozzarella (optional)", "Salt and black pepper, to taste"],
  steps: ["Marinate chicken in the sauce 10 minutes.", "Cook in a large pan 8 minutes.", "Add cabbage, onion and pepper; cook 10 minutes.", "Top with cheese and cover to melt (optional)."],
  kids: "Use less gochujang for their part and serve with rice."
},
{
  name: "Tandoori Chicken Traybake", cuisine: "Asian",
  meal: "main", speed: "normal", time: 45, servings: 4,
  kcal: 360, protein: 44, carbs: 9, tags: ["Indian", "One tray"],
  ingredients: ["8 chicken drumsticks or thighs (skinless)", "200 g Greek yogurt", "2 tbsp tandoori spice", "2 garlic cloves, 1 tbsp ginger", "1 cauliflower, 1 red onion", "Lemon, coriander, cucumber raita", "Salt and black pepper, to taste"],
  steps: ["Marinate chicken in yogurt, spice, garlic and ginger (30 minutes+).", "Spread on a tray with cauliflower florets and onion.", "Roast at 220°C for 35 minutes.", "Serve with lemon, coriander and raita."],
  kids: "Serve with naan or rice."
},
{
  name: "Beef Mapo Tofu", cuisine: "Asian",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 380, protein: 34, carbs: 8, tags: ["Sichuan"],
  ingredients: ["400 g firm or silken tofu, cubed", "250 g beef mince", "1–2 tbsp doubanjiang (chili bean paste)", "2 garlic cloves, 1 tbsp ginger", "250 ml stock", "1 tsp cornflour", "Spring onion, Sichuan pepper (optional)", "Salt and black pepper, to taste"],
  steps: ["Brown beef; add bean paste, garlic and ginger 1 minute.", "Add stock and tofu; simmer 5 minutes.", "Thicken with cornflour mixed in water.", "Top with spring onion and pepper."],
  kids: "Make a milder portion and serve with rice."
},
{
  name: "Vietnamese Lemongrass Chicken", cuisine: "Asian",
  meal: "main", speed: "normal", time: 30, servings: 4,
  kcal: 340, protein: 40, carbs: 7, tags: ["Marinate ahead"],
  ingredients: ["800 g chicken thighs", "2 lemongrass stalks, finely chopped", "3 garlic cloves", "2 tbsp fish sauce, 1 tbsp soy", "Pinch sweetener", "Lettuce, cucumber, mint, coriander, lime", "Salt and black pepper, to taste"],
  steps: ["Mix lemongrass, garlic, sauces and sweetener; marinate chicken 30 minutes.", "Grill or pan-fry 6 minutes per side.", "Slice and serve with herbs, lettuce and lime."],
  kids: "Serve with rice or rice noodles."
},
{
  name: "Miso-Glazed Cod", cuisine: "Asian",
  meal: "main", speed: "quick", time: 20, servings: 2,
  kcal: 290, protein: 36, carbs: 8, tags: ["Fish"],
  ingredients: ["2 cod fillets", "1½ tbsp white miso", "1 tsp soy, 1 tsp rice vinegar", "Pinch sweetener", "Bok choy or broccoli", "Sesame seeds", "Salt and black pepper, to taste"],
  steps: ["Mix miso, soy, vinegar and sweetener; spread over the fish.", "Bake at 210°C for 10–12 minutes, then grill 2 minutes to caramelise.", "Steam the greens and sprinkle sesame."],
  kids: "Serve with sushi rice."
},
{
  name: "Keema Matar (Spiced Mince & Peas)", cuisine: "Asian",
  meal: "main", speed: "normal", time: 30, servings: 4,
  kcal: 360, protein: 32, carbs: 12, tags: ["Indian", "Freezes well"],
  ingredients: ["500 g beef or lamb mince", "1 onion, 3 garlic cloves, 1 tbsp ginger", "2 tsp garam masala, 1 tsp cumin, ½ tsp turmeric", "1 can chopped tomatoes", "150 g frozen peas", "Coriander, Greek yogurt", "Salt and black pepper, to taste"],
  steps: ["Fry onion, garlic and ginger 5 minutes.", "Add mince and spices; brown.", "Add tomatoes; simmer 15 minutes.", "Add peas for 5 minutes; top with coriander and yogurt."],
  kids: "Serve with rice or roti."
},
{
  name: "Chicken Yakitori Skewers", cuisine: "Asian",
  meal: "main", speed: "normal", time: 30, servings: 3,
  kcal: 340, protein: 40, carbs: 8, tags: ["Japanese", "Family favourite"],
  ingredients: ["600 g chicken thigh, in pieces", "1 bunch spring onions, in 3 cm lengths", "Glaze: 3 tbsp soy, 1 tbsp rice vinegar, 1 tsp grated ginger, sweetener to taste", "Cucumber and sesame salad", "Salt and black pepper, to taste"],
  steps: ["Thread chicken and spring onion onto skewers.", "Simmer the glaze 2 minutes.", "Grill or bake at 230°C for 12–15 minutes, brushing with glaze.", "Serve with cucumber salad."],
  kids: "Serve with rice; a little honey in their glaze."
},

/* ----------------------------- BOILED EGGS ----------------------------- */
{
  name: "Soft-Boiled Eggs & Asparagus Soldiers", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 260, protein: 20, carbs: 4, tags: ["Boiled eggs", "Vegetarian"],
  ingredients: ["3 eggs", "6 asparagus spears (or cucumber sticks)", "30 g cheese", "Salt, pepper"],
  steps: ["Lower eggs into boiling water; cook 6½ minutes for runny yolks.", "Steam or pan-fry asparagus 3 minutes.", "Dip the asparagus into the yolks."],
  kids: "Give them toast soldiers with butter to dip."
},
{
  name: "Swedish Egg Halves with Kaviar & Dill", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 12, servings: 1,
  kcal: 290, protein: 21, carbs: 3, tags: ["Boiled eggs"],
  ingredients: ["3 eggs", "2 tsp Kalles kaviar or 30 g shrimp", "1 tbsp light crème fraiche", "Dill, chives", "Cucumber", "Salt and black pepper, to taste"],
  steps: ["Boil eggs 9 minutes; cool and halve.", "Top each half with crème fraiche, kaviar or shrimp, and dill.", "Serve with cucumber."],
  kids: "Serve on crispbread or a sandwich."
},
{
  name: "Soy-Marinated Eggs (Ajitama)", cuisine: "Asian",
  meal: "breakfast", speed: "normal", time: 20, servings: 3,
  kcal: 230, protein: 17, carbs: 3, tags: ["Boiled eggs", "Meal prep"],
  ingredients: ["6 eggs", "100 ml soy sauce", "200 ml water", "1 tbsp rice vinegar", "1 garlic clove, slice of ginger", "Pinch sweetener", "Salt and black pepper, to taste"],
  steps: ["Boil eggs 6½ minutes; cool in ice water and peel.", "Mix the remaining ingredients in a jar.", "Add eggs and refrigerate at least 4 hours (up to 3 days).", "Eat 2 with cucumber or salad."],
  kids: "Add them to noodle soup or rice bowls."
},
{
  name: "Boiled Egg & Avocado Za'atar Plate", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 380, protein: 24, carbs: 6, tags: ["Boiled eggs", "Vegetarian"],
  ingredients: ["2 eggs", "100 g cottage cheese", "½ avocado", "1 tsp za'atar", "Tomato, olive oil drizzle", "Salt and black pepper, to taste"],
  steps: ["Boil eggs 7–8 minutes; peel and halve.", "Plate with cottage cheese, avocado and tomato.", "Sprinkle za'atar and a few drops of olive oil."],
  kids: "Add pita and hummus."
},
{
  name: "Boiled Egg Protein Box", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 12, servings: 1,
  kcal: 360, protein: 34, carbs: 6, tags: ["Boiled eggs", "Lunch box", "On the go"],
  ingredients: ["2 eggs", "60 g turkey breast slices", "30 g cheese cubes", "Cucumber, cherry tomatoes, sugar snaps", "10 almonds", "Salt and black pepper, to taste"],
  steps: ["Boil eggs 9 minutes (or use eggs boiled ahead).", "Pack everything in a box.", "Keeps in the fridge 2 days."],
  kids: "Add a wholegrain roll and fruit to their box."
},
{
  name: "Egg Curry (Anda Curry)", cuisine: "Asian",
  meal: "main", speed: "normal", time: 30, servings: 3,
  kcal: 340, protein: 22, carbs: 12, tags: ["Boiled eggs", "Vegetarian", "Indian"],
  ingredients: ["8 eggs", "1 onion, 2 garlic cloves, 1 tbsp ginger", "1 can chopped tomatoes", "2 tsp garam masala, 1 tsp cumin, ½ tsp turmeric", "100 ml light coconut milk", "Spinach, coriander", "1 tbsp oil", "Salt and black pepper, to taste"],
  steps: ["Boil eggs 9 minutes; peel and score lightly.", "Fry onion, garlic, ginger and spices 5 minutes.", "Add tomatoes and coconut milk; simmer 10 minutes.", "Add eggs and spinach for 5 minutes."],
  kids: "Serve with rice or naan."
}
);
