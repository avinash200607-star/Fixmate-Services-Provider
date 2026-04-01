document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim().toLowerCase();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    message.textContent = "";

    if (!name || !email || !password) {
        message.textContent = "All fields required";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ❗ ADMIN CREATION (ONLY YOU KNOW THIS EMAIL)
    let role = (email === "admin@fixmate.com") ? "admin" : "user";

    let existingUser = users.find(u => u.email === email);

    if (existingUser) {
        message.textContent = "Email already exists";
        return;
    }

    let user = {
        name,
        email,
        password,
        role
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Registered successfully";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
});