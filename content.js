function autoLogin(username, password) {
  const tryFill = () => {
      // Look for your ESP32 form elements
      const usernameInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');
      const submitButton = document.querySelector('button[type="submit"]');

      if (usernameInput && passwordInput && submitButton) {
          console.log("Found login form, filling credentials...");
          
          usernameInput.value = username;
          passwordInput.value = password;
          
          // Trigger events to ensure the form recognizes the input
          usernameInput.dispatchEvent(new Event("input", { bubbles: true }));
          passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
          
          // Submit the form
          setTimeout(() => {
              submitButton.click();
          }, 100);
      } else {
          console.log("Login form not found, retrying...");
          setTimeout(tryFill, 500);
      }
  };
  
  tryFill();
}

// Check if we're on the login page and auto-fill
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleLogin);
} else {
  handleLogin();
}

function handleLogin() {
  // Wait a bit for the page to fully load
  setTimeout(() => {
      const loginForm = document.querySelector('form[action="/login"]');
      if (loginForm) {
          console.log("Detected ESP32 login form");
          chrome.storage.local.get(["username", "password"], ({ username, password }) => {
              if (username && password) {
                  autoLogin(username, password);
              } else {
                  console.log("No credentials stored");
              }
          });
      }
  }, 500);
}