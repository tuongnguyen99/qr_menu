import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { set } from 'react-native-reanimated';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import CusAppNavigator from './app/navigators/customer_navigators/CusAppNavigator';
import IndentNavigation from './app/navigators/customer_navigators/IndentNavigation';
import navigationTheme from './app/navigators/customer_navigators/navigationTheme';
import MainAuthNavigator from './app/navigators/MainAuthNavigator';
import ManAppNavigator from './app/navigators/manager_navigators/ManAppNavigator';
export default function App() {
  const [user, setUser] = useState(null);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const renderNavigator = () => {
    if (!user) return <MainAuthNavigator />;
    else if (user.role === 'customer') return <IndentNavigation />;
    else return <ManAppNavigator />;
  };

  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{ user, setUser }}>
        <StatusBar style="inverted" />
        <NavigationContainer theme={navigationTheme}>
          {renderNavigator()}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
});
