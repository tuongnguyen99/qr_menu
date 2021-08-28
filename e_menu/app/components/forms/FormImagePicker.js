import { useFormikContext } from 'formik';
import React from 'react';
import { View, Text } from 'react-native';
import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

export default function FormImagePicker({ name }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const imageUris = values[name];
  const onAddImage = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const onRemoveImage = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => {
        return imageUri !== uri;
      })
    );
  };

  return (
    <View>
      <ImageInputList
        imageUris={imageUris}
        onRemoveImage={onRemoveImage}
        onAddImage={onAddImage}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}
