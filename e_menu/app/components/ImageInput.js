import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) alert('You need to accept library permission!');
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert('Detete', 'Are you sure to delete this image', [
        { text: 'Yes', onPress: () => onChangeImage(imageUri) },
        { text: 'No' },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {!imageUri && (
        <MaterialCommunityIcons name="camera" size={60} color="#bbb" />
      )}
      {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: colors.light,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImageInput;
