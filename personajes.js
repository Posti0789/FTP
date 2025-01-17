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

// Función para cargar los nombres de los personajes en los selectores
async function loadCharacterOptions() {
    try {
        const response = await fetch("http://localhost:3000/personajes");
        const personajes = await response.json();

        const character1Select = document.getElementById("character1");
        const character2Select = document.getElementById("character2");

        Object.keys(personajes).forEach(key => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");

            option1.value = key;
            option1.textContent = personajes[key].name;
            option2.value = key;
            option2.textContent = personajes[key].name;

            character1Select.appendChild(option1);
            character2Select.appendChild(option2);
        });
    } catch (error) {
        console.error("Error loading character options:", error);
    }
}

// Función para comparar personajes seleccionados
async function compareCharacters() {
    const char1Id = document.getElementById("character1").value;
    const char2Id = document.getElementById("character2").value;

    if (!char1Id || !char2Id) {
        alert("Por favor, selecciona dos personajes para comparar.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/personajes");
        const personajes = await response.json();

        const char1 = personajes[char1Id];
        const char2 = personajes[char2Id];

        displayComparison(char1, char2);
    } catch (error) {
        console.error("Error comparing characters:", error);
    }
}

// Función para mostrar la tabla de comparación
function displayComparison(char1, char2) {
    const comparisonResult = document.getElementById("comparison-result");
    comparisonResult.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Atributo</th>
                    <th>${char1.name}</th>
                    <th>${char2.name}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Tipo</td>
                    <td>${char1.type}</td>
                    <td>${char2.type}</td>
                </tr>
                <tr>
                    <td>Ocupación</td>
                    <td>${char1.occupation}</td>
                    <td>${char2.occupation}</td>
                </tr>
                <tr>
                    <td>Estado</td>
                    <td>${char1.status}</td>
                    <td>${char2.status}</td>
                </tr>
                <tr>
                    <td>Raza</td>
                    <td>${char1.race}</td>
                    <td>${char2.race}</td>
                </tr>
                <tr>
                    <td>Género</td>
                    <td>${char1.gender}</td>
                    <td>${char2.gender}</td>
                </tr>
                <tr>
                    <td>Altura</td>
                    <td>${char1.height}</td>
                    <td>${char2.height}</td>
                </tr>
                <tr>
                    <td>Peso</td>
                    <td>${char1.weight}</td>
                    <td>${char2.weight}</td>
                </tr>
            </tbody>
        </table>
    `;
}

// Eventos
document.getElementById("compare-btn").addEventListener("click", compareCharacters);
document.addEventListener("DOMContentLoaded", loadCharacterOptions);


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
