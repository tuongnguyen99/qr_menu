import { Formik } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';

function Form({ initialValues, validationSchema, children, onSubmit, ...res }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      {...res}
    >
      {() => {
        return <>{children}</>;
      }}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Form;
