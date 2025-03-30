const mysql = require("mysql2");

// Crear conexión con la base de datos
const db = mysql.createPool({
    host: "localhost",       // Cambia si usas un host diferente
    user: "root",            // Usuario de tu base de datos
    password: "",            // Contraseña de tu base de datos
    database: "boletos",     // Nombre de la base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar la conexión
module.exports = db.promise();
