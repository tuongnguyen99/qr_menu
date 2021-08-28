import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as FileSystem from "expo-file-system";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
// import base64Converter from "../../utils/base64Converter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAccessFramework } from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import nonAccentVietnamese from "../../utils/nonAccentVietnamese";
import useAuth from "../../auth/useAuth";
import { encode, decode } from "js-base64";

function ManTablesScreen(props) {
  const qrRef = React.createRef();
  const [tableName, setTableName] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    requestPermissions();
  }, []);

  const saveQR = () => {
    const fileName =
      FileSystem.documentDirectory + nonAccentVietnamese(tableName) + ".png";
    qrRef.current.toDataURL((data) => {
      FileSystem.writeAsStringAsync(fileName, data, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then(() => {
          return MediaLibrary.saveToLibraryAsync(fileName);
        })
        .then(() => {
          alert("Mã đã được lưu vào thư viện ảnh");
          setTableName("");
        })
        .catch((err) => {
          alert(err.message);
        });
    });
  };

  const handleChange = (value) => {
    setTableName(value);
  };

  const getQRValue = () => {
    return JSON.stringify({ _id: user.userId, table: tableName });
  };

  const requestPermissions = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          getRef={qrRef}
          size={250}
          quietZone={10}
          value={tableName.length > 0 ? encode(getQRValue()) : " "}
        />
        <Text style={styles.tooltip}>In mã này và dán lên bàn</Text>
      </View>
      <View>
        <TextInput
          placeholder="Tên bàn"
          value={tableName}
          onChange={handleChange}
        />
        <Button title="Lưu mã QR" onPress={saveQR} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 50,
  },
  tooltip: {
    marginTop: 20,
  },
});

export default ManTablesScreen;
