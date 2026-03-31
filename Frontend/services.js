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

let container = document.querySelector(".services-container");

// Safety check
if (!container) {
    console.error("services-container not found");
} else {

    container.innerHTML = "<h2>Our Services</h2>";

    services.forEach(service => {
        let div = document.createElement("div");
        div.className = "service-card";

        div.innerHTML = `
            <img src="${service.img}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>Price: ₹${service.price}</p>
            <button class="btn" onclick="bookService('${service.name}')">Book Now</button>
        `;

        container.appendChild(div);
    });
}

function bookService(serviceName) {
    localStorage.setItem("selectedService", serviceName);
    window.location.href = "booking.html";
}