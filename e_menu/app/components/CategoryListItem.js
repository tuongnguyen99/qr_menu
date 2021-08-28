import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import ListItem from './ListItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../configs/colors';

function CategoryListItem({title}) {
  return (
    <Swipeable renderRightActions={() => {
        return <View style={styles.actionButton}><MaterialCommunityIcons name="trash-can-outline" size={22} color={colors.danger}/></View>
    }}>
        <ListItem text={title} />
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {},
  actionButton: {
      height:30,
      width: 30,
      justifyContent: "center",
      alignItems: "center",
  }
});

export default CategoryListItem;