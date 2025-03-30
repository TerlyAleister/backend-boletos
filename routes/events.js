const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM events");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener eventos" });
  }
});

module.exports = router;
