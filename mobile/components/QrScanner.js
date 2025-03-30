import React from "react";
import { View, Text } from "react-native";
import { RNCamera } from "react-native-camera";

export default function QrScanner({ onScan }) {
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        onBarCodeRead={(event) => onScan(event.data)}
      />
    </View>
  );
}
