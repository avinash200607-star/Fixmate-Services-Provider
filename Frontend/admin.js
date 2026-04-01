// 🔒 ADMIN PROTECTION (ONLY ONCE)
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user || user.role !== "admin") {
    alert("Access denied!");
    window.location.href = "login.html";
    throw new Error("Unauthorized");
}

// ELEMENTS
let bookingList = document.getElementById("bookingList");
let searchInput = document.getElementById("searchInput");

let currentFilter = "All";

// LOAD BOOKINGS
function loadBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // SAFE CHECK (prevents crash if HTML missing)
    let total = document.getElementById("totalCount");
    let pending = document.getElementById("pendingCount");
    let accepted = document.getElementById("acceptedCount");

    if (total) total.textContent = bookings.length;
    if (pending) pending.textContent = bookings.filter(b => b.status === "Pending").length;
    if (accepted) accepted.textContent = bookings.filter(b => b.status === "Accepted").length;

    displayBookings(bookings);
}

// DISPLAY BOOKINGS
function displayBookings(bookings) {
    if (!bookingList) return;

    bookingList.innerHTML = "";

    let searchText = searchInput ? searchInput.value.toLowerCase() : "";

    let filtered = bookings.filter(b => {
        let matchFilter = currentFilter === "All" || b.status === currentFilter;
        let matchSearch = b.user.toLowerCase().includes(searchText);
        return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
        bookingList.innerHTML = "<p>No bookings found</p>";
        return;
    }

    filtered.forEach((b, index) => {
        let div = document.createElement("div");
        div.className = "service-card";

        div.innerHTML = `
            <p><strong>User:</strong> ${b.user}</p>
            <p><strong>Service:</strong> ${b.service}</p>
            <p><strong>Date:</strong> ${b.date}</p>
            <p class="status ${b.status.toLowerCase()}">
                <strong>Status:</strong> ${b.status}
            </p>

            <div style="margin-top:10px;">
                <button class="btn accept-btn">Accept</button>
                <button class="reject-btn">Reject</button>
            </div>
        `;

        // ACCEPT
        div.querySelector(".accept-btn").addEventListener("click", () => {
            acceptBooking(index);
        });

        // DELETE
        div.querySelector(".reject-btn").addEventListener("click", () => {
            deleteBooking(index);
        });

        bookingList.appendChild(div);
    });
}

// FILTER
function filterBookings(type) {
    currentFilter = type;
    loadBookings();
}

// SEARCH
if (searchInput) {
    searchInput.addEventListener("input", loadBookings);
}

// ACCEPT BOOKING
function acceptBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (!bookings[index]) return;

    bookings[index].status = "Accepted";

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}

// DELETE BOOKING (NO HISTORY)
function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (!bookings[index]) return;

    bookings.splice(index, 1);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}

// INIT
loadBookings();