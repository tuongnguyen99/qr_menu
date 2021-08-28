import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, Switch, View, Text } from 'react-native';
import colors from '../../configs/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function FormSwitch({ name, text, width, iconName, ...props }) {
  const { setFieldValue, values } = useFormikContext();
  const toggleSwitch = () => setFieldValue(name, !values[name]);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color={colors.secondary}
        style={styles.icon}
      />
      <Text style={styles.text}>{text}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#ddd' }}
        thumbColor={values[name] ? colors.primary : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={values[name]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingRight: 4,
  },
  text: {
    fontSize: 18,
    color: colors.dark,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default FormSwitch;
