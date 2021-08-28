import { useFormikContext } from 'formik';
import React from 'react';
import shortid from 'shortid';
import ListInput from '../ListInput';

import ErrorMessage from './ErrorMessage';

function FormListInput({ name, width, attributes, title, ...props }) {
  const { setFieldValue, errors, touched, setFieldTouched, values } =
    useFormikContext();

  const handleAddItem = () => {
    const length = values[name].length;
    if (length === 0 || values[name][length - 1] === null || !errors[name]) {
      setFieldTouched(name, false);
      setFieldValue(name, [
        ...values[name],
        { index: length, key: shortid.generate() },
      ]);
    } else {
      setFieldTouched(name, true);
    }
  };

  const handleRemoveItem = (item) => {
    const items = [...values[name]];
    const filteredItems = items.filter((i) => {
      return i.index !== item.index;
    });
    setFieldValue(name, filteredItems);
  };

  const handleAttrChange = (item, attr, value) => {
    const index = values[name].findIndex((i) => {
      return i.key === item.key;
    });
    setFieldValue(`${name}[${index}].${attr}`, value);
  };

  return (
    <>
      <ListInput
        name={name}
        title={title}
        items={values[name]}
        attributes={attributes}
        errorHightLight={errors[name] && touched[name]}
        onAddItem={handleAddItem}
        onAttrChange={handleAttrChange}
        onRemoveItem={handleRemoveItem}
      />
      {/* {console.log(errors[name])} */}
      <ErrorMessage
        error={JSON.stringify(errors[name])}
        visible={touched[name]}
      />
    </>
  );
}

export default FormListInput;
