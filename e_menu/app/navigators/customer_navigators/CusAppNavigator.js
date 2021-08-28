import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CusAccountScreen from "../../screen/customer_screens/CusAccountScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CusCartScreen from "../../screen/customer_screens/CusCartScreen.js";
import CartButton from "../../components/CartButton";
import CusListingsNavigator from "./CusListingsNavigator";
import IndentContext from "../../context/IndentContext";
import CartContext from "../../context/CartContext";
import useNotification from "../../hooks/useNotification";

const Tab = createBottomTabNavigator();

const CusAppNavigator = ({ route }) => {
  const [cart, setCart] = useState([]);
  const { getToken } = useNotification();

  const getExpoPushToken = async () => {
    const token = await getToken();
    route.params.myExpoPushToken = token;
  };

  useEffect(() => {
    getExpoPushToken();
  }, []);
  return (
    <IndentContext.Provider value={route.params}>
      <CartContext.Provider value={{ cart, setCart }}>
        <Tab.Navigator>
          <Tab.Screen
            name="Menu"
            component={CusListingsNavigator}
            options={{
              tabBarIcon: ({ size, color }) => {
                return (
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CusCartScreen}
            options={({ navigation }) => {
              return {
                tabBarButton: () => {
                  return (
                    <CartButton
                      count={cart.length}
                      onPress={() => {
                        navigation.navigate("Cart");
                      }}
                    />
                  );
                },
              };
            }}
          />
          <Tab.Screen
            name="Shop"
            component={CusAccountScreen}
            options={{
              tabBarIcon: ({ size, color }) => {
                return (
                  <MaterialCommunityIcons
                    name="store"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </CartContext.Provider>
    </IndentContext.Provider>
  );
};

export default CusAppNavigator;
