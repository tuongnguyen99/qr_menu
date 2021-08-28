import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ManNewOrdersScreen from "../../screen/manager_screens/ManNewOrdersScreen";
import ManOngoingOrdersScreen from "../../screen/manager_screens/ManOngoingOrdersScreen";
import ManRefusedOrdersScreen from "../../screen/manager_screens/ManRefusedOrdersScreen";
import ManPastOrdersScreen from "../../screen/manager_screens/ManPastOrdersScreen";
import OrdersContext from "../../context/OrdersContext";

const Tab = createMaterialTopTabNavigator();

function ManOrderNavigator(props) {
  const [orders, setOrders] = useState({
    pending: [],
    processing: [],
    done: [],
    refused: [],
  });

  return (
    <OrdersContext.Provider value={{ orders, setOrders }}>
      <Tab.Navigator>
        <Tab.Screen
          name="NewOrders"
          component={ManNewOrdersScreen}
          options={{ title: "Mới" }}
        />
        <Tab.Screen
          name="OnGoingOrders"
          component={ManOngoingOrdersScreen}
          options={{ title: "Chế biến" }}
        />
        <Tab.Screen
          name="PastOrders"
          component={ManPastOrdersScreen}
          options={{ title: "Xong" }}
        />
        <Tab.Screen
          name="RefusedOrders"
          component={ManRefusedOrdersScreen}
          options={{ title: "Từ chối" }}
        />
      </Tab.Navigator>
    </OrdersContext.Provider>
  );
}

export default ManOrderNavigator;
