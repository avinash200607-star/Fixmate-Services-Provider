// CHECK LOGIN
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "login.html";
    throw new Error("User not logged in");
}

// SERVICES DATA
let services = [
    { name: "Plumber", price: 500, img: "images/plumber.jpg" },
    { name: "Electrician", price: 400, img: "images/electrician.jpg" },
    { name: "AC Repair", price: 800, img: "images/ac.jpg" },
    { name: "Carpenter", price: 600, img: "images/carpenter.jpg" },
    { name: "Cleaning", price: 300, img: "images/cleaning.jpg" },
    { name: "Pest Control", price: 900, img: "images/pest.jpg" },
    { name: "Salon at Home", price: 1000, img: "images/salon.jpg" },
    { name: "Home Painting", price: 1200, img: "images/painting.jpg" }
];

// GET CONTAINER
let container = document.querySelector(".services-container");

if (!container) {
    console.error("services-container not found");
} else {

    // CLEAR ONLY OLD CARDS (KEEP HEADING SAFE)
    container.querySelectorAll(".service-card").forEach(card => card.remove());

    // LOOP SERVICES
    services.forEach(service => {
        let div = document.createElement("div");
        div.className = "service-card";

        div.innerHTML = `
            <img src="${service.img}" alt="${service.name}" 
                 onerror="this.src='https://via.placeholder.com/300x160'">
            <h3>${service.name}</h3>
            <p>Price: ₹${service.price}</p>
            <button class="btn">Book Now</button>
        `;

        // EVENT (CLEAN WAY)
        div.querySelector("button").addEventListener("click", function () {
            bookService(service.name);
        });

        // IMPORTANT → DIRECT CHILD (GRID WORKS)
        container.appendChild(div);
    });
}

// BOOK FUNCTION
function bookService(serviceName) {
    localStorage.setItem("selectedService", serviceName);
    window.location.href = "booking.html";
}