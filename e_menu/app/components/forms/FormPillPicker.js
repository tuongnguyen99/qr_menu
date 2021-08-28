import { useFormikContext } from 'formik';
import React from 'react';
import PillPicker from '../PillPicker';
import ErrorMessage from './ErrorMessage';

function FormPillPicker({ name, width, items }) {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();
  const handleItemSelect = (i) => {
    setFieldValue(name, i);
  };
  return (
    <>
      <PillPicker
        items={values[name]}
        items={items}
        selectedItem={values[name]}
        onItemSelect={handleItemSelect}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormPillPicker;
