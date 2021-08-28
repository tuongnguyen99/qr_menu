import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../configs/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListInputItem from './ListInputItem';
import Separator from './Separator';
import shortid from 'shortid';

function ListInput({
  items,
  attributes,
  title,
  errorHightLight,
  onAddItem,
  onAttrChange,
  onRemoveItem,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name="format-list-bulleted-type"
            size={20}
            color={colors.secondary}
            style={styles.icon}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onAddItem}>
          <MaterialCommunityIcons
            name="plus"
            size={30}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.items}>
        {/* <FlatList
          data={items}
          renderItem={({ item }) => {
            if (item === null) return null;
            return (
              <ListInputItem
                item={item}
                attributes={attributes}
                onAttrTextChange={(attrName, value) => {
                  onAttrChange(item, attrName, value);
                }}
                errorHightLight={errorHightLight}
                onDelete={() => {
                  onRemoveItem(item);
                }}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return index + '';
          }}
          ItemSeparatorComponent={() => {
            return <Separator />;
          }}
        /> */}
        {items.map((item, index) => {
          if (item === null) return null;
          return (
            <ListInputItem
              key={item.key + ''}
              item={item}
              attributes={attributes}
              onAttrTextChange={(attrName, value) => {
                onAttrChange(item, attrName, value);
              }}
              errorHightLight={errorHightLight}
              onDelete={() => {
                onRemoveItem(item);
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    marginVertical: 10,
    borderRadius: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    // color: colors.secondary,
    color: colors.dark,
    // fontWeight: 'bold',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  items: {
    paddingHorizontal: 16,
  },
});

export default ListInput;
