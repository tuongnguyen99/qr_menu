import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import useAuth from "../auth/useAuth";
import Button from "../components/Button";
import colors from "../configs/colors";
import TextButton from "./../components/TextButton";

function WelcomeScreen({ navigation }) {
  const { anonymousLogin } = useAuth();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/chef.png")} style={styles.image} />
        <Text style={styles.tagline}>E-menu - Gọi món thời 4.0</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {/* <Text style={styles.text}>Choose your plan</Text> */}
        <Button
          title="Gọi món ngay"
          // onPress={() => navigation.navigate('RootCustomer')}
          onPress={anonymousLogin}
        />

        <TextButton
          title="Tôi là người quản lý"
          onPress={() => navigation.navigate("RootManager")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },
  image: {
    width: 300,
    height: 300,
  },
  tagline: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.medium,
  },
  text: {
    alignSelf: "center",
    marginBottom: 10,
    color: colors.medium,
    opacity: 0.6,
  },
});

export default WelcomeScreen;
