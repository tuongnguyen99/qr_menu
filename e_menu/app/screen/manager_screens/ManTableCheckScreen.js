import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { decode } from "js-base64";

function ManTableCheckScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [value, setValue] = useState("");

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
        setValue(data);
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
      <Text style={styles.qrValue}>{value.table}</Text>
      <View style={styles.overlay}></View>
      <Text style={styles.text}>Quét để kiểm tra thông tin mã QR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  qrValue: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 34,
    marginBottom: 10,
  },
});

export default ManTableCheckScreen;
