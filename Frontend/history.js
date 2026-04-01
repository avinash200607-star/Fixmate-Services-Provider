// CHECK LOGIN
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "login.html";
    throw new Error("User not logged in");
}

let historyList = document.getElementById("historyList");

// LOAD BOOKINGS
function loadHistory() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // FILTER ONLY CURRENT USER
    let userBookings = bookings.filter(b => b.user === user.email);

    historyList.innerHTML = "";

    if (userBookings.length === 0) {
        historyList.innerHTML = "<p>No bookings yet</p>";
        return;
    }

    userBookings.forEach(b => {
        let div = document.createElement("div");
        div.className = "service-card";

        div.innerHTML = `
            <h3>${b.service}</h3>
            <p>Date: ${b.date}</p>
            <p class="status ${b.status.toLowerCase()}">
                Status: ${b.status}
            </p>
        `;

        historyList.appendChild(div);
    });
}

// BACK BUTTON
function goBack() {
    window.location.href = "dashboard.html";
}

// INIT
loadHistory();