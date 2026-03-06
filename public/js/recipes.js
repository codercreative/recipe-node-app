const form = document.getElementById("add-recipe-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("the add a recipe form works!");
  // get values from form fields
  const data = {
    title: document.getElementById("title").value,
    ingredients: document.getElementById("ingredients").value,
    instructions: document.getElementById("instructions").value,
    prepTime: document.getElementById("prep-time").value,
    ovenTime: document.getElementById("oven-time").value,
  };

  console.log("DATA: ", data);

  try {
    // send data to backend register route / source: mdn using the fetch api
    const response = await fetch("/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("RESULT: ", result);

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
