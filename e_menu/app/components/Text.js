import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

function Text({ style, children }) {
  const [fontLoaded] = useFonts({ Poppins_400Regular });
  if (!fontLoaded) return <AppLoading />;
  else
    return (
      <Text style={[style, { fontFamily: 'Poppins_400Regular' }]}>
        "kjhjgjhgjhg"
      </Text>
    );
}

export default Text;
