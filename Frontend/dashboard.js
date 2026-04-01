// CHECK LOGIN
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "login.html";
}

// WELCOME TEXT
document.getElementById("welcomeText").textContent = "Welcome " + user.name;

// SERVICES
document.getElementById("servicesBtn").addEventListener("click", function() {
    window.location.href = "services.html";
});

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});

// 🔥 ADMIN BUTTON CONTROL (FIXED)
let adminBtn = document.getElementById("adminBtn");

// ALWAYS HIDE FIRST
if (adminBtn) {
    adminBtn.style.display = "none";
}

// SHOW ONLY IF ADMIN
if (user.role && user.role === "admin") {
    adminBtn.style.display = "block";

    adminBtn.addEventListener("click", function() {
        window.location.href = "admin.html";
    });
}