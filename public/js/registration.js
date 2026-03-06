const form = document.getElementById("register-form");
const errorMsg = document.getElementById("error-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // get values from form fields
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log("DATA: ", data);

  try {
    // send data to backend register route / source: mdn using the fetch api
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("RESULT: ", result);

    if (response.ok) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("name", result.user.name);
      window.location.replace("login.html");
    } else if (!response.ok) {
      // http error (server responded, but status is not 2xx)
      errorMsg.textContent = result.msg;
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
