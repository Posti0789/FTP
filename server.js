const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ruta para devolver los personajes desde el archivo JSON
app.get("/personajes", (req, res) => {
    // Lee el archivo JSON
    fs.readFile(path.join(__dirname, 'personajes.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo JSON." });
        }

        // Parsea el archivo JSON y lo envía como respuesta
        const characterData = JSON.parse(data);
        res.json(characterData); // Envía los datos como JSON
    });
});

// Ruta para devolver los personajes filtrados por ID
app.get("/personajes/:id", (req, res) => {
    const characterId = req.params.id; // Obtiene el parámetro 'id' de la URL

    // Lee el archivo JSON
    fs.readFile(path.join(__dirname, 'personajes.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo JSON." });
        }

        // Parsea el archivo JSON
        const characterData = JSON.parse(data);

        // Verifica si el personaje con la ID proporcionada existe
        const character = characterData[characterId];

        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado." });
        }

        // Si el personaje existe, lo devuelve como respuesta
        res.json(character);
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
