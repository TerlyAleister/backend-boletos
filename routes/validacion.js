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

// ✅ Ruta para validar un boleto por QR
router.post("/validar", (req, res) => {
  const { qrCode } = req.body;

  if (!qrCode) {
    return res.status(400).json({ error: "Código QR requerido" });
  }

  const sql = `SELECT * FROM boletos WHERE codigo_qr = ?`;
  db.query(sql, [qrCode], (err, results) => {
    if (err) {
      console.error("Error en la validación:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Boleto no válido" });
    }

    const boleto = results[0];
    if (boleto.validado) {
      return res.status(409).json({ error: "Boleto ya utilizado" });
    }

    // Marcar boleto como validado
    const updateSql = `UPDATE boletos SET validado = 1 WHERE id = ?`;
    db.query(updateSql, [boleto.id], (err) => {
      if (err) {
        console.error("Error al actualizar validación:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      res.json({ mensaje: "Boleto válido", boleto });
    });
  });
});

module.exports = router;
