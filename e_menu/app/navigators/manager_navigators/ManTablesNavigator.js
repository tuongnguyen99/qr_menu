import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import ManTableCheckScreen from "../../screen/manager_screens/ManTableCheckScreen";
import ManTablesScreen from "../../screen/manager_screens/ManTablesScreen";

const Tab = createMaterialTopTabNavigator();

function ManTablesNavigator(props) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ManTables"
        component={ManTablesScreen}
        options={{ title: "Tạo QR" }}
      />
      <Tab.Screen
        name="ManQRCheck"
        component={ManTableCheckScreen}
        options={{ title: "Kiểm tra" }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ManTablesNavigator;
