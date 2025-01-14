const express = require('express');
const cors = require('cors');  // Importa el paquete cors
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Ruta para devolver los personajes desde el archivo JSON
app.get("/personajes", (req, res) => {
    // Lee el archivo JSON
    fs.readFile(path.join(__dirname, 'personajes.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al leer el archivo JSON." });
        }
        
        // Parsea el archivo JSON y lo envía como respuesta
        const characterData = JSON.parse(data);
        res.json(characterData);  // Envía los datos como JSON
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
