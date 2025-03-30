const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/pago", async (req, res) => {
  const { monto, descripcion, token } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount: monto * 100, // Convertir a centavos
      currency: "mxn",
      description: descripcion,
      source: token,
    });

    res.json({ mensaje: "Pago exitoso", charge });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el pago", error });
  }
});

module.exports = router;
