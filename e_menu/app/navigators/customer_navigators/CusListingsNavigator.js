import React from 'react';
import CusListingDetailsScreen from '../../screen/customer_screens/CusListingDetailsScreen';
import CusListingsScreen from '../../screen/customer_screens/CusListingsScreen';
const { createStackNavigator } = require('@react-navigation/stack');

const Stack = createStackNavigator();

const CusListingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Listing" component={CusListingsScreen} />
      <Stack.Screen name="ListingDetails" component={CusListingDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CusListingsNavigator;
