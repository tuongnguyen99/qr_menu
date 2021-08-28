import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManFoodListingScreen from '../../screen/manager_screens/ManFoodListingScreen';
import ManMenuItemEditScreen from '../../screen/manager_screens/ManMenuItemEditScreen';

const Stack = createStackNavigator();

function ManFoodNavigation(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManFoodListing" component={ManFoodListingScreen} />
      <Stack.Screen name="ManFoodEdit" component={ManMenuItemEditScreen} />
    </Stack.Navigator>
  );
}

export default ManFoodNavigation;
