import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CusQRCodeScreen from '../../screen/customer_screens/CusQRCodeScreen';
import CusAppNavigator from './CusAppNavigator';

const Stack = createStackNavigator();

function IndentNavigation(props) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CursQRCode" component={CusQRCodeScreen} />
      <Stack.Screen name="CusApp" component={CusAppNavigator} />
    </Stack.Navigator>
  );
}

export default IndentNavigation;
