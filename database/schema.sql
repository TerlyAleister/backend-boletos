CREATE DATABASE boletos;
USE boletos;

CREATE TABLE eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255),
  fecha DATE,
  ubicacion VARCHAR(255)
);

CREATE TABLE boletos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  evento_id INT,
  usuario_email VARCHAR(255),
  asiento VARCHAR(10),
  codigo_qr TEXT,
  pagado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (evento_id) REFERENCES eventos(id)
);
