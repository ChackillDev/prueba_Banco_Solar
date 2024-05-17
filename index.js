const express = require('express');
const { insertar, eliminar, leer, editar } = require('./busqueda_Us.js');
const { nueva_Transf, leer_Transf } = require('./busqueda_Tranf.js');
const app = express();

const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/index.html")
});

app.post("/usuario", async (req, res) => {
    try {
        const { nombre, balance } = req.body;

        const result = await insertar(nombre, balance);
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json(error);
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const result = await leer();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
});

app.put("/usuario", async (req, res) => {
    try {
        const { id } = req.query;
        const { nombre, balance } = req.body

        const result = await editar(id, nombre, balance);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
});

app.delete("/usuario", async (req, res) => {
    try {
        const { id } = req.query
        const result = await eliminar(id)
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
});

app.post("/transferencia", async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body;
        const result = await nueva_Transf(emisor, receptor, (monto));
        res.json(result)
    } catch (error) {
        res.status(404).json(error);
    }
});

app.get("/transferencias", async (req, res) => {
    try {
        const result = await leer_Transf();
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error);
    }
});

app.listen(port, console.log(`El servidor esta disponible en : ${port}`));
