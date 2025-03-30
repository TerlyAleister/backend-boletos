import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { RNCamera } from "react-native-camera";
import axios from "axios";

const App = () => {
  const [codigoLeido, setCodigoLeido] = useState("");

  const validarQR = async (codigo) => {
    try {
      const res = await axios.post("http://tu-backend.com/api/boletos/validar", {
        codigo_qr: codigo,
      });
      Alert.alert("Validación", res.data.mensaje);
    } catch (error) {
      Alert.alert("Error", "Código inválido o ya usado.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        onBarCodeRead={(e) => {
          if (e.data !== codigoLeido) {
            setCodigoLeido(e.data);
            validarQR(e.data);
          }
        }}
      />
    </View>
  );
};

export default App;

