const modal = document.getElementById("modal-overlay");
// need to "hold" the recipe id between edit and submit events
let editingRecipeId = null;

// ========== POST "ADD RECIPE" ==========
const form = document.getElementById("add-recipe-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("the add a recipe form works!");
  // get values from form fields
  const data = {
    title: document.getElementById("title").value,
    ingredients: document
      .getElementById("ingredients")
      .value.split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== ""),
    instructions: document
      .getElementById("instructions")
      .value.split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== ""),
    preparation: Number(document.getElementById("preparation").value),
    temp: Number(document.getElementById("temp").value),
  };

  console.log("DATA: ", data);

  try {
    const token = localStorage.getItem("token");
    // send data to backend register route / source: mdn using the fetch api and headers adapted from Postman code > JavaScript fetch snippet
    const response = await fetch("/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    // const result = await response.json();
    // console.log("RESULT: ", result);

    if (response.ok) {
      window.location.replace("recipes.html");
    } else if (!response.ok) {
      // http error (server responded, but status is not 2xx)
      console.log("An error occurred");
    }
  } catch (error) {
    // Network error
    // Examples:
    // - No internet connection
    // - Server is down
    // - Wrong endpoint URL
    console.log("LOGGED ERROR: ", error);
  }
});

// ========== PATCH/UPDATE RECIPE" ==========
const editRecipeForm = document.getElementById("edit-recipe-form");

editRecipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("the PATCH recipe form works!");
  // get values from form fields
  const data = {
    title: document.getElementById("edit-title").value,
    ingredients: document
      .getElementById("edit-ingredients")
      .value.split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== ""),
    instructions: document
      .getElementById("edit-instructions")
      .value.split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== ""),
    preparation: Number(document.getElementById("edit-preparation").value),
    temp: Number(document.getElementById("edit-temp").value),
  };

  console.log("DATA: ", data);

  try {
    const token = localStorage.getItem("token");
    // send data to backend register route / source: mdn using the fetch api and headers adapted from Postman code > JavaScript fetch snippet
    const response = await fetch(`/recipes/${editingRecipeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    // const result = await response.json();
    // console.log("RESULT: ", result);

    if (response.ok) {
      window.location.replace("recipes.html");
    } else if (!response.ok) {
      // http error (server responded, but status is not 2xx)
      console.log("An error occurred");
    }
  } catch (error) {
    // Network error
    // Examples:
    // - No internet connection
    // - Server is down
    // - Wrong endpoint URL
    console.log("LOGGED ERROR: ", error);
  }
});

// ==========GET RECIPES==========

async function getRecipes() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const recipesArray = await response.json();
    console.log(recipesArray);
    return recipesArray;
  } catch (error) {
    console.log(error);
  }
}

// ==========EDIT BUTTON HELPER FUNCTION ==========

// delete function called inside showRecipes function
async function showValuesInEditForm(recipe, recipeId) {
  // recipe data here...

  editingRecipeId = recipeId;
  document.getElementById("edit-title").value = recipe.title;
  document.getElementById("edit-ingredients").value =
    recipe.ingredients.join("\n");
  document.getElementById("edit-instructions").value =
    recipe.instructions.join("\n");
  document.getElementById("edit-preparation").value = recipe.preparation;
  document.getElementById("edit-temp").value = recipe.temp;
}

// ==========DELETE BUTTON HELPER FUNCTION ==========

// delete function called inside showRecipes function
async function deleteRecipe(recipeId, recipeArticle) {
  try {
    const token = localStorage.getItem("token");
    // send data to backend register route / source: mdn using the fetch api and headers adapted from Postman code > JavaScript fetch snippet
    const response = await fetch(`/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      recipeArticle.remove();
    }
  } catch (error) {
    console.log("Delete error: ", error);
  }
}

// ==========SHOW RECIPES IN BROWSER ==========

async function showRecipes() {
  const recipeCardsContainer = document.getElementById(
    "recipe-cards-container"
  );
  //Reset container so recipes don't duplicate when rendering
  recipeCardsContainer.innerHTML = "";

  const recipesArray = await getRecipes();

  recipesArray.forEach((recipe) => {
    // article
    const article = document.createElement("article");
    article.classList.add("recipe-article");

    // title
    const title = document.createElement("h3");
    title.classList.add("saved-recipe-title");
    title.textContent = recipe.title;
    article.appendChild(title);

    // ingredients
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients:";
    ingredientsTitle.classList.add("ingredients-title");
    article.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    article.appendChild(ingredientsList);

    // instructions
    const instructionsTitle = document.createElement("h4");
    instructionsTitle.textContent = "Instructions:";
    instructionsTitle.classList.add("instructions-title");
    article.appendChild(instructionsTitle);

    const instructionsList = document.createElement("ul");
    recipe.instructions.forEach((instruction) => {
      const li = document.createElement("li");
      li.textContent = instruction;
      instructionsList.appendChild(li);
    });
    article.appendChild(instructionsList);

    // preparation
    const preparationSpan = document.createElement("span");
    preparationSpan.textContent = `Prep time: ${recipe.preparation} min.`;
    article.appendChild(preparationSpan);

    // temp
    const tempSpan = document.createElement("span");
    tempSpan.textContent = `Oven temp: ${recipe.temp} °F`;
    article.appendChild(tempSpan);

    recipeCardsContainer.appendChild(article);

    // container for buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");

    // edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
      // calling the editRecipe helper function
      showValuesInEditForm(recipe, recipe._id);
      modal.classList.remove("hidden");
    });

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      // calling the deleteRecipe helper function
      deleteRecipe(recipe._id, article);
    });

    // append buttons to button container
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    article.appendChild(buttonContainer);
  });
}

showRecipes();

// ========== LOG OFF BUTTON ==========

document.getElementById("logoff-btn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

// ========== EXIT / CANCLE EDIT RECIPE MODAL==========

document.getElementById("exit-btn").addEventListener("click", () => {
  modal.classList.add("hidden");
});
