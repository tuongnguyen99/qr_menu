import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../configs/colors';

function Button({
  title,
  titleColor = '#fff',
  backgroundColor = colors.primary,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 14,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 1,
  },
  title: {
    color: colors.dark,
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default Button;
