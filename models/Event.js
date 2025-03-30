const conexion = require('../db');

const Event = {
  getAll: (callback) => {
    conexion.query('SELECT * FROM eventos', callback);
  },
  getById: (id, callback) => {
    conexion.query('SELECT * FROM eventos WHERE id = ?', [id], callback);
  },
  create: (data, callback) => {
    conexion.query('INSERT INTO eventos SET ?', data, callback);
  },
};

module.exports = Event;
