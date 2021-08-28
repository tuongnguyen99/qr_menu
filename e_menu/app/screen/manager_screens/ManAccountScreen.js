import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import useAuth from "../../auth/useAuth";
import Button from "../../components/Button";
import ListItem from "../../components/ListItem";
import Separator from "../../components/Separator";
import colors from "../../configs/colors";

function ManAccountScreen(props) {
  const { user, logout } = useAuth();
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {};
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Thông tin</Text>
        <Separator style={styles.separator} />
        <ListItem
          containerStyle={styles.listItemStyle}
          iconName="store"
          text={user.shopName}
        />
        <ListItem
          containerStyle={styles.listItemStyle}
          iconName="phone"
          text={user.phone}
        />
        <ListItem
          containerStyle={styles.listItemStyle}
          iconName="map-marker"
          text={user.address}
          numberOfLines={2}
        />
      </View>
      <Button title="Đăng xuất" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    color: colors.dark,
    fontSize: 28,
  },
  listItemStyle: {
    marginVertical: 20,
  },
  separator: {
    marginVertical: 20,
  },
});

export default ManAccountScreen;
