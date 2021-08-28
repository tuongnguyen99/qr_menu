import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import colors from '../configs/colors';

function InLineButton({
  title,
  backgroundColor = colors.primary,
  titleColor = '#fff',
  onPress,
  loading = false,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={{ color: titleColor }}>{title}</Text>
      {loading && (
        <ActivityIndicator
          animating={true}
          color="#fff"
          style={{ marginLeft: 10 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 6,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default InLineButton;
