import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';
function ListInputItem({
  item,
  attributes,
  onAttrTextChange,
  errorHightLight,
  onDelete,
}) {
  return (
    <View style={styles.container}>
      {attributes.map((attr) => {
        return (
          <View style={styles.col} key={attr.name}>
            <TextInput
              defaultValue={item[attr.name] ? item[attr.name] + '' : ''}
              style={styles.text}
              placeholder={attr.placeholder}
              keyboardType={attr.type === 'text' ? 'default' : 'numeric'}
              placeholderTextColor={errorHightLight ? '#f88e86' : colors.medium}
              autoCapitalize="none"
              autoCompleteType="off"
              onChangeText={(text) => {
                onAttrTextChange(attr.name, text);
              }}
            />
          </View>
        );
      })}

      <TouchableOpacity style={styles.minusButton} onPress={onDelete}>
        <MaterialCommunityIcons name="minus" size={20} color="#f88e86" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  col: {
    flex: 2,
    marginRight: 6,
  },
  minusButton: {
    marginRight: 10,
  },
});

export default ListInputItem;
