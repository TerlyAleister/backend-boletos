const express = require("express");
const router = express.Router();
const db = require("../../db");

// Obtener todos los eventos
router.get("/", (req, res) => {
  db.query("SELECT * FROM eventos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Crear un nuevo evento
router.post("/crear", (req, res) => {
  const { nombre, fecha, ubicacion } = req.body;
  db.query(
    "INSERT INTO eventos (nombre, fecha, ubicacion) VALUES (?, ?, ?)",
    [nombre, fecha, ubicacion],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ mensaje: "Evento creado" });
    }
  );
});

// Eliminar evento
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM eventos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ mensaje: "Evento eliminado" });
  });
});

module.exports = router;
