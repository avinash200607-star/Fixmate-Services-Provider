// Check login
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "login.html";
}

// Show user name
document.getElementById("welcomeText").textContent = "Welcome " + user.name;

// Go to services page
document.getElementById("servicesBtn").addEventListener("click", function() {
    window.location.href = "services.html";
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});