const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/eventos', (req, res) => {
  Event.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

router.post('/eventos', (req, res) => {
  const newEvent = req.body;
  Event.create(newEvent, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json({ message: 'Evento creado', id: results.insertId });
    }
  });
});

module.exports = router;
