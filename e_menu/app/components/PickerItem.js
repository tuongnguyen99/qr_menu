import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

function PickerItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default PickerItem;
