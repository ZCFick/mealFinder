# 🍽️ MealDB Finder

A lightweight Flask web app that lets you discover recipes by ingredient. Search for a main ingredient, browse matching meals, and view full recipe details — including ingredients, instructions, cuisine origin, and a photo — all in a modal overlay. Powered by the [TheMealDB](https://www.themealdb.com/) free public API.

---

## Features
- **Ingredient search** — type any main ingredient and get matching meals
- **Meal cards** — each result includes title, image, and actions
- **Recipe modal** — view ingredients, instructions, origin, and image
- **Favorites page** — save/remove meals using LocalStorage
- **Flask JSON API** — backend endpoints consumed by the frontend

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python 3, Flask |
| HTTP Client | Requests |
| Data Source | TheMealDB API |
| Frontend | Vanilla HTML, CSS, JavaScript |
| Storage | Browser LocalStorage (favorites) |

---

## Project Structure
```text
mealPlanner/
├── app.py                    # Flask routes and API proxy logic
├── requirements.txt          # Python dependencies
├── templates/
│   ├── index.html            # Search page + modal container
│   └── favorites.html        # Favorites page UI and client rendering
├── static/
│   ├── style.css             # App styling
│   └── utils.js              # Shared client utilities (favorites + modal)
├── __pycache__/              # Python bytecode cache
├── venv/                     # Local virtual environment
└── README.md
```

---

## How It Works

1. User types an ingredient (e.g. `chicken`) and submits the search form
2. The frontend calls `GET /search/chicken` on the Flask backend
3. Flask forwards the request to TheMealDB and returns a list of matching meals
4. JavaScript renders each meal as a card in the results grid
5. Clicking "View Recipe" calls `GET /recipe/<id>`, which fetches and parses full recipe details
6. The recipe is displayed in a modal overlay

---

## API Endpoints

### `GET /search/<ingredient>`
Returns meals that feature the given ingredient.

**Example:** `GET /search/beef`

```json
{
  "meals": [
    {
      "idMeal": "52772",
      "strMeal": "Beef and Mustard Pie",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/..."
    }
  ]
}
```

**No results:**
```json
{ "error": "No meals found with that ingredient." }
```

---

### `GET /recipe/<meal_id>`
Returns full recipe detail for a given meal ID.

**Example:** `GET /recipe/52772`

```json
{
  "name": "Beef and Mustard Pie",
  "location": "British",
  "ingredients": ["1kg Beef", "2 tbs Plain Flour", "..."],
  "instructions": "Preheat oven to 200C...",
  "image": "https://www.themealdb.com/images/media/meals/..."
}
```

---

## Planned Improvements

- Weekly calendar functionality
- Error handling and user-facing error messages
- Mobile-responsive layout