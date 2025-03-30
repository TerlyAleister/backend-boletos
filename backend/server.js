require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const eventosRouter = require("./routes/eventos");
app.use("/api/eventos", eventosRouter);

app.get("/", (req, res) => {
  res.send("Servidor en línea");
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));


