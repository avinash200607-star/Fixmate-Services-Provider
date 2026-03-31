let bookingList = document.getElementById("bookingList");

function loadBookings() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    bookingList.innerHTML = "";

    if (bookings.length === 0) {
        bookingList.innerHTML = "<p>No bookings found</p>";
        return;
    }

    bookings.forEach((b, index) => {
        let div = document.createElement("div");
        div.className = "service-card";

        div.innerHTML = `
            <p><strong>User:</strong> ${b.user}</p>
            <p><strong>Service:</strong> ${b.service}</p>
            <p><strong>Date:</strong> ${b.date}</p>
            <p><strong>Status:</strong> ${b.status}</p>

            <button class="btn" onclick="updateStatus(${index}, 'Accepted')">Accept</button>
            <button class="reject-btn" onclick="updateStatus(${index}, 'Rejected')">Reject</button>
        `;

        bookingList.appendChild(div);
    });
}

function updateStatus(index, status) {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (status === "Rejected") {
        bookings.splice(index, 1);
    } else {
        bookings[index].status = "Accepted";
    }

    localStorage.setItem("bookings", JSON.stringify(bookings));

    loadBookings();
}

// Load on start
loadBookings();