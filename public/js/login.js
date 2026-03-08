const form = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get values from form fields
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log("DATA: ", data);

  try {
    // send data to backend register route / source: mdn using the fetch api
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("RESULT: ", result);

    if (response.ok) {
      localStorage.setItem("token", result.token);
      window.location.replace("recipes.html");
    } else if (!response.ok) {
      // http error (server responded, but status is not 2xx)
      errorMsg.textContent = result.msg;
      errorMsg.style.color = "red";
    }
  } catch (error) {
    // Network error
    // Examples:
    // - No internet connection
    // - Server is down
    // - Wrong endpoint URL
    console.log("LOGGED ERROR: ", error);
    errorMsg.textContent = `Error message: ${error.message}`;
  }
});
