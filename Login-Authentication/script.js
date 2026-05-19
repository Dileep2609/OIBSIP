const formTitle = document.getElementById("formTitle");
const authForm = document.getElementById("authForm");
const switchForm = document.getElementById("switchForm");
const switchMessage = document.getElementById("switchMessage");
const submitBtn = document.getElementById("submitBtn");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const logoutBtn = document.getElementById("logoutBtn");
const themeBtn = document.getElementById("themeBtn");
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");

let isLogin = true;

emailInput.style.display = "none";

switchForm.onclick = () => {
  isLogin = !isLogin;

  authForm.reset();

  message.innerText = "";

  if (isLogin) {
    formTitle.innerText = "Login";
    submitBtn.innerText = "Login";
    switchMessage.innerText = "Don't have an account?";
    switchForm.innerText = "Register";
    emailInput.style.display = "none";
  } else {
    formTitle.innerText = "Register";
    submitBtn.innerText = "Register";
    switchMessage.innerText = "Already have an account?";
    switchForm.innerText = "Login";
    emailInput.style.display = "block";
  }
};

authForm.onsubmit = (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (password.length < 6) {
    message.innerText = "Password must be at least 6 characters";
    message.style.color = "#ef4444";
    return;
  }

  if (isLogin) {
    const user = JSON.parse(localStorage.getItem(username));

    if (user && user.password === password) {
      message.innerText = "✅ Login Successfully";
      message.style.color = "#22c55e";

      logoutBtn.style.display = "block";

      authForm.reset();
    } else {
      message.innerText = "❌ Invalid Credentials";
      message.style.color = "#ef4444";
    }
  } else {
    const userData = {
      email,
      password,
    };

    localStorage.setItem(username, JSON.stringify(userData));

    message.innerText = "✅ Registration Successful";
    message.style.color = "#22c55e";

    authForm.reset();
  }
};

logoutBtn.onclick = () => {
  message.innerText = "⚠ Logged Out";
  message.style.color = "#f59e0b";

  logoutBtn.style.display = "none";
};

themeBtn.onclick = () => {
  document.body.classList.toggle("light-mode");
};

togglePassword.onclick = () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.innerText = "🙈";
  } else {
    passwordInput.type = "password";
    togglePassword.innerText = "👁";
  }
};
