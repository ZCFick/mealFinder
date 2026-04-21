function favorite(btn, id) {
    const isPressed = btn.getAttribute('aria-pressed') === 'true';
    if (isPressed) {
        removeFromFavorites(id);
    } else {
        addToFavorites(id);
    }

    btn.setAttribute('aria-pressed', !isPressed);
  }

  function addToFavorites(id) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const normalizedId = id.toString();
    if (!favs.includes(normalizedId)) {
      favs.push(normalizedId);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
  }

  function removeFromFavorites(id) {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = favs.filter(ids => ids !== id.toString());
    localStorage.setItem("favorites", JSON.stringify(updated));
  }
  async function openRecipe(id) {
    const res = await fetch(`/recipe/${id}`);
    const data = await res.json();
    const body = document.getElementById("modal-body");

    const ingredientList = document.createElement("ul");

    data.ingredients.forEach(ingred => {
      const li = document.createElement("li");
      li.textContent = ingred;
      ingredientList.appendChild(li);
    });

    const closeBtn = document.createElement("span");
    closeBtn.id = "close-button";
    closeBtn.textContent = "\u00D7";
    closeBtn.addEventListener("click", closeModal);

    const img = document.createElement("img");
    img.src = data.image;
    img.alt = "Image Not Available";
    img.className = "modal-image";

    const h2 = document.createElement("h2");
    h2.textContent = `${data.name} (${data.location})`;

    const ingredientHeader = document.createElement("h3");
    ingredientHeader.textContent = "Ingredient List";

    const instructionsHeader = document.createElement("h3");
    instructionsHeader.textContent = "Instructions";

    const instructions = document.createElement("p");
    instructions.textContent = data.instructions;

    body.replaceChildren(closeBtn, img, h2, ingredientHeader, ingredientList, instructionsHeader, instructions);

    const modal = document.getElementById("recipe-modal");

    modal.style.display = 'flex';
  }

  function closeModal() {
    const modal = document.getElementById("recipe-modal");
  
    modal.style.display = 'none';
  }

  window.favorite = favorite;
  window.addToFavorites = addToFavorites;
  window.removeFromFavorites = removeFromFavorites;
  window.openRecipe = openRecipe;
  window.closeModal = closeModal;