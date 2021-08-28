import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import WelcomeScreen from '../screen/WelcomeScreen';
// import CusAuthNavigator from './customer_navigators/CusAuthNavigator';
import ManAuthNavigator from './manager_navigators/ManAuthNavigator';
import CusAppNavigator from './customer_navigators/CusAppNavigator';
import IndentNavigation from './customer_navigators/IndentNavigation';

const Stack = createStackNavigator();

function MainAuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RootWelcome" component={WelcomeScreen} />
      {/* <Stack.Screen name="RootCustomer" component={CusAuthNavigator} /> */}
      <Stack.Screen name="RootCustomer" component={IndentNavigation} />
      <Stack.Screen name="RootManager" component={ManAuthNavigator} />
    </Stack.Navigator>
  );
}

export default MainAuthNavigator;
