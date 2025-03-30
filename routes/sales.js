const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT events.nombre AS eventName, COUNT(tickets.id) AS totalSales FROM tickets JOIN events ON tickets.event_id = events.id GROUP BY tickets.event_id"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ventas" });
  }
});

module.exports = router;
