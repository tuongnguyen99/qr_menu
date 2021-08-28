import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import CartItem from "../../components/CartItem";
import SafeArea from "../../components/SafeArea";
import Button from "../../components/Button";
import colors from "../../configs/colors";
import CartContext from "../../context/CartContext";
import orderApi from "../../api/order";
import useApi from "../../hooks/useApi";
import { ErrorMessage } from "../../components/forms";
import IndentContext from "../../context/IndentContext";

function CusCartScreen(props) {
  const { cart, setCart } = useContext(CartContext);
  const indent = useContext(IndentContext);
  const postOrderApi = useApi(orderApi.order);

  const calculateTotalPrice = () => {
    return cart.reduce((p, c) => {
      return p + c.orderDetails.totalPrice;
    }, 0);
  };

  const calculateProcessingTime = () => {
    return cart.reduce((p, c) => {
      return p + c.item.processingTime;
    }, 0);
  };

  const handleConfirm = async () => {
    const result = await postOrderApi.request(cart, indent);
    if (result.ok)
      Alert.alert("Thông báo", "Yêu cầu đặt món của bạn đã được tiếp nhận");
    else Alert.alert("Thông báo", "Có lỗi xảy ra, vui lòng thử lại sau");
  };

  const handleDelete = (itemKey) => {
    setCart(
      cart.filter((i) => {
        return i.key !== itemKey;
      })
    );
  };

  return (
    <View style={styles.container}>
      <SafeArea>
        <ActivityIndicator
          animating={postOrderApi.loading}
          color={colors.primary}
        />
        <View>
          <Text style={styles.title}>Danh sách</Text>
          <Text style={styles.strongTitle}>Món</Text>
        </View>
        <View style={{ flex: 1, marginBottom: 20 }}>
          <ScrollView>
            {cart.map((cartItem, index) => {
              return (
                <CartItem
                  cardItem={cartItem}
                  key={cartItem.key}
                  onDelete={handleDelete}
                />
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemText}>Số lượng món</Text>
            <Text style={styles.detailsItemText}>{cart.length}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemText}>Thời gian chế biến</Text>
            <Text style={styles.detailsItemText}>
              {calculateProcessingTime()}p
            </Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.totalText}>Tổng cộng</Text>
            <Text style={styles.totalText}>{calculateTotalPrice() + "đ"}</Text>
          </View>
          <ErrorMessage
            error="Confirmation failed"
            visible={postOrderApi.error}
          />
          <Button title="Xác nhận đặt món" onPress={handleConfirm} />
        </View>
      </SafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fdfdfd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#7b7b7b",
  },
  strongTitle: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#222222",
  },
  detailsContainer: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 1,
    padding: 20,
    margin: 2,
    marginBottom: 60,
  },
  detailsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  detailsItemText: {
    color: colors.medium,
  },
});

export default CusCartScreen;
