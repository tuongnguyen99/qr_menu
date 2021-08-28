import { useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Picker from '../Picker';
import ErrorMessage from './ErrorMessage';

function FormPicker({
  name,
  iconName,
  placeholder,
  width,
  items,
  PickerItemComponent,
  numberOfColumns = 1,
}) {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();
  return (
    <>
      <Picker
        iconName={iconName}
        items={items}
        placeholder={placeholder}
        width={width}
        onSelectItem={(item) => {
          setFieldTouched(name, true);
          setFieldValue(name, item);
        }}
        selectedItem={values[name]}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPicker;
