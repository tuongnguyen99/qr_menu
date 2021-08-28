import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../../configs/colors';

function ErrorMessage({ error, visible }) {
  if (!error || !visible) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: colors.danger,
  },
});

export default ErrorMessage;
