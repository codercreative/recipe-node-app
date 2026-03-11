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

      showToast("Login successful", 1800);

      setTimeout(() => {
        window.location.replace("recipes.html");
      }, 2000);
    } else if (!response.ok) {
      // http error (server responded, but status is not 2xx)
      showToast(result.msg || "Login failed. Please check your credentials");
    }
  } catch (error) {
    // Network error
    // Examples:
    // - No internet connection
    // - Server is down
    // - Wrong endpoint URL
    console.log("LOGGED ERROR: ", error);
    showToast(`Network error: ${error.message}`);
  }
});

// ==========TOAST NOTIFICATION HELPER FUNCTION ==========

function showToast(message, duration = 7000) {
  const toast = document.getElementById("toast-notification");
  toast.textContent = message;
  toast.classList.add("toast-visible");

  setTimeout(() => {
    toast.classList.remove("toast-visible");
  }, duration);
}
