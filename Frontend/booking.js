document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let date = document.getElementById("date").value;
    let message = document.getElementById("message");

    let service = localStorage.getItem("selectedService");
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

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
    message.textContent = "Booking Confirmed! Redirecting...";

    localStorage.removeItem("selectedService");

    setTimeout(() => {
        window.location.href = "services.html";
    }, 1500);
});