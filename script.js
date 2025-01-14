// Función para mostrar la información de los personajes
function displayCharacterInfo(character) {
    const container = document.getElementById("character-list");
    const characterDiv = document.createElement("div");
    characterDiv.classList.add("character-container");

    let galleryHtml = "";
    character.gallery.forEach(imgUrl => {
        galleryHtml += `<img src="${imgUrl}" alt="${character.name}">`;
    });

    console.log(character);  // Verifica que se reciba correctamente cada personaje

    characterDiv.innerHTML = `
        <h2>${character.name} (${character.japaneseName})</h2>
        <p><strong>Tipo:</strong> ${character.type}</p>
        <p><strong>Ocupación:</strong> ${character.occupation}</p>
        <p><strong>Estado:</strong> ${character.status}</p>
        <p><strong>Raza:</strong> ${character.race}</p>
        <p><strong>Género:</strong> ${character.gender}</p>
        <p><strong>Edad:</strong> ${character.age}</p>
        <p><strong>Nacimiento:</strong> ${character.born}</p>
        <p><strong>Predecesores:</strong> ${character.predecessors.join(", ")}</p>
        <p><strong>Sucesores:</strong> ${character.successors.join(", ")}</p>
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

    container.appendChild(characterDiv);
}

// Función para obtener los personajes desde el backend
async function fetchPersonajes() {
    try {
        const response = await fetch("http://localhost:3000/personajes");

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const personajes = await response.json();

        // Log para verificar si los datos se cargan correctamente
        console.log("Datos recibidos del servidor:", personajes);

        // Verifica si los datos son un objeto
        if (typeof personajes === 'object' && personajes !== null) {
            // Itera sobre las claves del objeto
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
};

// Fetch and display personajes data on page load
fetchPersonajes();
