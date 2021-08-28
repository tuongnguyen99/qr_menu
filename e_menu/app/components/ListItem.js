import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';

function ListItem({
  iconName,
  text,
  textSelectable = false,
  subText,
  disabled = false,
  renderLeftAction,
  containerStyle,
  numberOfLines = 1,
  onPress
}) {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.commonContainer}>
        <MaterialCommunityIcons name={iconName} size={20} color="#a4a4a4" />
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={numberOfLines} selectable={textSelectable}>
            {text}
          </Text>
          {subText && <Text style={styles.text}>{subText}</Text>}
        </View>
      </View>
      {renderLeftAction && renderLeftAction()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  commonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.medium,
    flex: 1,
  },
});

export default ListItem;
