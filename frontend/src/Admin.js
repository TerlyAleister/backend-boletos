import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function Admin() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    axios.get("http://tu-backend.com/api/admin/reportes").then((res) => {
      setReportes(res.data);
    });
  }, []);

  const data = {
    labels: reportes.map((r) => r.nombre),
    datasets: [
      {
        label: "Boletos Vendidos",
        data: reportes.map((r) => r.boletos_vendidos),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h1>Panel de Administración</h1>
      <Bar data={data} />
    </div>
  );
}

export default Admin;
