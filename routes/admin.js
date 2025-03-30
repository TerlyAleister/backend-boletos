const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// ✅ Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "boletos",
});

// ✅ Obtener estadísticas de ventas
router.get("/estadisticas", (req, res) => {
  const sql = `
        SELECT e.nombre AS evento, COUNT(b.id) AS boletos_vendidos
        FROM eventos e
        LEFT JOIN boletos b ON e.id = b.evento_id
        GROUP BY e.id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error obteniendo estadísticas:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(results);
  });
});

// ✅ Listar todos los boletos vendidos
router.get("/boletos", (req, res) => {
  const sql = `
        SELECT b.id, e.nombre AS evento, b.usuario_email, b.asiento, b.validado 
        FROM boletos b
        JOIN eventos e ON b.evento_id = e.id
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error obteniendo boletos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(results);
  });
});

module.exports = router;
