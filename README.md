# 🍽️ MealDB Finder

A lightweight Flask web app that lets you discover recipes by ingredient. Search for a main ingredient, browse matching meals, and view full recipe details — including ingredients, instructions, cuisine origin, and a photo — all in a modal overlay. Powered by the [TheMealDB](https://www.themealdb.com/) free public API.

---

## Features

- **Ingredient search** — type any main ingredient and get a grid of matching meals
- **Meal cards** — each result displays the dish name, thumbnail image, and a "View Recipe" button
- **Recipe modal** — click a meal to open a full recipe overlay with ingredients, step-by-step instructions, and cuisine origin
- **JSON API** — clean Flask endpoints that can be consumed by any frontend

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python 3, Flask |
| HTTP Client | Requests |
| Data Source | TheMealDB API (free tier) |
| Frontend | Vanilla HTML, CSS, JavaScript |

---

## Project Structure

```
mealPlanner/
├── app.py               # Flask app — routes and API logic
├── templates/
│   └── index.html       # Search UI, meal cards, and recipe modal
├── static/
│   └── style.css        # Stylesheet
├── venv/                # Python virtual environment
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

- Favourite / saved meals list
- Stored calendar functionality
- Error handling and user-facing error messages
- Mobile-responsive layout