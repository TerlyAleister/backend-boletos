require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
const PORT = 4000;

// ✅ Configuración de la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "boletos",
});

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// ✅ Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// ✅ Rutas de eventos
app.get("/api/eventos", (req, res) => {
  db.query("SELECT * FROM eventos", (err, results) => {
    if (err) {
      console.error("Error obteniendo eventos:", err);
      return res.status(500).json({ error: "Error en el servidor" });
    }
    res.json(results);
  });
});

// ✅ Ruta para comprar boleto con QR y validación de duplicados
app.post("/api/comprar", async (req, res) => {
  const { eventoId, usuarioEmail, asiento } = req.body;

  if (!eventoId || !usuarioEmail || !asiento) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    // Verificar si el boleto ya existe
    const verificarSql = `SELECT * FROM boletos WHERE evento_id = ? AND usuario_email = ? AND asiento = ?`;

    db.query(verificarSql, [eventoId, usuarioEmail, asiento], async (err, results) => {
      if (err) {
        console.error("Error verificando duplicado:", err);
        return res.status(500).json({ error: "Error en el servidor" });
      }

      if (results.length > 0) {
        return res.status(409).json({ error: "El boleto ya fue comprado" });
      }

      // Generar el código QR
      const boletoData = `Evento: ${eventoId}, Usuario: ${usuarioEmail}, Asiento: ${asiento}`;
      const qrCode = await QRCode.toDataURL(boletoData);

      // Insertar el boleto en la base de datos
      const insertSql = `INSERT INTO boletos (evento_id, usuario_email, asiento, codigo_qr, pagado) VALUES (?, ?, ?, ?, ?)`;
      const values = [eventoId, usuarioEmail, asiento, qrCode, true];

      db.query(insertSql, values, (err) => {
        if (err) {
          console.error("Error al insertar boleto:", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }

        res.status(201).json({ mensaje: "Boleto comprado exitosamente", qr: qrCode });
      });
    });
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ error: "Error al procesar la solicitud", detalle: error.message });
  }
});

// ✅ Integración de pagos con Stripe
const pagos = require("./pagos");
app.use("/api/pagos", pagos);


// ✅ Integración de validación de boletos
const validacionRouter = require("./validacion");
app.use("/api/validacion", validacionRouter);

// ✅ Integración de panel de administración
const adminRouter = require("./admin");
app.use("/api/admin", adminRouter);

// ✅ Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
