const express = require("express");
const { generateQR } = require("../utils/qrgenerator");
const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { data } = req.body;
    const qrCode = await generateQR(data);
    res.status(200).json({ qrCode });
  } catch (error) {
    res.status(500).json({ error: "Error al generar el QR" });
  }
});

module.exports = router;
