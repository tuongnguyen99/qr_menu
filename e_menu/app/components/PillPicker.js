import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../configs/colors';
import Pill from './Pill';

function PillPicker({ items = [], selectedItem, onItemSelect }) {
  return (
    <View style={styles.container}>
      {items.map((i) => {
        return (
          <Pill
            key={i._id}
            text={i.name}
            onPress={() => {
              onItemSelect(i);
            }}
            backgroundColor={
              i._id === selectedItem._id ? colors.primary : colors.white
            }
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
    marginBottom: 20,
  },
});

export default PillPicker;
