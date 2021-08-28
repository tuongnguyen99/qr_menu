import React from 'react';
import { View, StyleSheet, TextInput as ReactTextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';

function TextInput({
  iconName,
  placeholder,
  width = '100%',
  onChange,
  ...props
}) {
  return (
    <View style={[styles.container, { width }]}>
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color={colors.secondary}
        style={styles.icon}
      />
      <ReactTextInput
        placeholderTextColor={placeholder ? colors.medium : colors.dark}
        style={styles.text}
        placeholder={placeholder}
        onChangeText={onChange}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    color: colors.dark,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default TextInput;
