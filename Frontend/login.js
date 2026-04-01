document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        message.style.color = "red";
        message.textContent = "Invalid credentials";
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    message.style.color = "green";
    message.textContent = "Login successful";

    setTimeout(() => {
        if (user.role === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "dashboard.html";
        }
    }, 1000);
});