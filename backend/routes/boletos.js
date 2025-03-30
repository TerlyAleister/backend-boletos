const express = require("express");
const router = express.Router();
const db = require("../db");
const qrcode = require("qrcode");

router.post("/comprar", async (req, res) => {
  const { evento_id, usuario_email, asiento } = req.body;

  const qrData = `${evento_id}-${usuario_email}-${asiento}`;
  const qrCode = await qrcode.toDataURL(qrData);

  db.query(
    "INSERT INTO boletos (evento_id, usuario_email, asiento, codigo_qr, pagado) VALUES (?, ?, ?, ?, ?)",
    [evento_id, usuario_email, asiento, qrCode, true],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ mensaje: "Boleto comprado", qrCode });
    }
  );
});

module.exports = router;
