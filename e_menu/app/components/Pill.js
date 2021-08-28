import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../configs/colors';

function Pill({ text, backgroundColor = colors.primary, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    elevation: 2,
    margin: 4,
  },
  text: {
    color: colors.dark,
  },
});

export default Pill;
