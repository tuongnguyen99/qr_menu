import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import ManAccountScreen from "../../screen/manager_screens/ManAccountScreen";
import ManListingsScreen from "../../screen/manager_screens/ManListingsScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import OrderNavigator from "./ManOrderNavigator";
import SafeArea from "../../components/SafeArea";
import MenuNavigator from "./ManMenuNavigator";
import ManMenuItemEditScreen from "../../screen/manager_screens/ManMenuItemEditScreen";
import ManTablesScreen from "../../screen/manager_screens/ManTablesScreen";
import ManTablesNavigator from "./ManTablesNavigator";
import useNotification from "./../../hooks/useNotification";
import expoPushTokenApi from "../../api/expoPushToken";

const Tab = createBottomTabNavigator();

function ManAppNavigator(props) {
  const { getToken } = useNotification();

  const regisExpoPushToken = async () => {
    const token = await getToken();
    if (token) expoPushTokenApi.register(token);
  };

  useEffect(() => {
    regisExpoPushToken();
  }, []);
  return (
    <SafeArea>
      <Tab.Navigator tabBarOptions={{ keyboardHidesTabBar: true }}>
        <Tab.Screen
          name="ManOrders"
          component={OrderNavigator}
          options={{
            title: "Đơn",
            tabBarIcon: ({ size, color }) => {
              return (
                <MaterialCommunityIcons name="cart" size={size} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="ManMenuManage"
          component={MenuNavigator}
          options={{
            title: "Menu",
            tabBarIcon: ({ size, color }) => {
              return (
                <MaterialCommunityIcons
                  name="playlist-edit"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ManTables"
          // component={ManListingsScreen}
          component={ManTablesNavigator}
          options={{
            title: "Bàn",
            tabBarIcon: ({ size, color }) => {
              return (
                <MaterialCommunityIcons
                  name="table-furniture"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ManAccount"
          component={ManAccountScreen}
          options={{
            title: "Tài khoản",
            tabBarIcon: ({ size, color }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeArea>
  );
}

export default ManAppNavigator;
