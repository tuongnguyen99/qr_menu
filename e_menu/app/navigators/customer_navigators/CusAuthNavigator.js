import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CusLoginScreen from '../../screen/customer_screens/CusLoginScreen';
import CusRegisterScreen from '../../screen/customer_screens/CusRegisterScreen';
import CusWelcomeScreen from '../../screen/customer_screens/CusWelcomeScreen';
import CusAppNavigator from './CusAppNavigator';

const Stack = createStackNavigator();

const CusAuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CusWelcome" component={CusWelcomeScreen} />
      <Stack.Screen name="CusLogin" component={CusLoginScreen} />
      <Stack.Screen name="CusRegister" component={CusRegisterScreen} />
      <Stack.Screen name="CusApp" component={CusAppNavigator} />
    </Stack.Navigator>
  );
};

export default CusAuthNavigator;
