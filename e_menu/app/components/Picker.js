import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import PickerItem from "./PickerItem";
import colors from "../configs/colors";

function Picker({
  iconName,
  items,
  placeholder,
  width = "100%",
  selectedItem,
  PickerItemComponent = PickerItem,
  numberOfColumns,
  onSelectItem,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={colors.secondary}
            style={styles.icon}
          />
          <Text
            style={[
              styles.text,
              !selectedItem ? { color: colors.medium } : { color: colors.dark },
            ]}
          >
            {selectedItem ? selectedItem.name : placeholder}
          </Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.medium}
            style={styles.icon}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          numColumns={numberOfColumns}
          keyExtractor={(item) => {
            return item._id + "";
          }}
          renderItem={({ item }) => {
            return (
              <PickerItemComponent
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            );
          }}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    paddingVertical: 14,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default Picker;
