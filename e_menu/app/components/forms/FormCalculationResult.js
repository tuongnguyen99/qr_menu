import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

function FormCalculationResult({ calculateMethod }) {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{calculateMethod(values) + "đ"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
});

export default FormCalculationResult;
