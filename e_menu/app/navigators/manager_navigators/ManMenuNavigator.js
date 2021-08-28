import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ManCategoriesScreen from "../../screen/manager_screens/ManCategoriesScreen";
import ManFoodListingScreen from "../../screen/manager_screens/ManFoodListingScreen";
import ManFoodNavigation from "./ManFoodNavigation";

const Tab = createMaterialTopTabNavigator();

function ManMenuNavigator(props) {
  return (
    <Tab.Navigator swipeEnabled={false}>
      <Tab.Screen
        name="ManFood"
        component={ManFoodNavigation}
        options={{ gestureEnabled: false, title: "Món" }}
      />
      <Tab.Screen
        name="ManCategories"
        component={ManCategoriesScreen}
        options={{ title: "Danh mục" }}
      />
    </Tab.Navigator>
  );
}

export default ManMenuNavigator;
