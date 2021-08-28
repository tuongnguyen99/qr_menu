import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import colors from "../configs/colors";
import InLineButton from "./InLineButton";
import OrderItem from "./OrderItem";
import Separator from "./Separator";

function OrderCard({ index, order, actionButtons }) {
  const parseDate = () => {
    const date = new Date(order.orderTime);
    return (
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2)
    );
  };

  const calculateTotalPrice = () => {
    return order.orders.reduce((p, c) => {
      const details = c.details;
      const stuffTotal = details.stuff.reduce((pre, cur) => {
        return pre + cur.price * cur.quantity;
      }, 0);
      return p + (details.variation.price * details.quantity + stuffTotal);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.tableNumContainer}>
          <Text style={styles.tableNumText}>{index  +1}</Text>
        </View>
        <View style={styles.headerDetails}>
          <View>
            <Text style={styles.title}>{order.table}</Text>
            <Text>{parseDate()}</Text>
          </View>
          <View style={styles.totalPrice}>
            <Text style={[styles.title, { color: colors.secondary }]}>
              Tổng cộng
            </Text>
            <Text style={[styles.title, { color: colors.secondary }]}>
              {calculateTotalPrice()}đ
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.ordersDetailsContainer}>
        <FlatList
          data={order.orders}
          keyExtractor={(item) => {
            return item._id;
          }}
          renderItem={({ item }) => {
            return <OrderItem order={item} />;
          }}
          ItemSeparatorComponent={() => {
            return <Separator />;
          }}
        />
      </View>
      <View>
        <View style={styles.buttonsContainer}>
          {actionButtons &&
            actionButtons.map((b) => {
              return (
                <InLineButton
                  loading={b.loading}
                  onPress={b.onPress}
                  key={b.title}
                  title={b.title}
                  backgroundColor={b.backgroundColor}
                />
              );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    elevation: 2,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 6,
  },
  header: {
    flexDirection: "row",
  },

  tableNumContainer: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  tableNumText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerDetails: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: colors.dark,
    fontSize: 16,
  },
  ordersDetailsContainer: {
    padding: 10,
  },
  buttonsContainer: {
    marginTop: 6,
    flexDirection: "row-reverse",
  },
});

export default OrderCard;
