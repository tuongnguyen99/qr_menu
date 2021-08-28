import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';

function CartButton({ onPress, count = 0 }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {count > 0 && <Text style={styles.number}>{count}</Text>}
      <MaterialCommunityIcons name="cart" size={30} color="#222" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    bottom: 40,
    borderWidth: 6,
    borderColor: '#fff',
    elevation: 1,
  },
  number: {
    width: 26,
    height: 26,
    textAlign: 'center',
    position: 'absolute',
    backgroundColor: '#eee',
    borderRadius: 20,
    top: 0,
    right: -6,
    // borderColor: '#ddd',
    // borderWidth: 2,
    elevation: 1,
  },
});

export default CartButton;
