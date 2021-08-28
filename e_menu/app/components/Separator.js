import React from 'react';
import { View, StyleSheet } from 'react-native';

function Separator({ style }) {
  return <View style={[styles.container, style]}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 0.4,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginVertical: 4,
  },
});

export default Separator;
