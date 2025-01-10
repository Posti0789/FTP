async function fetchHotels() {
    try {
        const response = await fetch("http://localhost:3000/hotels");
        const hotels = await response.json();

        const tableBody = document.getElementById("hotelsTable").querySelector("tbody");

        hotels.forEach(hotel => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${hotel.name[0]}</td>
                <td>${hotel.location[0]}</td>
                <td>${hotel.rating[0]}</td>
                <td>${hotel.rooms[0]}</td>
                <td>${hotel.price[0]}</td>
                <td>${hotel.amenities[0]}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching hotel data:", error);
    }
}

// Fetch and display hotels data on page load
fetchHotels();