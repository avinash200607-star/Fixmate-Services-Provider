let service = localStorage.getItem("selectedService");
let user = JSON.parse(localStorage.getItem("loggedInUser"));
let message = document.getElementById("message");

// SHOW SELECTED SERVICE
let serviceName = document.getElementById("serviceName");

if (serviceName) {
    serviceName.textContent = "Service: " + service;
}

// SAFETY CHECK (IMPORTANT)
if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
}

// FORM SUBMIT
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let date = document.getElementById("date").value;

    if (!date) {
        message.style.color = "red";
        message.textContent = "Please select a date";
        return;
    }

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    let newBooking = {
        user: user.email,
        service: service,
        date: date,
        status: "Pending"
    };

    bookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    message.style.color = "green";
    message.textContent = "Booking Confirmed!";

    // CLEANUP
    localStorage.removeItem("selectedService");

    // FAST REDIRECT (BETTER UX)
    setTimeout(() => {
        window.location.href = "services.html";
    }, 1000);
});