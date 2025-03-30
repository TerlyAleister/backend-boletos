const express = require("express");
const router = express.Router();
const db = require("../config/database"); // Asegúrate de que la ruta sea correcta
const qrcode = require("qrcode");

// Ejemplo de una ruta para comprar boletos
router.post("/buy", async (req, res) => {
    const { eventId, userEmail, seat } = req.body;

    try {
        const qrData = `${eventId}-${userEmail}-${seat}`;
        const qrCode = await qrcode.toDataURL(qrData);

        const query = `
            INSERT INTO tickets (eventId, userEmail, seat, qrCode, used)
            VALUES (?, ?, ?, ?, false)
        `;
        await db.query(query, [eventId, userEmail, seat, qrCode]);

        res.status(201).json({
            message: "Boleto comprado exitosamente",
            qrCode
        });
    } catch (error) {
        console.error("Error al comprar boleto:", error);
        res.status(500).json({ error: "Error al comprar el boleto" });
    }
});

module.exports = router;
