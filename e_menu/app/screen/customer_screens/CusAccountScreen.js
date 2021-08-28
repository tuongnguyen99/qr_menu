import React, { useEffect } from "react";
import { View, StyleSheet, Text, Linking, Alert } from "react-native";
import useAuth from "../../auth/useAuth";
import Button from "../../components/Button";
import SafeArea from "./../../components/SafeArea";
import ShopApi from "../../api/shop";
import useApi from "../../hooks/useApi";
import IndentContext from "../../context/IndentContext";
import ListItem from "./../../components/ListItem";
import Separator from "../../components/Separator";
import colors from "../../configs/colors";
import Clipboard from "expo-clipboard";

function CusAccountScreen(props) {
  const auth = useAuth();
  const getShopInfoApi = useApi(ShopApi.getShopInfo);
  const callWaiterApi = useApi(ShopApi.callTheWaiter);
  const indent = React.useContext(IndentContext);

  useEffect(() => {
    getShopInfoApi.request(indent._id);
  }, []);

  const renderInfo = () => {
    const shopInfo = getShopInfoApi.data;
    if (shopInfo)
      return (
        <View>
          <Text style={styles.headerText}>Thông tin cửa hàng </Text>
          <Separator style={styles.separator} />
          <ListItem
            containerStyle={styles.listItemStyle}
            iconName="store"
            text={shopInfo.shopName}
            textSelectable
          />
          <ListItem
            containerStyle={styles.listItemStyle}
            iconName="email"
            text={shopInfo.email}
            textSelectable
            onPress={() => {
              Clipboard.setString(shopInfo.email);
              Alert.alert("Thông báo", "Đã sao chép vào bộ nhớ");
            }}
          />
          <ListItem
            containerStyle={styles.listItemStyle}
            iconName="phone"
            text={shopInfo.phone}
            textSelectable
            onPress={() => {
              Linking.openURL(`tel:${shopInfo.phone}`);
            }}
          />
          <ListItem
            containerStyle={styles.listItemStyle}
            iconName="map-marker"
            text={shopInfo.address}
            textSelectable={true}
            onPress={() => {
              Clipboard.setString(shopInfo.address);
              Alert.alert("Thông báo", "Đã sao chép vào bộ nhớ");
            }}
          />
        </View>
      );
  };

  return (
    <SafeArea>
      <View style={styles.container}>
        <View>{renderInfo()}</View>
        <View>
          <Button
            title="Gọi phục vụ"
            backgroundColor={colors.secondary}
            onPress={async () => {
              const result = await callWaiterApi.request(
                indent.table,
                indent._id
              );
              if (result.ok)
                Alert.alert(
                  "Thông báo",
                  "Gửi yêu cầu thành công. Vui lòng đợi trong giây lát"
                );
              else
                Alert.alert(
                  "Thông báo",
                  "Không thể gửi yêu cầu, vui lòng thử lại sau"
                );
            }}
          />
          <Button title="Quét lại mã" onPress={() => auth.logout()} />
        </View>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  headerText: {
    fontWeight: "bold",
    color: colors.dark,
    fontSize: 28,
  },
  listItemStyle: {
    marginVertical: 20,
  },
  separator: {
    marginVertical: 20,
  },
});

export default CusAccountScreen;
