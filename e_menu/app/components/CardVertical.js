import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import colors from "../configs/colors";
import Rate from "./Rate";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function CardVertical({
  imageUrl,
  title = "",
  categoryName = "",
  rate = "",
  price = "",
  renderActions,
  processingTime = 0,
  onPress = () => {},
}) {
  const [longPress, setLongPress] = useState(false);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={() => {
        setLongPress(!longPress);
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        resizeMode="cover"
      />
      {longPress && (
        <View style={styles.actionsContainer}>
          {renderActions && renderActions()}
        </View>
      )}
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
          <Text style={styles.price}>{price + "đ"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    alignItems: "flex-end",
  },
  container: {
    width: 180,
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    margin: 6,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 140,
  },
  detailsContainer: {
    padding: 10,
  },
  detailsFooter: {
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    color: colors.dark,
  },
  category: {
    fontSize: 12,
    marginTop: 4,
    color: colors.medium,
  },
  price: {
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CardVertical;
