import { useFormikContext } from "formik";
import React from "react";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";

function FormField({ name, width, ...props }) {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <TextInput
        {...props}
        value={values[name] + ""}
        width={width}
        onChange={(text) => {
          setFieldValue(name, text);
        }}
        onBlur={() => setFieldTouched(name)}
      />
      <ErrorMessage
        error={JSON.stringify(errors[name])}
        visible={touched[name]}
      />
    </>
  );
}

export default FormField;
