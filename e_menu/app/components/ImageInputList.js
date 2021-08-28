import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ImageInput from './ImageInput';

function ImageInputList({ imageUris = [], onAddImage, onRemoveImage }) {
  const scrollView = useRef();
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => {
          scrollView.current.scrollToEnd();
        }}
      >
        {imageUris.map((uri) => {
          return (
            <ImageInput
              key={uri}
              imageUri={uri}
              onChangeImage={() => {
                onRemoveImage(uri);
              }}
            />
          );
        })}
        <ImageInput onChangeImage={onAddImage} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default ImageInputList;
