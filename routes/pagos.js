const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const mysql = require("mysql2");

// ✅ Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "boletos",
});

// ✅ Ruta para procesar el pago
router.post("/pago", async (req, res) => {
  const { monto, descripcion, token, eventoId, usuarioEmail, asiento } = req.body;

  if (!monto || !descripcion || !token || !eventoId || !usuarioEmail || !asiento) {
    return res.status(400).json({ error: "Datos de pago incompletos" });
  }

  try {
    // Procesar el pago con Stripe
    const charge = await stripe.charges.create({
      amount: monto * 100, // En centavos
      currency: "mxn",
      description,
      source: token,
    });

    // Generar el código QR
    const boletoData = `Evento: ${eventoId}, Usuario: ${usuarioEmail}, Asiento: ${asiento}`;
    const QRCode = require("qrcode");
    const qrCode = await QRCode.toDataURL(boletoData);

    // Insertar el boleto en la base de datos
    const insertSql = `
        INSERT INTO boletos (evento_id, usuario_email, asiento, codigo_qr, pagado)
        VALUES (?, ?, ?, ?, ?)`;

    db.query(insertSql, [eventoId, usuarioEmail, asiento, qrCode, true], (err, result) => {
      if (err) {
        console.error("Error al registrar el boleto:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      res.status(201).json({ mensaje: "Pago exitoso y boleto generado", qr: qrCode });
    });
  } catch (error) {
    console.error("Error en el pago:", error);
    res.status(500).json({ mensaje: "Error en el pago", error });
  }
});

module.exports = router;
