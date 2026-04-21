from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/favorites")
def favorites_page():
    return render_template("favorites.html")

@app.route("/search/<ingredient>")
def search(ingredient):

    res = requests.get(MEALDB_BASE + "/filter.php", params={"i": ingredient})
    data = res.json()

    if data["meals"] is None:
        return jsonify({"error": "No meals found with that ingredient."}), 404

    print(data)

    return jsonify(data)


@app.route("/recipe/<meal_id>")
def recipe(meal_id):
    res = requests.get(MEALDB_BASE + "/lookup.php", params={"i": meal_id})
    
    raw_data = res.json().get("meals")
    if not raw_data:
        return jsonify({"error": "Not found"}), 404
    
    meal = raw_data[0]

    print(raw_data)
    
    ingredients = []
    for i in range(1, 21):
        ing = meal.get(f"strIngredient{i}")
        meas = meal.get(f"strMeasure{i}")
        
        if ing:
            ingredients.append(f"{meas} {ing}")
        else:
            break

    response_data = {
        "name": meal["strMeal"],
        "location": meal["strArea"],
        "ingredients": ingredients,
        "instructions": meal["strInstructions"],
        "image": meal["strMealThumb"]
    }

    return jsonify(response_data)

if __name__ == "__main__":
    app.run(debug=True)
