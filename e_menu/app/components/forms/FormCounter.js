import { useFormikContext } from 'formik';
import React from 'react';
import Counter from '../Counter';

import ErrorMessage from './ErrorMessage';

function FormCounter({ name, max, min, width, ...props }) {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext();

  const handleIncrease = () => {
    const value = values[name];
    value < max && setFieldValue(name, value + 1);
  };

  const handleDecrease = () => {
    const value = values[name];
    value > min && setFieldValue(name, value - 1);
  };

  return (
    <>
      <Counter
        value={values[name]}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
      <ErrorMessage
        error={JSON.stringify(errors[name])}
        visible={touched[name]}
      />
    </>
  );
}

export default FormCounter;
