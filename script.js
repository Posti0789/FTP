// Función para mostrar la información de los personajes
function displayCharacterInfo(character) {
    const container = document.getElementById("character-list");
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character-container");

    characterDiv.innerHTML = `
    <h2>${character.name} (${character.japaneseName})</h2>
    <p><strong>Tipo:</strong> ${character.type}</p>
    <p><strong>Ocupación:</strong> ${character.occupation}</p>
    <a href="personaje.html?id=${encodeURIComponent(character.name)}" class="view-details">
        Ver detalles
    </a>
    `;

    container.appendChild(characterDiv);
}

// Función para obtener los personajes desde el backend
async function fetchPersonajes() {
    try {
        const response = await fetch("http://localhost:3000/personajes");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const personajes = await response.json();
        console.log("Datos recibidos del servidor:", personajes);

        if (typeof personajes === 'object' && personajes !== null) {
            for (const key in personajes) {
                if (personajes.hasOwnProperty(key)) {
                    const personaje = personajes[key];
                    displayCharacterInfo(personaje);
                }
            }
        } else {
            console.error("La respuesta no es un objeto.");
        }
    } catch (error) {
        console.error("Error fetching personajes data:", error);
    }
}

// Fetch and display personajes data on page load
fetchPersonajes();
