import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { encode, decode } from "js-base64";

function CusQRCodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    setScanned(false);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    data = decode(data);
    try {
      data = JSON.parse(data);
      if ("_id" in data && "table" in data) {
        setScanned(true);
        navigation.navigate("CusApp", data);
      }
    } catch (error) {}
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={!scanned && handleBarCodeScanned}
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      />
      <View style={styles.overlay}></View>
      <Text style={styles.text}>Quét mã QR trên bàn để truy cập MENU</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeContainer: {
    height: 400,
    width: 400,
    overflow: "hidden",
    borderRadius: 40,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    width: 300,
    height: 300,
    opacity: 0.2,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  text: {
    color: "#fff",
    marginTop: 20,
  },
});

export default CusQRCodeScreen;
