const QRCode = require("qrcode");

async function generateQR(data) {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    console.error("Error generando QR:", err);
  }
}

module.exports = { generateQR };
