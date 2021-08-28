import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManRegisterScreen from '../../screen/manager_screens/ManRegisterScreen';
import ManLoginScreen from '../../screen/manager_screens/ManLoginScreen';

// import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const ManAuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ManLogin" component={ManLoginScreen} />
      <Stack.Screen name="ManRegister" component={ManRegisterScreen} />
    </Stack.Navigator>
  );
};

export default ManAuthNavigator;
