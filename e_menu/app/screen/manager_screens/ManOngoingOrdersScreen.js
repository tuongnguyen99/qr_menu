import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import OrderCard from "../../components/OrderCard";
import useOrders from "../../hooks/useOrders";

function ManOngoingOrdersScreen(props) {
  const { fetchOrders, orders, completeOrder, fetchOrderStates } = useOrders();

  return (
    <View style={styles.container}>
      <FlatList
        data={orders.processing}
        renderItem={({ item, index }) => {
          return (
            <OrderCard
              index={index}
              order={item}
              actionButtons={[
                {
                  title: "Đã hục vụ",
                  backgroundColor: "#ff8964",
                  onPress: () => {
                    completeOrder(item._id);
                  },
                },
              ]}
            />
          );
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

export default ManOngoingOrdersScreen;
