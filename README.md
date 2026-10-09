# Steady Plate

A phone-friendly recipe app with **182 diabetes-friendly meals**: low carb, high protein, moderate calories, and **no pork**. Every recipe has a **"For the kids"** tip showing how to add carbs and healthy fats on the side.

## What's inside

- **Breakfast** (66) and **Lunch & Dinner** (116), each marked **Fast** (about 20 min) or **Normal**
- Cuisines: **Persian** (24), **Mediterranean** (41), **Asian** (36), Mexican, Italian, Swedish and Everyday
- **Our recipes**: your 7 family dishes, with a low-carb version for adults and carbs for the kids
- Boiled-egg recipes: soft-boiled with asparagus, Swedish egg halves, soy-marinated eggs, egg curry and more
- **Servings** − / + on every recipe: amounts rescale (great for leftovers), the app remembers your number, and the shopping list uses it
- **Swap** button next to ingredients with good alternatives (e.g. chicken → turkey or tofu, Greek yogurt → skyr or kvarg)
- **A photo for every dish** (bundled in `photos-1.js` … `photos-4.js`), plus **Use my own photo** on any recipe to replace it with yours
- **Favourites** (heart) and **Pinned** (keeps a recipe at the top)
- **My week**: one tap suggests 7 days of breakfast, lunch and dinner, mixing cuisines and favouring your favourites
- **Shopping list**: fill it from your week or one recipe, add your own items, tick off, copy

Favourites, plan, list and photos are saved on the phone you use.

## Put it on GitHub Pages (free website)

1. Create a new repository on github.com, e.g. `steady-plate` (Public).
2. Unzip, then click **Add file → Upload files**, select **all the files** (about 20, no folders) and click **Commit changes**. Works from a phone too.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, **Save**.
4. After a minute it's live at `https://YOUR-USERNAME.github.io/steady-plate/`.

**Install on your phone:** open the link, then *Share → Add to Home Screen* (iPhone) or *⋮ → Install app* (Android). Works offline after the first visit.

## Editing

| File | What's in it |
|---|---|
| `recipes.js`, `recipes-more.js`, `recipes-extra.js` | The recipes |
| `recipes-family.js` | Your own family recipes |
| `swaps.js` | Ingredient alternatives for the Swap button |
| `app.js` | Favourites, pins, week planner, shopping list, photos |
| `photos-1.js` … `photos-4.js` | All dish pictures, bundled into four files |
| `index.html` | Layout and styles |
| `manifest.json`, `sw.js` | Home-screen install and offline use |
| `logo.png`, `icon-*.png`, `apple-touch-icon.png`, `favicon-32.png` | Your logo and app icon in different sizes |

- Add a recipe: copy any block in a recipes file, change the text, save. Add `family: true` to put it under *Our recipes*.
- Want your own photo for everyone (not just your phone)? Upload it to the repo, e.g. `kabab.jpg`, and add `image: "kabab.jpg"` to that recipe. It replaces the bundled picture.
- After any change, bump `steady-plate-v9` in `sw.js` (to `v10`, `v11`…) so installed phones update.

## Good to know

Nutrition numbers are rough estimates per adult serving. If you take insulin or other glucose-lowering medicine, talk with your diabetes team before cutting carbs a lot, since doses may need adjusting. Check sausage casings and stock cubes are pork-free.
