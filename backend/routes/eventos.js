const express = require("express");
const router = express.Router();
const db = require("../db"); // Importa la conexión a la base de datos

// Obtener eventos disponibles
router.get("/", (req, res) => {
  db.query("SELECT * FROM eventos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
