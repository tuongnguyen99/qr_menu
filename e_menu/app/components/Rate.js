import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';

function Rate({ value }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="star" color={colors.primary} size={18} />
      <Text style={styles.text}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.medium,
  },
});

export default Rate;
