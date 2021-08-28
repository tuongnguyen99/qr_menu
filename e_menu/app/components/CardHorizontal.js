import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import colors from "../configs/colors";
import Rate from "./Rate";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CardHorizontal({
  imageUrl,
  title = "",
  categoryName = "",
  rate = "",
  price = "",
  processingTime,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{categoryName}</Text>
        <View style={styles.detailsFooter}>
          <View style={styles.timeContainer}>
            <MaterialCommunityIcons
              name="av-timer"
              color={colors.primary}
              size={18}
              style={{ marginRight: 2 }}
            />
            <Text style={{ color: colors.primary }}>{processingTime}p</Text>
          </View>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 120,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    margin: 6,
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 200,
    height: 160,
    // borderTopLeftRadius: 100,
    borderTopLeftRadius: 46,
  },
  detailsContainer: {
    padding: 10,
  },
  detailsFooter: {
    marginVertical: 6,
  },
  title: {
    fontWeight: "bold",
    color: colors.dark,
  },
  category: {
    fontSize: 12,
    marginTop: 4,
    color: colors.medium,
    marginLeft: 5,
  },
  price: {
    fontWeight: "bold",
    marginLeft: 5,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CardHorizontal;
