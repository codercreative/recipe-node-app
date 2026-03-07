// ==========ADD A RECIPE FORM==========
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

// ==========GETTNG RECIPES==========

const recipeCardsContainer = document.getElementById("recipe-cards-container");

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

async function showRecipes() {
  const recipeCardsContainer = document.getElementById(
    "recipe-cards-container"
  );

  const recipesArray = await getRecipes();

  recipesArray.forEach((recipe) => {
    // article
    const article = document.createElement("article");
    article.classList.add("recipe-article");

    // title
    const title = document.createElement("h3");
    title.textContent = recipe.title;
    article.appendChild(title);

    // ingredients
    const ingredientsList = document.createElement("ul");
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    article.appendChild(ingredientsList);

    // instructions
    const instructionsList = document.createElement("ul");
    recipe.instructions.forEach((instruction) => {
      const li = document.createElement("li");
      li.textContent = instruction;
      instructionsList.appendChild(li);
    });
    article.appendChild(instructionsList);

    // preparation
    const preparationSpan = document.createElement("span");
    preparationSpan.textContent = `Prep time ${recipe.preparation} min`;
    article.appendChild(preparationSpan);

    // temp
    const tempSpan = document.createElement("span");
    tempSpan.textContent = `Oven temp ${recipe.temp} F`;
    article.appendChild(tempSpan);

    recipeCardsContainer.appendChild(article);

    // container for buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("btn-container");

    // edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    // append buttons to button container
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(deleteBtn);

    article.appendChild(buttonContainer);
  });
}

showRecipes();
