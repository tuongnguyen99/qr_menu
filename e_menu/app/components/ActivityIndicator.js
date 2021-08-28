import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

function ActivityIndicator(props) {
  return (
    // <View style={styles.overlay}>
    <LottieView
      style={{ elevation: 2 }}
      source={require('../assets/animations/loader.json')}
      autoPlay
      loop
      on
    />
    // </View>
  );
}
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    // opacity: 0.2,
    // backgroundColor: colors.white,
    height: '100%',
    width: '100%',
    elevation: 1,
    zIndex: 1,
  },
});

export default ActivityIndicator;
