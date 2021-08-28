import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function Section({ title = '', children, maxHeight }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={maxHeight && { maxHeight }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  sectionTitle: {
    marginBottom: 6,
    color: '#222222',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Section;
