const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');  // Necesitamos este módulo para interactuar con FTP

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración del servidor FTP
const FTP_CONFIG = {
    host: "127.0.0.1",  // Aquí va la IP del servidor FTP
    user: "user1",       // Aquí va tu nombre de usuario FTP
    password: "1234", // Aquí va tu contraseña FTP
    secure: true,
    secureOptions: { rejectUnauthorized: false }, // Acepta certificados autofirmados
    port: 21,
};

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

// Ejemplo de cómo usar el FTP
app.get("/ftp-example", async (req, res) => {
    const client = new ftp.Client();

    try {
        // Conexión al servidor FTP
        await client.access(FTP_CONFIG);
        console.log("Conectado al servidor FTP");

        // Aquí puedes hacer operaciones con el servidor FTP, por ejemplo, listar archivos
        const fileList = await client.list();
        res.json(fileList); // Devuelve la lista de archivos en el directorio raíz del FTP

    } catch (err) {
        console.error("Error al acceder al servidor FTP:", err);
        res.status(500).json({ error: "Error al acceder al servidor FTP." });
    } finally {
        client.close();
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
