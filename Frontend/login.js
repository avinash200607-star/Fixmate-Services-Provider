document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {

        // 🔥 THIS IS THE IMPORTANT LINE
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);

    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password";
    }
});