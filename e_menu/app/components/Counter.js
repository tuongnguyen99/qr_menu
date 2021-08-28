import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../configs/colors';

function Counter({ value, onIncrease, onDecrease }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDecrease}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>{value}</Text>
      <TouchableOpacity style={styles.button} onPress={onIncrease}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderRadius: 12,
  },
});

export default Counter;
