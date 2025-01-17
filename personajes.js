// Función para resaltar coincidencias en la página actual
function highlightSearch(query) {
    const container = document.getElementById("character-details");
    const elements = container.querySelectorAll("p, h2, h3"); // Elementos donde buscar coincidencias

    elements.forEach(element => {
        const originalText = element.textContent || element.innerText;
        if (query) {
            const regex = new RegExp(`(${query})`, "gi");
            element.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
        } else {
            element.innerHTML = originalText; // Restaurar texto original si no hay búsqueda
        }
    });
}

// Evento para la búsqueda en tiempo real
document.getElementById("search-input").addEventListener("input", function () {
    const query = this.value.trim();
    highlightSearch(query);
});

// Función para obtener el parámetro de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Función para mostrar la información del personaje
function displayCharacterDetails(character) {
    const container = document.getElementById("character-details");
    let galleryHtml = "";

    character.gallery.forEach(imgUrl => {
        galleryHtml += `<img src="${imgUrl}" alt="${character.name}">`;
    });

    container.innerHTML = `
        <h2>${character.name} (${character.japaneseName})</h2>
        <p><strong>Tipo:</strong> ${character.type}</p>
        <p><strong>Ocupación:</strong> ${character.occupation}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Raza:</strong> ${character.race}</p>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Edad:</strong> ${character.age}</p>
        <p><strong>Nacimiento:</strong> ${character.born}</p>
        <p><strong>Predecesores:</strong> ${Array.isArray(character.predecessors) ? character.predecessors.join(", ") : "No tiene"}</p>
        <p><strong>Sucesores:</strong> ${Array.isArray(character.successors) ? character.successors.join(", ") : "No tiene"}</p>
        <p><strong>Color de cabello:</strong> ${character.hairColor}</p>
        <p><strong>Color de ojos:</strong> ${character.eyeColor}</p>
        <p><strong>Altura:</strong> ${character.height}</p>
        <p><strong>Peso:</strong> ${character.weight}</p>
        <p><strong>Voces:</strong> ${character.voiceActors.english}, ${character.voiceActors.japanese}, ${character.voiceActors.portuguese}</p>
        <h3>Galería</h3>
        <div class="gallery">${galleryHtml}</div>
        <h3>Descripción</h3>
        <p>${character.description}</p>
        <h3>Jugabilidad</h3>
        <p>${character.gameplay}</p>
        <h3>Apariencia</h3>
        <p>${character.appearanceDetails}</p>
        <h3>Personalidad</h3>
        <p>${character.personality}</p>
    `;
}

// Fetch and display character details on page load
async function fetchCharacterDetails() {
    const characterName = getQueryParam("id");
    if (!characterName) return;

    try {
        const response = await fetch("http://localhost:3000/personajes");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const personajes = await response.json();
        const character = personajes[characterName];

        if (character) {
            displayCharacterDetails(character);
        } else {
            console.error("No se encontró información para el personaje:", characterName);
        }
    } catch (error) {
        console.error("Error fetching character details:", error);
    }
}

fetchCharacterDetails();
