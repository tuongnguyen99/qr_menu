import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

function TextButton({title, onPress, ...res}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Text {...res} style={styles.title}>{title}</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    textAlign: "center",
    color: "#69a0e2"
  }
});

export default TextButton;