import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import OrderCard from "../../components/OrderCard";
import useNotification from "../../hooks/useNotification";
import useOrders from "../../hooks/useOrders";
import * as Speech from "expo-speech";

function ManNewOrdersScreen(props) {
  const {
    fetchOrders,
    fetchOrderStates,
    orders,
    acceptOrder,
    refusedOrder,
    updateOrderStatusStates,
  } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  useNotification((notification) => {
    const { table, orders } = notification.request.content.data;
    // Speech.speak(`Bàn ${table} gọi món`);
    fetchOrders();
  });

  return (
    <View style={styles.container}>
      {updateOrderStatusStates.loading && (
        <ActivityIndicator animating color="coral" size="large" />
      )}
      <FlatList
        data={orders.pending}
        renderItem={({ item, index }) => {
          return (
            <OrderCard
              index={index}
              order={item}
              actionButtons={[
                {
                  title: "Chấp nhận",
                  backgroundColor: "#69C99F",
                  onPress: () => {
                    acceptOrder(item._id);
                  },
                },
                {
                  title: "Từ chối",
                  backgroundColor: "#ff8964",
                  onPress: () => {
                    refusedOrder(item._id);
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManNewOrdersScreen;
