import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import OrderCard from "../../components/OrderCard";
import useOrders from "../../hooks/useOrders";

function ManRefusedOrdersScreen(props) {
  const { fetchOrders, orders, completeOrder, fetchOrderStates } = useOrders();

  return (
    <View style={styles.container}>
      <FlatList
        data={orders.refused}
        renderItem={({ item, index }) => {
          return <OrderCard order={item} index={index} />;
        }}
        keyExtractor={(item) => {
          return item._id;
        }}
        refreshing={fetchOrderStates.loading}
        onRefresh={fetchOrders}
      />
    </View>
  );
  // return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManRefusedOrdersScreen;
