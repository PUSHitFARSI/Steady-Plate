// =====================================================================
// RECIPES — edit, add or remove freely.
// Fields:
//   name       Recipe name
//   cuisine    Persian, Mediterranean, Asian, Mexican, Italian, Swedish or Everyday
//   meal       "breakfast" or "main"  (main = lunch / dinner)
//   speed      "quick" (about 20 min or less) or "normal"
//   time       Total minutes
//   servings   How many adult portions the recipe makes
//   kcal, protein, carbs   APPROXIMATE values per adult serving (carbs = total grams)
//   tags       Short labels shown on the card
//   ingredients, steps   Lists of text
//   kids       How to add carbs / healthy fats for the children
// No pork in any recipe. When buying sausages, check the casing is not pork.
// =====================================================================

const RECIPES = [

/* ---------------------------- BREAKFAST · QUICK ---------------------------- */
{
  name: "Greek Yogurt Berry Crunch Bowl", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 310, protein: 26, carbs: 15, tags: ["No cooking", "Vegetarian"],
  ingredients: ["200 g Greek yogurt 2% or skyr", "50 g raspberries or blueberries", "1 tbsp chia seeds", "10 g walnuts, chopped", "Pinch of cinnamon"],
  steps: ["Spoon yogurt into a bowl.", "Top with berries, chia, walnuts and cinnamon."],
  kids: "Add granola or oats and a drizzle of honey to their bowls."
},
{
  name: "Spinach & Feta Scramble", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 8, servings: 1,
  kcal: 330, protein: 24, carbs: 3, tags: ["Vegetarian"],
  ingredients: ["3 eggs", "1 large handful baby spinach", "30 g feta, crumbled", "1 tsp olive oil", "Salt, pepper, chili flakes"],
  steps: ["Wilt the spinach in the oil in a non-stick pan.", "Add beaten eggs and stir gently over medium-low heat.", "Fold in feta just before the eggs set. Season."],
  kids: "Serve on toast or sourdough brushed with olive oil or butter."
},
{
  name: "Cottage Cheese Garden Bowl", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 230, protein: 26, carbs: 9, tags: ["No cooking", "Vegetarian"],
  ingredients: ["200 g cottage cheese (keso)", "8 cherry tomatoes, halved", "¼ cucumber, diced", "1 tsp everything-bagel seasoning or sesame seeds", "Black pepper"],
  steps: ["Put cottage cheese in a bowl.", "Top with tomatoes and cucumber.", "Finish with seasoning and pepper."],
  kids: "Serve with crispbread (knäckebröd) or crackers and a few avocado slices."
},
{
  name: "Smoked Salmon Egg Wrap", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 8, servings: 1,
  kcal: 300, protein: 26, carbs: 2, tags: ["Fish"],
  ingredients: ["2 eggs", "50 g smoked salmon", "1 tbsp light cream cheese", "Fresh dill", "A few rocket leaves"],
  steps: ["Beat eggs and pour into a hot non-stick pan to make a thin omelette.", "Flip briefly, then slide onto a plate.", "Spread cream cheese, add salmon, dill and rocket, and roll up."],
  kids: "Use the same filling in a soft tortilla wrap."
},
{
  name: "Turkey & Cheese Roll-Ups", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 280, protein: 32, carbs: 4, tags: ["No cooking"],
  ingredients: ["100 g sliced turkey breast", "2 slices cheese (17%)", "Cucumber and bell pepper sticks", "1 tsp mustard"],
  steps: ["Lay out turkey slices and spread a little mustard.", "Add half a cheese slice and a vegetable stick to each.", "Roll up tightly."],
  kids: "Serve with a bread roll and a glass of milk."
},
{
  name: "Skyr Berry Smoothie", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 230, protein: 25, carbs: 18, tags: ["No cooking", "Vegetarian"],
  ingredients: ["200 g plain skyr", "100 g frozen mixed berries", "150 ml unsweetened almond or soy milk", "1 tbsp ground flaxseed"],
  steps: ["Blend everything until smooth.", "Add a splash more milk if too thick."],
  kids: "Blend in half a banana and 2 tbsp oats for their portion."
},
{
  name: "Microwave Mug Omelette", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 290, protein: 22, carbs: 5, tags: ["Vegetarian"],
  ingredients: ["3 eggs", "¼ bell pepper, diced", "1 spring onion, sliced", "20 g grated cheese", "Salt & pepper"],
  steps: ["Lightly oil a large mug. Whisk in the eggs.", "Stir in pepper, onion and cheese.", "Microwave 1 min, stir, then 45–60 sec more until set."],
  kids: "Serve with toast fingers."
},
{
  name: "Avocado, Egg & Cottage Plate", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 400, protein: 26, carbs: 7, tags: ["Vegetarian"],
  ingredients: ["2 eggs", "½ avocado", "100 g cottage cheese", "Lemon juice", "Chili flakes, salt"],
  steps: ["Boil eggs 7–8 minutes, cool and halve.", "Slice avocado and squeeze over lemon.", "Plate with cottage cheese and season."],
  kids: "Mash the avocado on sourdough toast for them."
},
{
  name: "Overnight Chia Protein Pudding", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 300, protein: 20, carbs: 14, tags: ["Prep the night before", "Vegetarian"],
  ingredients: ["3 tbsp chia seeds", "200 ml unsweetened soy milk", "100 g Greek yogurt", "½ tsp vanilla", "Cinnamon"],
  steps: ["Stir everything together in a jar.", "Stir again after 5 minutes, then refrigerate overnight.", "Top with a few berries in the morning."],
  kids: "Top theirs with sliced banana and a little honey."
},
{
  name: "Pan-Fried Halloumi & Tomatoes", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 310, protein: 20, carbs: 5, tags: ["Vegetarian"],
  ingredients: ["80 g halloumi, sliced", "1 large tomato, sliced", "Handful rocket", "Lemon wedge", "Dried oregano"],
  steps: ["Dry-fry halloumi 2 minutes per side until golden.", "Plate with tomato and rocket.", "Squeeze over lemon and sprinkle oregano."],
  kids: "Tuck everything into a warm pita with a drizzle of olive oil."
},
{
  name: "Tuna-Stuffed Avocado", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 340, protein: 32, carbs: 5, tags: ["No cooking", "Fish"],
  ingredients: ["1 can tuna in water, drained", "½ avocado", "1 tbsp Greek yogurt", "Squeeze of lemon", "Chives, salt, pepper"],
  steps: ["Mix tuna with yogurt, lemon and chives.", "Pile into the avocado half.", "Season well."],
  kids: "Make tuna sandwiches with the mix on wholegrain bread."
},
{
  name: "Cottage Cheese Pancakes", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 15, servings: 1,
  kcal: 340, protein: 30, carbs: 7, tags: ["Vegetarian"],
  ingredients: ["2 eggs", "150 g cottage cheese", "2 tbsp almond flour", "½ tsp baking powder", "Cinnamon"],
  steps: ["Blend everything to a smooth batter.", "Fry small pancakes in a lightly oiled non-stick pan, 2 minutes per side.", "Serve with a few berries."],
  kids: "Make regular pancakes for them or add maple syrup and banana on top."
},
{
  name: "Quick Shakshuka for One", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 15, servings: 1,
  kcal: 280, protein: 18, carbs: 12, tags: ["Vegetarian"],
  ingredients: ["2 eggs", "200 g canned chopped tomatoes", "½ tsp cumin", "½ tsp paprika", "20 g feta", "1 tsp olive oil"],
  steps: ["Heat oil, add spices for 30 seconds, then tomatoes. Simmer 5 minutes.", "Make 2 wells and crack in the eggs.", "Cover and cook 4–5 minutes. Top with feta."],
  kids: "Serve with crusty bread for dipping."
},
{
  name: "Chicken Sausage, Egg & Spinach", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 12, servings: 1,
  kcal: 350, protein: 28, carbs: 4, tags: ["Check casing is not pork"],
  ingredients: ["2 chicken sausages", "1 egg", "Handful spinach", "Mustard"],
  steps: ["Fry sausages 8 minutes, turning.", "Fry the egg in the same pan.", "Wilt spinach in the pan juices and serve with mustard."],
  kids: "Put sausage and egg in a soft bun."
},
{
  name: "Nutty \"No-atmeal\"", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 320, protein: 18, carbs: 6, tags: ["Vegetarian"],
  ingredients: ["2 tbsp ground flaxseed", "2 tbsp hemp hearts", "1 egg", "150 ml milk or unsweetened soy milk", "Cinnamon"],
  steps: ["Whisk everything in a microwave bowl.", "Microwave 1 minute, stir, then 30–60 seconds more until thick.", "Top with a few berries."],
  kids: "Make real oatmeal for them with the same toppings plus banana."
},
{
  name: "Smoked Mackerel Plate", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 8, servings: 1,
  kcal: 330, protein: 22, carbs: 3, tags: ["Fish", "Omega-3"],
  ingredients: ["60 g smoked mackerel", "1 boiled egg", "Cucumber slices", "2 tbsp Greek yogurt + ½ tsp mustard", "Dill"],
  steps: ["Flake mackerel onto a plate with egg and cucumber.", "Stir mustard into yogurt for a dip.", "Finish with dill."],
  kids: "Serve on rye bread or crispbread."
},
{
  name: "Kvarg Peanut Bowl", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 3, servings: 1,
  kcal: 330, protein: 32, carbs: 12, tags: ["No cooking", "Vegetarian"],
  ingredients: ["250 g plain kvarg (quark)", "1 tbsp peanut butter", "Handful raspberries", "Cinnamon"],
  steps: ["Stir cinnamon into kvarg.", "Swirl in peanut butter and top with raspberries."],
  kids: "Add granola and sliced banana to theirs."
},
{
  name: "Egg & Turkey Lettuce Wraps", cuisine: "Mexican",
  meal: "breakfast", speed: "quick", time: 8, servings: 1,
  kcal: 260, protein: 24, carbs: 4, tags: [],
  ingredients: ["2 eggs", "50 g turkey breast slices", "3 large lettuce leaves", "2 tbsp salsa"],
  steps: ["Scramble the eggs.", "Divide egg and turkey between lettuce leaves.", "Top with salsa and wrap."],
  kids: "Use tortillas instead of lettuce."
},
{
  name: "Leftover Beef Breakfast Hash", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 12, servings: 1,
  kcal: 380, protein: 30, carbs: 6, tags: ["Uses leftovers"],
  ingredients: ["100 g cooked lean beef mince", "½ bell pepper, diced", "¼ onion, diced", "1 egg", "Smoked paprika"],
  steps: ["Soften onion and pepper in a lightly oiled pan.", "Add beef and paprika and heat through.", "Make a well, fry the egg in it, cover until set."],
  kids: "Add diced cooked potatoes to their portion of the hash."
},
{
  name: "Caprese Eggs", cuisine: "Italian",
  meal: "breakfast", speed: "quick", time: 8, servings: 1,
  kcal: 310, protein: 22, carbs: 4, tags: ["Vegetarian"],
  ingredients: ["2 eggs", "50 g light mozzarella", "1 tomato, sliced", "Fresh basil", "1 tsp olive oil"],
  steps: ["Fry eggs in olive oil.", "Lay tomato and mozzarella around the eggs for the last minute and cover.", "Finish with basil and pepper."],
  kids: "Serve on toasted ciabatta."
},
{
  name: "Salmon Cucumber Boats", cuisine: "Swedish",
  meal: "breakfast", speed: "quick", time: 8, servings: 1,
  kcal: 290, protein: 26, carbs: 4, tags: ["No cooking", "Fish"],
  ingredients: ["80 g smoked salmon", "1 boiled egg, chopped", "1 tbsp light cream cheese", "½ cucumber, halved lengthways", "Dill, lemon"],
  steps: ["Scoop seeds out of the cucumber.", "Spread cream cheese inside.", "Fill with salmon and egg, finish with dill and lemon."],
  kids: "Use the filling on a bagel."
},
{
  name: "Chocolate Peanut Protein Shake", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 3, servings: 1,
  kcal: 300, protein: 28, carbs: 10, tags: ["No cooking", "Vegetarian"],
  ingredients: ["150 g kvarg", "200 ml unsweetened almond milk", "1 tbsp peanut butter", "1 tbsp cocoa powder", "Ice"],
  steps: ["Blend everything until smooth and frothy."],
  kids: "Blend in a banana and a spoon of oats for them."
},
{
  name: "Egg Salad Cucumber Bites", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 12, servings: 1,
  kcal: 290, protein: 21, carbs: 4, tags: ["Vegetarian"],
  ingredients: ["3 eggs", "2 tbsp Greek yogurt", "1 tsp Dijon mustard", "Chives", "½ cucumber, thick slices"],
  steps: ["Boil eggs 9 minutes, cool and chop.", "Mix with yogurt, mustard and chives.", "Spoon onto cucumber slices."],
  kids: "Make egg-salad sandwiches."
},
{
  name: "Turkish Eggs (Çılbır)", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 12, servings: 1,
  kcal: 320, protein: 22, carbs: 7, tags: ["Vegetarian"],
  ingredients: ["2 eggs", "150 g Greek yogurt", "1 small garlic clove, grated", "1 tsp butter", "½ tsp Aleppo pepper or paprika", "Dill"],
  steps: ["Mix yogurt with garlic and a pinch of salt; spread on a plate.", "Poach eggs 3 minutes and place on the yogurt.", "Melt butter with pepper and drizzle over. Add dill."],
  kids: "Serve with warm bread for dipping."
},
{
  name: "Chicken & Avocado Morning Plate", cuisine: "Everyday",
  meal: "breakfast", speed: "quick", time: 5, servings: 1,
  kcal: 340, protein: 32, carbs: 5, tags: ["Uses leftovers"],
  ingredients: ["100 g cooked chicken breast", "½ avocado", "1 tomato", "Lemon, salt, pepper"],
  steps: ["Slice chicken, avocado and tomato.", "Arrange on a plate and season with lemon, salt and pepper."],
  kids: "Make it into a toasted sandwich."
},
{
  name: "Zucchini & Feta Omelette", cuisine: "Mediterranean",
  meal: "breakfast", speed: "quick", time: 10, servings: 1,
  kcal: 320, protein: 24, carbs: 5, tags: ["Vegetarian"],
  ingredients: ["3 eggs", "½ zucchini, grated and squeezed dry", "30 g feta", "Fresh mint or parsley", "1 tsp olive oil"],
  steps: ["Cook zucchini in oil 2 minutes.", "Pour over beaten eggs and cook until almost set.", "Add feta and herbs, fold and serve."],
  kids: "Serve with toast."
},

/* ---------------------------- BREAKFAST · NORMAL --------------------------- */
{
  name: "Baked Egg Muffins (12)", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 30, servings: 4,
  kcal: 280, protein: 24, carbs: 4, tags: ["Meal prep", "Freezes well"],
  ingredients: ["10 eggs", "150 g cooked chicken or turkey, diced", "1 bell pepper, diced", "2 handfuls spinach, chopped", "1 small red onion, diced", "100 g grated cheese"],
  steps: ["Heat oven to 180°C and grease a 12-hole muffin tin.", "Divide fillings between holes.", "Whisk eggs with salt and pepper and pour over.", "Bake 20–22 minutes. Keeps 4 days in the fridge (3 muffins = 1 serving)."],
  kids: "Serve with toast or a wholegrain roll and fruit."
},
{
  name: "Family Shakshuka", cuisine: "Mediterranean",
  meal: "breakfast", speed: "normal", time: 30, servings: 3,
  kcal: 300, protein: 19, carbs: 14, tags: ["Vegetarian", "Weekend"],
  ingredients: ["6 eggs", "2 cans chopped tomatoes", "1 onion", "2 bell peppers", "2 garlic cloves", "1 tsp cumin, 1 tsp paprika", "60 g feta", "1 tbsp olive oil", "Parsley"],
  steps: ["Soften onion and peppers in oil, 8 minutes.", "Add garlic and spices, then tomatoes. Simmer 10 minutes.", "Make wells, crack in eggs, cover and cook 6–8 minutes.", "Top with feta and parsley."],
  kids: "Serve with pita or crusty bread to dip."
},
{
  name: "Chicken & Broccoli Frittata", cuisine: "Italian",
  meal: "breakfast", speed: "normal", time: 30, servings: 4,
  kcal: 330, protein: 31, carbs: 5, tags: ["Meal prep"],
  ingredients: ["8 eggs", "200 g cooked chicken, shredded", "200 g broccoli florets, small", "60 g grated cheese", "1 tsp olive oil"],
  steps: ["Heat oven to 190°C. Steam broccoli 3 minutes.", "Whisk eggs, stir in chicken, broccoli and half the cheese.", "Pour into an oiled oven-safe pan, top with remaining cheese.", "Bake 18–20 minutes until set."],
  kids: "Serve with roasted potato cubes tossed in olive oil."
},
{
  name: "Blueberry Almond Protein Muffins", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 35, servings: 5,
  kcal: 360, protein: 19, carbs: 9, tags: ["Vegetarian", "Freezes well"],
  ingredients: ["200 g almond flour", "30 g vanilla protein powder", "3 eggs", "150 g Greek yogurt", "2 tsp baking powder", "100 g blueberries", "Sweetener to taste (optional)"],
  steps: ["Heat oven to 175°C and line 10 muffin cups.", "Mix dry ingredients, then stir in eggs and yogurt.", "Fold in blueberries and divide between cups.", "Bake 22–25 minutes (2 muffins = 1 serving)."],
  kids: "Serve with a glass of milk and a banana."
},
{
  name: "Green Shakshuka", cuisine: "Mediterranean",
  meal: "breakfast", speed: "normal", time: 25, servings: 2,
  kcal: 290, protein: 19, carbs: 9, tags: ["Vegetarian"],
  ingredients: ["4 eggs", "1 leek, sliced", "1 zucchini, diced", "150 g spinach", "1 garlic clove", "½ tsp cumin", "40 g feta", "1 tbsp olive oil"],
  steps: ["Cook leek and zucchini in oil 6 minutes.", "Add garlic, cumin and spinach until wilted.", "Make wells, add eggs, cover 5–6 minutes.", "Top with feta."],
  kids: "Serve with toasted bread and hummus."
},
{
  name: "Turkey Breakfast Casserole", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 45, servings: 5,
  kcal: 330, protein: 31, carbs: 4, tags: ["Meal prep"],
  ingredients: ["8 eggs", "300 g turkey mince", "1 bell pepper", "1 onion", "100 g grated cheese", "1 tsp dried sage", "Salt, pepper"],
  steps: ["Brown mince with onion, pepper and sage.", "Spread in an ovenproof dish.", "Whisk eggs, pour over and top with cheese.", "Bake at 180°C for 30 minutes."],
  kids: "Serve with oven hash browns."
},
{
  name: "Kvarg & Chia Breakfast Jars (×4)", cuisine: "Swedish",
  meal: "breakfast", speed: "normal", time: 10, servings: 4,
  kcal: 290, protein: 24, carbs: 12, tags: ["Meal prep", "Overnight", "Vegetarian"],
  ingredients: ["1 kg plain kvarg", "8 tbsp chia seeds", "300 ml unsweetened almond milk", "2 tsp vanilla", "200 g frozen berries"],
  steps: ["Mix kvarg, chia, milk and vanilla.", "Layer into 4 jars with berries.", "Refrigerate overnight. Keeps 3–4 days."],
  kids: "Add oats or granola to their jars."
},
{
  name: "Spinach Feta Egg Bites", cuisine: "Mediterranean",
  meal: "breakfast", speed: "normal", time: 35, servings: 3,
  kcal: 260, protein: 22, carbs: 4, tags: ["Meal prep", "Vegetarian"],
  ingredients: ["6 eggs", "200 g cottage cheese", "1 handful spinach, chopped", "60 g feta", "Salt, pepper"],
  steps: ["Blend eggs and cottage cheese until smooth.", "Stir in spinach and feta and pour into a greased muffin tin (9 holes).", "Place tin in a tray of hot water and bake at 160°C for 25–30 minutes."],
  kids: "Serve with toast fingers."
},
{
  name: "Hot-Smoked Salmon & Asparagus Frittata", cuisine: "Swedish",
  meal: "breakfast", speed: "normal", time: 30, servings: 3,
  kcal: 350, protein: 34, carbs: 4, tags: ["Fish", "Weekend"],
  ingredients: ["6 eggs", "200 g hot-smoked salmon, flaked", "1 bunch asparagus", "Dill", "2 tbsp milk", "1 tsp oil"],
  steps: ["Heat oven to 190°C. Pan-fry asparagus 3 minutes in oil.", "Whisk eggs, milk, dill and seasoning; pour over.", "Scatter salmon on top.", "Bake 15–18 minutes."],
  kids: "Serve with new potatoes or rye bread."
},
{
  name: "Cloud Bread Breakfast Sandwiches", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 40, servings: 2,
  kcal: 310, protein: 26, carbs: 3, tags: ["Weekend"],
  ingredients: ["3 eggs, separated", "50 g light cream cheese", "Pinch cream of tartar or baking powder", "100 g turkey slices", "2 cheese slices", "Tomato, lettuce"],
  steps: ["Heat oven to 150°C. Beat whites with cream of tartar to stiff peaks.", "Mix yolks with cream cheese, then gently fold into whites.", "Make 6 rounds on a lined tray and bake 25–30 minutes.", "Fill with turkey, cheese, tomato and lettuce."],
  kids: "Use the same fillings in regular bread or bagels."
},
{
  name: "Coconut Flour Pancakes", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 25, servings: 2,
  kcal: 300, protein: 20, carbs: 7, tags: ["Vegetarian", "Weekend"],
  ingredients: ["4 eggs", "30 g coconut flour", "100 g cottage cheese", "½ tsp baking powder", "Vanilla, cinnamon"],
  steps: ["Blend all ingredients and rest 5 minutes to thicken.", "Fry small pancakes on medium-low heat, 2–3 minutes per side.", "Serve with berries and Greek yogurt."],
  kids: "Make regular pancakes or serve with maple syrup and banana."
},
{
  name: "Herby Chicken Breakfast Patties", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 25, servings: 5,
  kcal: 320, protein: 32, carbs: 2, tags: ["Meal prep", "Freezes well"],
  ingredients: ["500 g chicken or turkey mince", "1 tsp dried sage", "½ tsp fennel seeds, crushed", "½ tsp garlic powder", "½ tsp onion powder", "Salt, pepper", "1 egg per serving to serve"],
  steps: ["Mix mince with seasonings and shape 10 patties.", "Pan-fry 4 minutes per side until cooked through.", "Serve 2 patties with a fried egg and tomatoes."],
  kids: "Put a patty in a bun with cheese."
},
{
  name: "Zucchini Halloumi Fritters", cuisine: "Mediterranean",
  meal: "breakfast", speed: "normal", time: 30, servings: 2,
  kcal: 360, protein: 22, carbs: 9, tags: ["Vegetarian"],
  ingredients: ["2 zucchini, grated", "100 g halloumi, grated", "2 eggs", "3 tbsp almond flour", "Mint, spring onion", "1 tbsp olive oil"],
  steps: ["Salt zucchini, rest 10 minutes and squeeze out water.", "Mix with halloumi, eggs, almond flour and herbs.", "Fry spoonfuls 3 minutes per side.", "Serve with a garlic yogurt dip."],
  kids: "Serve in pita with extra dip."
},
{
  name: "Breakfast Burrito Bowls (Meal Prep)", cuisine: "Mexican",
  meal: "breakfast", speed: "normal", time: 30, servings: 4,
  kcal: 380, protein: 34, carbs: 9, tags: ["Meal prep"],
  ingredients: ["400 g turkey mince", "6 eggs", "400 g cauliflower rice", "2 bell peppers", "1 tsp cumin, 1 tsp paprika", "Salsa, Greek yogurt"],
  steps: ["Brown mince with peppers and spices.", "Fry cauliflower rice 5 minutes.", "Scramble eggs.", "Divide into 4 boxes; top with salsa and yogurt."],
  kids: "Use rice instead of cauliflower rice, or wrap in a tortilla."
},
{
  name: "Cauliflower Hash Browns & Eggs", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 35, servings: 2,
  kcal: 280, protein: 18, carbs: 8, tags: ["Vegetarian"],
  ingredients: ["300 g riced cauliflower", "1 egg + 2 eggs to serve", "50 g grated parmesan", "½ tsp garlic powder"],
  steps: ["Microwave cauliflower 3 minutes, cool and squeeze dry in a towel.", "Mix with 1 egg, parmesan and garlic. Shape 6 patties.", "Bake at 200°C for 20 minutes, flipping halfway.", "Serve with fried eggs."],
  kids: "Make regular potato hash browns or serve with toast."
},
{
  name: "Baked Egg-Stuffed Peppers", cuisine: "Mediterranean",
  meal: "breakfast", speed: "normal", time: 30, servings: 2,
  kcal: 260, protein: 17, carbs: 9, tags: ["Vegetarian"],
  ingredients: ["2 bell peppers, halved", "4 eggs", "40 g feta", "Chives", "Paprika"],
  steps: ["Heat oven to 190°C. Bake pepper halves 8 minutes.", "Crack an egg into each half and add feta.", "Bake 15–18 minutes until whites are set."],
  kids: "Serve with toast soldiers."
},
{
  name: "Protein Waffles", cuisine: "Everyday",
  meal: "breakfast", speed: "normal", time: 20, servings: 2,
  kcal: 340, protein: 32, carbs: 7, tags: ["Vegetarian", "Weekend"],
  ingredients: ["2 eggs", "150 g kvarg or cottage cheese", "30 g almond flour", "20 g vanilla protein powder", "½ tsp baking powder"],
  steps: ["Blend everything until smooth.", "Cook in a greased waffle iron until golden.", "Serve with berries and yogurt."],
  kids: "Make regular waffles; top with jam or syrup and berries."
},
{
  name: "Crustless Salmon Quiche", cuisine: "Swedish",
  meal: "breakfast", speed: "normal", time: 45, servings: 4,
  kcal: 290, protein: 24, carbs: 4, tags: ["Fish", "Meal prep"],
  ingredients: ["6 eggs", "200 ml milk", "150 g hot-smoked or cooked salmon", "2 handfuls spinach", "60 g grated cheese", "Dill"],
  steps: ["Heat oven to 180°C. Grease a pie dish.", "Scatter spinach and salmon in the dish.", "Whisk eggs, milk, dill and seasoning; pour over and top with cheese.", "Bake 30–35 minutes."],
  kids: "Serve with crusty bread or bake their slice in a ready-made pastry shell."
},
{
  name: "Mediterranean Egg Bake", cuisine: "Mediterranean",
  meal: "breakfast", speed: "normal", time: 35, servings: 4,
  kcal: 280, protein: 18, carbs: 5, tags: ["Vegetarian", "Meal prep"],
  ingredients: ["8 eggs", "6 sun-dried tomatoes, chopped", "10 olives, sliced", "2 handfuls spinach", "80 g feta", "Oregano"],
  steps: ["Heat oven to 180°C. Grease a baking dish.", "Spread spinach, tomatoes and olives in it.", "Pour over whisked eggs and crumble feta on top.", "Bake 25 minutes."],
  kids: "Serve with pita and hummus."
},

/* ------------------------ LUNCH / DINNER · QUICK --------------------------- */
{
  name: "Garlic Chili Shrimp Zoodles", cuisine: "Italian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 280, protein: 38, carbs: 10, tags: ["Seafood"],
  ingredients: ["400 g peeled shrimp", "3 zucchini, spiralized", "3 garlic cloves", "1 red chili", "1 lemon", "2 tsp olive oil", "Parsley"],
  steps: ["Fry garlic and chili in oil 1 minute.", "Add shrimp, cook 2–3 minutes until pink.", "Add zucchini noodles for 1–2 minutes.", "Finish with lemon and parsley."],
  kids: "Toss the shrimp with spaghetti and a good drizzle of olive oil."
},
{
  name: "Ginger Chicken Stir-Fry", cuisine: "Asian",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 330, protein: 40, carbs: 12, tags: [],
  ingredients: ["450 g chicken breast strips", "1 head broccoli", "1 red pepper", "2 tbsp soy sauce", "1 tbsp grated ginger", "2 garlic cloves", "1 tbsp oil"],
  steps: ["Stir-fry chicken in hot oil 5 minutes; remove.", "Stir-fry vegetables 3–4 minutes.", "Return chicken, add soy, ginger and garlic; toss 1 minute."],
  kids: "Serve over rice or egg noodles with a few drops of sesame oil."
},
{
  name: "Turkey Taco Lettuce Cups", cuisine: "Mexican",
  meal: "main", speed: "quick", time: 15, servings: 4,
  kcal: 280, protein: 30, carbs: 7, tags: ["Family favourite"],
  ingredients: ["500 g turkey mince", "2 tsp cumin, 2 tsp paprika, 1 tsp oregano, ½ tsp garlic powder", "1 can chopped tomatoes (small)", "Little Gem lettuce", "Salsa, Greek yogurt, cheese"],
  steps: ["Brown mince with the spices (no sugary taco mix needed).", "Add tomatoes and simmer 5 minutes.", "Spoon into lettuce cups with toppings."],
  kids: "Use soft tortillas or taco shells, add avocado and a little corn."
},
{
  name: "Lemon Dill Salmon & Broccoli", cuisine: "Swedish",
  meal: "main", speed: "quick", time: 18, servings: 2,
  kcal: 380, protein: 34, carbs: 8, tags: ["Fish", "Omega-3", "One tray"],
  ingredients: ["2 salmon fillets (about 150 g each)", "1 head broccoli", "1 lemon", "Fresh dill", "1 tsp olive oil"],
  steps: ["Heat oven or air fryer to 200°C.", "Toss broccoli in oil; put salmon alongside with lemon slices.", "Cook 12–14 minutes. Finish with dill."],
  kids: "Serve with boiled potatoes or rice and a drizzle of olive oil."
},
{
  name: "Tuna Niçoise Salad", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 350, protein: 36, carbs: 9, tags: ["Fish"],
  ingredients: ["2 cans tuna", "3 eggs", "200 g green beans", "Cherry tomatoes", "10 black olives", "Lettuce", "Mustard-lemon dressing"],
  steps: ["Boil eggs 8 minutes; add beans for the last 3 minutes.", "Cool, halve the eggs.", "Arrange everything on lettuce and dress."],
  kids: "Add boiled baby potatoes dressed in olive oil."
},
{
  name: "Halloumi Chicken Salad", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 420, protein: 40, carbs: 8, tags: [],
  ingredients: ["250 g chicken breast, sliced", "100 g halloumi, sliced", "Mixed salad leaves", "Cucumber, tomato, red onion", "Lemon & oregano dressing"],
  steps: ["Pan-fry chicken 6 minutes until cooked.", "Dry-fry halloumi 2 minutes per side.", "Toss with salad and dressing."],
  kids: "Serve with warm pita and hummus."
},
{
  name: "Beef & Broccoli", cuisine: "Asian",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 330, protein: 36, carbs: 9, tags: ["Family favourite"],
  ingredients: ["400 g beef sirloin, thin strips", "1 large head broccoli", "3 tbsp soy sauce", "1 tbsp grated ginger", "2 garlic cloves", "1 tbsp oil", "Sesame seeds"],
  steps: ["Sear beef in hot oil in batches; set aside.", "Stir-fry broccoli 3 minutes with a splash of water.", "Return beef, add soy, ginger, garlic; toss 1 minute.", "Sprinkle sesame."],
  kids: "Serve with rice or noodles."
},
{
  name: "Chicken Egg-Fried Cauli Rice", cuisine: "Asian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 300, protein: 32, carbs: 12, tags: [],
  ingredients: ["400 g cauliflower rice", "200 g cooked chicken, diced", "2 eggs", "100 g frozen peas", "2 spring onions", "2 tbsp soy sauce", "1 tsp oil"],
  steps: ["Fry cauliflower rice 5 minutes.", "Push aside, scramble eggs.", "Add chicken, peas, soy and spring onions; toss until hot."],
  kids: "Make theirs with real rice in a separate pan, finished with sesame oil."
},
{
  name: "Greek Chicken Souvlaki Bowls", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 340, protein: 42, carbs: 10, tags: ["Family favourite"],
  ingredients: ["500 g chicken breast, cubed", "1 lemon, 2 garlic cloves, 2 tsp oregano", "Cucumber, tomato, red onion", "200 g tzatziki", "Olives"],
  steps: ["Toss chicken with lemon, garlic, oregano and salt.", "Pan-fry or grill 8–10 minutes.", "Serve over chopped salad with tzatziki and olives."],
  kids: "Add pita bread and rice; drizzle olive oil on their salad."
},
{
  name: "Cod with Tomato-Olive Salsa", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 260, protein: 36, carbs: 7, tags: ["Fish", "Light"],
  ingredients: ["2 cod fillets (180 g each)", "200 g cherry tomatoes, quartered", "10 olives, chopped", "1 tbsp capers", "Basil", "1 tsp olive oil"],
  steps: ["Season and pan-fry cod 3–4 minutes per side.", "Mix tomatoes, olives, capers and basil.", "Spoon salsa over the fish."],
  kids: "Serve with couscous or potatoes tossed in olive oil."
},
{
  name: "Light Chicken Caesar", cuisine: "Italian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 380, protein: 45, carbs: 8, tags: [],
  ingredients: ["300 g chicken breast", "1 romaine lettuce", "30 g parmesan", "Dressing: 100 g Greek yogurt, 1 tsp Dijon, 1 garlic clove, lemon, 1 tsp anchovy paste (optional)"],
  steps: ["Pan-fry chicken 10 minutes, rest and slice.", "Whisk dressing ingredients.", "Toss lettuce with dressing, top with chicken and shaved parmesan."],
  kids: "Add croutons or serve in a wrap."
},
{
  name: "Shrimp & Avocado Salad", cuisine: "Mexican",
  meal: "main", speed: "quick", time: 10, servings: 2,
  kcal: 320, protein: 30, carbs: 8, tags: ["Seafood", "No cooking"],
  ingredients: ["300 g cooked shrimp", "1 avocado", "Cherry tomatoes", "½ red onion", "Coriander, lime, chili"],
  steps: ["Dice avocado, tomatoes and onion.", "Toss with shrimp, lime juice, chili and coriander.", "Season and serve."],
  kids: "Serve with tortilla chips or in soft tacos."
},
{
  name: "Burger in a Bowl", cuisine: "Everyday",
  meal: "main", speed: "quick", time: 20, servings: 4,
  kcal: 380, protein: 32, carbs: 6, tags: ["Family favourite"],
  ingredients: ["500 g lean beef mince (5–10%)", "4 cheese slices", "Lettuce, tomato, red onion, pickles", "Mustard + Greek yogurt sauce"],
  steps: ["Shape 4 patties, season and fry 4 minutes per side.", "Add cheese for the last minute.", "Serve on chopped salad with pickles and sauce."],
  kids: "Serve in buns with oven fries."
},
{
  name: "Pesto Chicken Zoodles", cuisine: "Italian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 340, protein: 38, carbs: 9, tags: [],
  ingredients: ["300 g chicken breast, sliced", "3 zucchini, spiralized", "2 tbsp green pesto", "Cherry tomatoes", "Parmesan"],
  steps: ["Pan-fry chicken 6–8 minutes.", "Add zucchini noodles and tomatoes for 2 minutes.", "Stir through pesto; top with parmesan."],
  kids: "Use pasta instead of zoodles and add extra pesto."
},
{
  name: "Crispy Tuna Patties", cuisine: "Everyday",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 260, protein: 34, carbs: 3, tags: ["Fish", "Budget"],
  ingredients: ["2 cans tuna, drained", "1 egg", "2 tbsp almond flour", "2 spring onions", "1 tsp Dijon", "Lemon"],
  steps: ["Mix everything and shape 6 patties.", "Fry 3 minutes per side until golden.", "Serve with salad and lemon yogurt."],
  kids: "Serve in a bun or with mashed potatoes."
},
{
  name: "Thai Chicken Larb", cuisine: "Asian",
  meal: "main", speed: "quick", time: 15, servings: 3,
  kcal: 250, protein: 34, carbs: 6, tags: ["Fresh"],
  ingredients: ["500 g chicken mince", "2 limes", "1½ tbsp fish sauce", "1 red onion, thinly sliced", "Mint, coriander", "1 chili (optional)", "Lettuce leaves"],
  steps: ["Cook mince in a dry pan 6–8 minutes, breaking it up.", "Off the heat, add lime juice, fish sauce, onion and herbs.", "Serve in lettuce leaves."],
  kids: "Serve over jasmine rice; leave out the chili."
},
{
  name: "Chicken Sausage & Cabbage Pan", cuisine: "Everyday",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 330, protein: 24, carbs: 10, tags: ["One pan", "Check casing is not pork"],
  ingredients: ["6 chicken sausages, sliced", "½ white cabbage, shredded", "1 onion", "1 tsp caraway or fennel seeds", "1 tbsp mustard"],
  steps: ["Brown sausage slices.", "Add onion and cabbage; cook 10 minutes until soft.", "Stir in seeds and mustard."],
  kids: "Serve with mashed potatoes."
},
{
  name: "Caprese Chicken", cuisine: "Italian",
  meal: "main", speed: "quick", time: 20, servings: 2,
  kcal: 340, protein: 42, carbs: 5, tags: [],
  ingredients: ["2 chicken breasts, butterflied", "100 g light mozzarella", "2 tomatoes", "Basil", "1 tsp balsamic vinegar"],
  steps: ["Season and pan-fry chicken 5 minutes per side.", "Top with tomato and mozzarella, cover 2 minutes to melt.", "Finish with basil and a few drops of balsamic."],
  kids: "Serve with pasta tossed in olive oil."
},
{
  name: "Lemon Garlic Chicken Thighs & Green Beans", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 380, protein: 36, carbs: 8, tags: ["One pan"],
  ingredients: ["600 g boneless chicken thighs", "300 g green beans", "4 garlic cloves", "1 lemon", "Thyme"],
  steps: ["Season thighs and fry skin-side down 7 minutes, flip 5 minutes.", "Add beans, garlic, lemon juice and thyme; cover 4 minutes."],
  kids: "Serve with rice or pasta."
},
{
  name: "Coconut Curry Shrimp", cuisine: "Asian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 330, protein: 32, carbs: 8, tags: ["Seafood"],
  ingredients: ["400 g shrimp", "200 ml light coconut milk", "1–2 tbsp red curry paste", "2 handfuls spinach", "Lime"],
  steps: ["Fry curry paste 1 minute.", "Add coconut milk and simmer 3 minutes.", "Add shrimp for 3 minutes, then spinach and lime."],
  kids: "Serve with jasmine rice."
},
{
  name: "Egg Roll in a Bowl", cuisine: "Asian",
  meal: "main", speed: "quick", time: 15, servings: 3,
  kcal: 300, protein: 30, carbs: 10, tags: ["One pan", "Budget"],
  ingredients: ["500 g chicken or beef mince", "1 bag coleslaw mix (about 400 g)", "3 tbsp soy sauce", "1 tbsp ginger", "2 garlic cloves", "Spring onions, sesame"],
  steps: ["Brown mince.", "Add coleslaw mix, ginger and garlic; cook 5 minutes.", "Stir in soy; top with spring onions and sesame."],
  kids: "Serve over rice or noodles with a drop of sesame oil."
},
{
  name: "Smoked Salmon Egg Bowl", cuisine: "Swedish",
  meal: "main", speed: "quick", time: 12, servings: 1,
  kcal: 340, protein: 30, carbs: 5, tags: ["Fish"],
  ingredients: ["80 g smoked salmon", "2 soft-boiled eggs", "Cucumber, radish", "Mixed leaves", "Dill-yogurt dressing"],
  steps: ["Boil eggs 6½ minutes.", "Arrange leaves, vegetables and salmon.", "Halve eggs on top and add dressing."],
  kids: "Serve with rice or boiled potatoes."
},
{
  name: "Shawarma Chicken Pan", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 360, protein: 40, carbs: 10, tags: ["Family favourite"],
  ingredients: ["500 g chicken breast strips", "2 tsp shawarma spice", "1 onion, 2 bell peppers", "Tahini-yogurt sauce: 2 tbsp tahini, 150 g Greek yogurt, lemon"],
  steps: ["Toss chicken with spice.", "Fry with onion and peppers 10 minutes.", "Serve with tahini-yogurt sauce and salad."],
  kids: "Wrap in pita or serve with rice."
},
{
  name: "Steak & Rocket Salad", cuisine: "Italian",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 380, protein: 38, carbs: 5, tags: [],
  ingredients: ["2 sirloin steaks (150 g each)", "Rocket", "Cherry tomatoes", "Parmesan shavings", "Balsamic + 1 tsp olive oil"],
  steps: ["Season steaks and sear 2–3 minutes per side.", "Rest 5 minutes and slice.", "Serve on rocket and tomatoes with parmesan and dressing."],
  kids: "Serve with potato wedges or bread."
},
{
  name: "Turkey Meatball Broth", cuisine: "Everyday",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 280, protein: 32, carbs: 7, tags: ["Soup"],
  ingredients: ["500 g turkey mince", "1 egg", "1 garlic clove, grated", "1 litre chicken stock", "1 zucchini, diced", "2 handfuls spinach", "Lemon, parsley"],
  steps: ["Mix mince, egg, garlic and salt; roll small meatballs.", "Bring stock to a simmer, add meatballs and zucchini; cook 8 minutes.", "Add spinach, lemon and parsley."],
  kids: "Add small pasta to their bowls."
},
{
  name: "Spinach Feta Chicken Burgers", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 20, servings: 4,
  kcal: 300, protein: 36, carbs: 3, tags: ["Family favourite"],
  ingredients: ["500 g chicken mince", "1 handful spinach, chopped", "60 g feta", "1 garlic clove", "Oregano", "Salad to serve"],
  steps: ["Mix everything and shape 4 burgers.", "Fry 5–6 minutes per side until cooked through.", "Serve with salad and tzatziki."],
  kids: "Serve in buns with oven fries."
},
{
  name: "Peanut Tofu Stir-Fry", cuisine: "Asian",
  meal: "main", speed: "quick", time: 20, servings: 2,
  kcal: 340, protein: 26, carbs: 12, tags: ["Vegetarian"],
  ingredients: ["300 g firm tofu, cubed", "Broccoli, pepper, snap peas", "Sauce: 1 tbsp peanut butter, 2 tbsp soy, lime, ginger, water"],
  steps: ["Pat tofu dry and fry until golden.", "Stir-fry vegetables 4 minutes.", "Add sauce and tofu; toss to coat."],
  kids: "Serve with noodles."
},
{
  name: "Mexican Chicken Salad Bowl", cuisine: "Mexican",
  meal: "main", speed: "quick", time: 15, servings: 2,
  kcal: 400, protein: 40, carbs: 14, tags: [],
  ingredients: ["300 g cooked chicken", "Lettuce, tomato, red onion", "4 tbsp black beans", "½ avocado", "Salsa, Greek yogurt, lime"],
  steps: ["Warm chicken with cumin and paprika.", "Build bowls with salad, beans, chicken and avocado.", "Top with salsa, yogurt and lime."],
  kids: "Add rice and tortilla chips."
},
{
  name: "Halloumi with Herby Tomato Salad", cuisine: "Mediterranean",
  meal: "main", speed: "quick", time: 12, servings: 2,
  kcal: 360, protein: 22, carbs: 8, tags: ["Vegetarian"],
  ingredients: ["200 g halloumi", "4 tomatoes", "Cucumber", "Parsley, mint", "Lemon, 1 tsp olive oil", "Sumac (optional)"],
  steps: ["Dry-fry halloumi 2 minutes per side.", "Chop salad and dress with lemon, oil and sumac.", "Serve halloumi on top."],
  kids: "Add chickpeas or couscous dressed in olive oil, plus pita."
},
{
  name: "Creamy Chicken & Mushroom Skillet", cuisine: "Everyday",
  meal: "main", speed: "quick", time: 20, servings: 3,
  kcal: 360, protein: 40, carbs: 6, tags: ["One pan"],
  ingredients: ["500 g chicken breast, sliced", "250 g mushrooms", "1 garlic clove", "100 g light cream cheese", "100 ml stock", "Thyme, spinach"],
  steps: ["Brown chicken; remove.", "Fry mushrooms and garlic 5 minutes.", "Stir in cream cheese and stock, return chicken, add spinach; simmer 3 minutes."],
  kids: "Serve over pasta or rice."
},

/* ------------------------ LUNCH / DINNER · NORMAL -------------------------- */
{
  name: "Chicken Thigh Veggie Traybake", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 45, servings: 4,
  kcal: 420, protein: 36, carbs: 12, tags: ["One tray"],
  ingredients: ["800 g boneless chicken thighs", "2 bell peppers", "2 zucchini", "2 red onions", "1 tbsp olive oil", "Paprika, garlic powder, oregano"],
  steps: ["Heat oven to 210°C.", "Chop vegetables and toss everything with oil and spices on a tray.", "Roast 35 minutes."],
  kids: "Add a tray of potato cubes roasted in olive oil alongside."
},
{
  name: "Turkey Bolognese with Zoodles", cuisine: "Italian",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 300, protein: 32, carbs: 12, tags: ["Family favourite", "Freezes well"],
  ingredients: ["500 g turkey mince", "1 onion, 1 carrot, 2 celery sticks", "2 garlic cloves", "2 cans chopped tomatoes", "1 tbsp tomato paste", "Oregano, basil", "4 zucchini"],
  steps: ["Soften finely chopped onion, carrot and celery.", "Brown mince, add garlic and tomato paste.", "Add tomatoes and herbs; simmer 25 minutes.", "Serve over lightly cooked zucchini noodles with parmesan."],
  kids: "Serve the same sauce over spaghetti."
},
{
  name: "Yogurt Chicken Tikka Masala", cuisine: "Asian",
  meal: "main", speed: "normal", time: 45, servings: 4,
  kcal: 400, protein: 42, carbs: 12, tags: ["Family favourite"],
  ingredients: ["700 g chicken breast, cubed", "200 g Greek yogurt (marinade)", "2 tbsp tikka paste", "1 onion", "2 garlic cloves, ginger", "1 can chopped tomatoes", "100 ml light cooking cream", "Coriander"],
  steps: ["Marinate chicken in yogurt and half the paste (15+ minutes).", "Grill or pan-sear chicken until charred.", "Fry onion, garlic, ginger and remaining paste; add tomatoes and simmer 10 minutes.", "Blend, add cream and chicken; simmer 5 minutes."],
  kids: "Serve with basmati rice and naan."
},
{
  name: "Beef & Veg Chili", cuisine: "Mexican",
  meal: "main", speed: "normal", time: 50, servings: 5,
  kcal: 360, protein: 32, carbs: 14, tags: ["Freezes well", "Meal prep"],
  ingredients: ["600 g lean beef mince", "1 onion, 2 bell peppers, 1 zucchini", "3 garlic cloves", "2 tsp cumin, 2 tsp smoked paprika, 1 tsp chili", "2 cans chopped tomatoes", "1 can kidney beans (drained)"],
  steps: ["Brown mince; add onion and peppers.", "Add garlic and spices for 1 minute.", "Add tomatoes and zucchini; simmer 30 minutes.", "Stir in beans for the last 10 minutes."],
  kids: "Serve with rice, tortilla chips and avocado."
},
{
  name: "Eggplant Moussaka (Lighter)", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 60, servings: 5,
  kcal: 400, protein: 32, carbs: 14, tags: ["Weekend"],
  ingredients: ["2 large eggplants, sliced", "500 g lean beef or lamb mince", "1 onion, 2 garlic cloves", "1 can chopped tomatoes", "1 tsp cinnamon, oregano", "Topping: 300 g Greek yogurt, 2 eggs, 50 g parmesan"],
  steps: ["Brush eggplant lightly with oil and roast at 200°C for 20 minutes.", "Brown mince with onion and garlic; add tomatoes and spices; simmer 15 minutes.", "Layer eggplant and meat in a dish.", "Whisk topping, spread on top and bake 25 minutes."],
  kids: "Serve with bread or roast potatoes."
},
{
  name: "Turkey Stuffed Peppers", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 50, servings: 4,
  kcal: 320, protein: 30, carbs: 14, tags: [],
  ingredients: ["4 large bell peppers, halved", "500 g turkey mince", "300 g cauliflower rice", "1 onion", "1 can chopped tomatoes", "Italian herbs", "80 g grated cheese"],
  steps: ["Heat oven to 190°C.", "Brown mince with onion; add cauliflower rice, tomatoes and herbs; simmer 10 minutes.", "Fill pepper halves, top with cheese.", "Bake 30 minutes."],
  kids: "Mix cooked rice into the filling for their peppers."
},
{
  name: "Pesto Salmon & Roasted Veg", cuisine: "Italian",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 450, protein: 36, carbs: 10, tags: ["Fish", "Omega-3", "One tray"],
  ingredients: ["4 salmon fillets", "2 tbsp green pesto", "Broccoli, cherry tomatoes, red onion, zucchini", "1 tbsp olive oil"],
  steps: ["Heat oven to 200°C.", "Roast oiled vegetables 15 minutes.", "Spread pesto on salmon, add to tray and roast 12–15 minutes more."],
  kids: "Serve with new potatoes or pasta."
},
{
  name: "Lamb Kofta with Tzatziki", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 400, protein: 30, carbs: 8, tags: ["Weekend"],
  ingredients: ["500 g lamb mince (or beef)", "1 small onion, grated", "2 garlic cloves", "2 tsp cumin, 1 tsp coriander, parsley", "Tzatziki", "Salad: tomato, cucumber, red onion"],
  steps: ["Mix mince with onion, garlic, spices and parsley.", "Shape onto skewers or into long patties.", "Bake at 220°C for 15 minutes or grill.", "Serve with tzatziki and salad."],
  kids: "Wrap in flatbread or serve with bulgur."
},
{
  name: "Homemade Chicken Vegetable Soup", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 50, servings: 5,
  kcal: 280, protein: 34, carbs: 10, tags: ["Soup", "Freezes well"],
  ingredients: ["700 g chicken thighs or breast", "1.5 litres chicken stock", "2 carrots, 2 celery sticks, 1 onion, 1 leek", "2 garlic cloves", "Thyme, bay leaf, parsley"],
  steps: ["Soften onion, leek, carrot and celery.", "Add stock, herbs and whole chicken pieces; simmer 30 minutes.", "Shred chicken and return to the pot. Season."],
  kids: "Add egg noodles or small pasta to their bowls; serve with bread."
},
{
  name: "Thai Green Chicken Curry", cuisine: "Asian",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 380, protein: 36, carbs: 10, tags: [],
  ingredients: ["600 g chicken breast or thigh", "2–3 tbsp green curry paste", "400 ml light coconut milk", "Green beans, zucchini, bell pepper", "1 tbsp fish sauce", "Lime, Thai basil"],
  steps: ["Fry curry paste 1 minute.", "Add chicken and brown.", "Add coconut milk and vegetables; simmer 15 minutes.", "Season with fish sauce and lime; add basil."],
  kids: "Serve with jasmine rice."
},
{
  name: "Beef Meatballs in Tomato Sauce", cuisine: "Italian",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 380, protein: 32, carbs: 9, tags: ["Family favourite", "Freezes well"],
  ingredients: ["500 g lean beef mince", "1 egg", "3 tbsp almond flour", "30 g parmesan", "2 garlic cloves", "1 jar passata (700 g)", "Basil"],
  steps: ["Mix mince, egg, almond flour, parmesan and 1 garlic clove; roll 20 meatballs.", "Brown in a pan.", "Add passata and remaining garlic; simmer 20 minutes.", "Finish with basil."],
  kids: "Serve with spaghetti or mashed potatoes."
},
{
  name: "Swedish Fish Gratin with Cauli Mash", cuisine: "Swedish",
  meal: "main", speed: "normal", time: 45, servings: 4,
  kcal: 380, protein: 40, carbs: 12, tags: ["Fish", "Swedish classic"],
  ingredients: ["600 g cod or pollock", "200 g shrimp", "200 ml light crème fraiche", "1 tbsp Dijon", "Dill, lemon", "1 large cauliflower", "50 g grated cheese"],
  steps: ["Heat oven to 200°C. Place fish and shrimp in a dish.", "Mix crème fraiche, mustard, dill and lemon; pour over.", "Boil cauliflower, mash with a little of the crème fraiche, spread on top with cheese.", "Bake 25 minutes."],
  kids: "Make a small dish with potato mash topping, or serve with boiled potatoes."
},
{
  name: "Chicken Fajita Traybake", cuisine: "Mexican",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 340, protein: 38, carbs: 12, tags: ["One tray", "Family favourite"],
  ingredients: ["700 g chicken breast strips", "3 bell peppers", "2 red onions", "2 tsp each cumin, paprika; 1 tsp garlic powder, oregano", "1 tbsp olive oil", "Lime, Greek yogurt, salsa"],
  steps: ["Heat oven to 220°C.", "Toss chicken and sliced vegetables with oil and spices on a tray.", "Roast 20–25 minutes.", "Serve with lime, yogurt and salsa over lettuce."],
  kids: "Serve in warm tortillas with avocado and cheese."
},
{
  name: "Slow Beef Stew", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 150, servings: 5,
  kcal: 420, protein: 40, carbs: 14, tags: ["Weekend", "Freezes well"],
  ingredients: ["1 kg stewing beef, cubed", "2 onions, 3 carrots, 2 celery sticks", "250 g mushrooms", "2 tbsp tomato paste", "750 ml beef stock", "Thyme, bay leaves"],
  steps: ["Brown beef in batches.", "Soften onion, carrot and celery; add tomato paste.", "Return beef, add stock and herbs; simmer covered 2 hours (or slow cooker 6–8 h).", "Add mushrooms for the last 30 minutes."],
  kids: "Serve with mashed or boiled potatoes and bread."
},
{
  name: "Zucchini Lasagna", cuisine: "Italian",
  meal: "main", speed: "normal", time: 70, servings: 6,
  kcal: 380, protein: 36, carbs: 12, tags: ["Weekend", "Freezes well"],
  ingredients: ["4 large zucchini, sliced lengthways", "600 g lean beef or turkey mince", "1 onion, 2 garlic cloves", "700 g passata", "250 g ricotta + 1 egg", "150 g mozzarella", "Oregano, basil"],
  steps: ["Salt zucchini slices 15 minutes, then pat dry.", "Make a meat sauce with mince, onion, garlic, passata and herbs; simmer 15 minutes.", "Layer zucchini, sauce and ricotta mix; top with mozzarella.", "Bake at 190°C for 40 minutes; rest 10 minutes."],
  kids: "Build a small lasagna with regular pasta sheets alongside in the oven."
},
{
  name: "Cheesy Chicken Broccoli Bake", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 380, protein: 44, carbs: 7, tags: ["Family favourite"],
  ingredients: ["700 g chicken breast, cubed", "2 heads broccoli", "150 g light cream cheese", "100 ml milk", "1 tsp Dijon", "80 g grated cheese"],
  steps: ["Heat oven to 200°C. Brown chicken briefly.", "Put chicken and broccoli in a dish.", "Melt cream cheese with milk and mustard; pour over.", "Top with cheese; bake 25 minutes."],
  kids: "Serve with pasta or rice."
},
{
  name: "Herb-Crusted Cod & Asparagus", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 30, servings: 4,
  kcal: 300, protein: 38, carbs: 6, tags: ["Fish", "Light"],
  ingredients: ["4 cod fillets", "40 g almond flour", "20 g parmesan", "Parsley, lemon zest, 1 garlic clove", "1 tbsp olive oil", "2 bunches asparagus"],
  steps: ["Heat oven to 200°C.", "Mix almond flour, parmesan, herbs, zest, garlic and oil.", "Press onto cod; add asparagus to the tray.", "Bake 15–18 minutes."],
  kids: "Serve with potatoes or rice."
},
{
  name: "Cauliflower Shepherd's Pie", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 60, servings: 5,
  kcal: 400, protein: 32, carbs: 14, tags: ["Freezes well"],
  ingredients: ["600 g lamb or beef mince", "1 onion, 2 carrots, 2 celery sticks", "2 tbsp tomato paste", "300 ml stock", "Thyme", "1 large cauliflower", "60 g grated cheese"],
  steps: ["Brown mince with vegetables; add paste, stock and thyme; simmer 20 minutes.", "Boil and mash cauliflower with a little butter and salt.", "Spread mince in a dish, top with mash and cheese.", "Bake at 200°C for 25 minutes."],
  kids: "Top their small dish with potato mash."
},
{
  name: "Moroccan Lemon & Olive Chicken", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 50, servings: 4,
  kcal: 380, protein: 38, carbs: 9, tags: ["One pot"],
  ingredients: ["8 chicken thighs (skinless)", "1 onion", "3 garlic cloves", "1 tsp each cumin, ginger, turmeric, cinnamon", "1 preserved or fresh lemon", "100 g green olives", "300 ml stock", "Coriander"],
  steps: ["Brown chicken; set aside.", "Soften onion, garlic and spices.", "Return chicken with lemon, olives and stock; simmer covered 30 minutes.", "Finish with coriander."],
  kids: "Serve with couscous tossed in olive oil."
},
{
  name: "Cabbage Pudding (Kålpudding)", cuisine: "Swedish",
  meal: "main", speed: "normal", time: 75, servings: 5,
  kcal: 360, protein: 28, carbs: 14, tags: ["Swedish classic"],
  ingredients: ["1 white cabbage, shredded", "600 g beef mince", "1 egg", "1 onion", "200 ml milk", "1 tsp allspice", "1 tbsp soy sauce"],
  steps: ["Fry cabbage in a little oil until golden (add 1 tsp soy for colour).", "Mix mince with egg, onion, milk, allspice and salt.", "Layer cabbage and mince in a dish, finishing with cabbage.", "Bake at 200°C for 45 minutes."],
  kids: "Serve with boiled potatoes, cream sauce and lingonberries."
},
{
  name: "Swedish Meatballs with Cauli Mash", cuisine: "Swedish",
  meal: "main", speed: "normal", time: 45, servings: 4,
  kcal: 430, protein: 34, carbs: 12, tags: ["Swedish classic", "Family favourite"],
  ingredients: ["500 g beef mince", "1 egg", "1 small onion, grated", "50 ml milk", "Allspice, salt", "Sauce: 300 ml beef stock, 100 ml light cream, 1 tsp soy", "1 large cauliflower"],
  steps: ["Mix mince, egg, onion, milk and spices; roll small meatballs.", "Fry until browned and cooked.", "Add stock, cream and soy to the pan; reduce 5 minutes.", "Serve with cauliflower mash."],
  kids: "Serve with potato mash and lingonberry jam."
},
{
  name: "Beef & Feta Zucchini Boats", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 330, protein: 28, carbs: 10, tags: [],
  ingredients: ["4 zucchini, halved lengthways", "400 g lean beef mince", "1 onion, 2 garlic cloves", "200 g chopped tomatoes", "60 g feta", "Mint or oregano"],
  steps: ["Scoop out zucchini centres and chop the flesh.", "Brown mince with onion, garlic and zucchini flesh; add tomatoes.", "Fill boats, top with feta.", "Bake at 200°C for 25 minutes."],
  kids: "Serve with rice or bread."
},
{
  name: "Paprika Drumsticks & Yogurt Slaw", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 50, servings: 4,
  kcal: 380, protein: 36, carbs: 8, tags: ["Family favourite", "Budget"],
  ingredients: ["10 chicken drumsticks", "2 tsp smoked paprika, 1 tsp garlic powder", "1 tbsp olive oil", "Slaw: ¼ white cabbage, 1 carrot, 150 g Greek yogurt, 1 tsp mustard, lemon"],
  steps: ["Heat oven to 210°C.", "Toss drumsticks with oil and spices; roast 40 minutes.", "Mix slaw ingredients."],
  kids: "Serve with oven fries or corn on the cob."
},
{
  name: "Greek Shrimp Saganaki", cuisine: "Mediterranean",
  meal: "main", speed: "normal", time: 30, servings: 3,
  kcal: 330, protein: 32, carbs: 10, tags: ["Seafood"],
  ingredients: ["500 g shrimp", "1 onion, 2 garlic cloves", "1 can chopped tomatoes", "1 tsp oregano, chili flakes", "100 g feta", "1 tbsp olive oil", "Parsley"],
  steps: ["Soften onion and garlic in oil.", "Add tomatoes and oregano; simmer 10 minutes.", "Add shrimp, crumble feta on top; bake at 200°C for 10 minutes."],
  kids: "Serve with orzo or crusty bread."
},
{
  name: "Turkey Veggie Meatloaf", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 60, servings: 5,
  kcal: 330, protein: 34, carbs: 6, tags: ["Meal prep"],
  ingredients: ["750 g turkey mince", "1 egg", "1 onion, 1 carrot, 1 zucchini (grated)", "2 tbsp almond flour", "1 tbsp tomato paste + 1 tsp Worcestershire", "Thyme"],
  steps: ["Heat oven to 190°C.", "Mix everything except tomato paste; shape a loaf in a tin.", "Brush with tomato paste mixed with Worcestershire.", "Bake 45 minutes."],
  kids: "Serve with mashed potatoes."
},
{
  name: "Herb Roast Chicken", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 90, servings: 5,
  kcal: 400, protein: 45, carbs: 5, tags: ["Weekend", "Uses leftovers"],
  ingredients: ["1 whole chicken (1.5–1.8 kg)", "1 lemon", "1 head garlic", "Rosemary, thyme", "Carrots, onions, celeriac"],
  steps: ["Heat oven to 200°C.", "Stuff chicken with lemon, garlic and herbs; season well.", "Roast on chopped vegetables about 75 minutes, until juices run clear.", "Rest 10 minutes. Leftovers make great breakfasts and salads."],
  kids: "Add potatoes to roast in olive oil around the chicken."
},
{
  name: "Low-Carb Taco Bake", cuisine: "Mexican",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 400, protein: 34, carbs: 8, tags: ["Family favourite"],
  ingredients: ["500 g lean beef mince", "Homemade taco spice (cumin, paprika, oregano, garlic, chili)", "2 bell peppers", "1 can chopped tomatoes", "4 eggs", "100 g grated cheese", "Greek yogurt, salsa"],
  steps: ["Brown mince with peppers and spices; add tomatoes and simmer 5 minutes.", "Spread in a dish; whisk eggs and pour over.", "Top with cheese and bake at 200°C for 20 minutes.", "Serve with yogurt and salsa."],
  kids: "Serve with tortilla chips, rice and avocado."
},
{
  name: "Creamy Cauliflower Chicken Soup", cuisine: "Everyday",
  meal: "main", speed: "normal", time: 40, servings: 4,
  kcal: 300, protein: 30, carbs: 10, tags: ["Soup"],
  ingredients: ["1 large cauliflower", "1 head broccoli", "1 onion, 2 garlic cloves", "1 litre chicken stock", "400 g cooked chicken, shredded", "100 ml light cooking cream"],
  steps: ["Soften onion and garlic.", "Add cauliflower, broccoli and stock; simmer 20 minutes.", "Blend smooth, add cream and chicken; heat through."],
  kids: "Serve with buttered bread or croutons."
},
{
  name: "Coconut Tomato Fish Curry", cuisine: "Asian",
  meal: "main", speed: "normal", time: 35, servings: 4,
  kcal: 330, protein: 34, carbs: 9, tags: ["Fish"],
  ingredients: ["600 g white fish (cod, pollock)", "1 onion, 2 garlic cloves, ginger", "2 tsp curry powder, ½ tsp turmeric", "1 can chopped tomatoes", "200 ml light coconut milk", "Spinach, coriander"],
  steps: ["Soften onion, garlic, ginger and spices.", "Add tomatoes and coconut milk; simmer 10 minutes.", "Add fish chunks; simmer gently 6–8 minutes.", "Stir in spinach and coriander."],
  kids: "Serve with basmati rice."
},
{
  name: "Sticky Sesame Salmon & Cabbage", cuisine: "Asian",
  meal: "main", speed: "normal", time: 30, servings: 4,
  kcal: 400, protein: 34, carbs: 9, tags: ["Fish", "Omega-3"],
  ingredients: ["4 salmon fillets", "Sauce: 3 tbsp soy, 1 tbsp rice vinegar, 1 tsp grated ginger, 1 garlic clove, sweetener to taste", "½ pointed cabbage, shredded", "Sesame seeds, spring onion"],
  steps: ["Marinate salmon in half the sauce 10 minutes.", "Bake at 200°C for 12–15 minutes.", "Stir-fry cabbage 3 minutes with the remaining sauce.", "Serve topped with sesame and spring onion."],
  kids: "Serve with rice; a little honey on their salmon is fine."
}
];
