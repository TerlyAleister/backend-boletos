import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

function Pago({ monto }) {
  const [pagado, setPagado] = useState(false);

  const manejarPago = async (token) => {
    const res = await axios.post("http://tu-backend.com/api/pago", {
      monto,
      descripcion: "Pago por boleto",
      token,
    });

    if (res.data.mensaje === "Pago exitoso") {
      setPagado(true);
      alert("Pago realizado con éxito.");
    } else {
      alert("Error en el pago.");
    }
  };

  return (
    <div>
      {pagado ? (
        <p>Pago realizado con éxito 🎉</p>
      ) : (
        <StripeCheckout
          stripeKey="TU_PUBLIC_KEY"
          token={manejarPago}
          amount={monto * 100}
          currency="MXN"
        />
      )}
    </div>
  );
}

export default Pago;
