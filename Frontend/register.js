document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    // Reset message
    message.textContent = "";
    message.className = "";

    // Empty check
    if (name === "" || email === "" || password === "") {
        message.textContent = "All fields are required";
        message.className = "error";
        return;
    }

    // Email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        message.textContent = "Invalid email format";
        message.className = "error";
        return;
    }

    // Password validation
    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters";
        message.className = "error";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Duplicate email check
    let existingUser = users.find(u => u.email === email);
    if (existingUser) {
        message.textContent = "Email already registered";
        message.className = "error";
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password // demo only
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Success
    message.textContent = "Registration successful! Redirecting...";
    message.className = "success";

    document.getElementById("registerForm").reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});