import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import useAuth from "../../auth/useAuth";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../configs/colors";
import authApi from "../../api/auth";

function ManLoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const auth = useAuth();

  const handleSubmit = async ({ email, password }) => {
    setLoginFailed(false);
    const result = await authApi.loginAsManager(email, password);
    if (!result.ok) return setLoginFailed(true);
    auth.login(result.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/undraw_Access_account_re_8spm.png")}
          style={styles.image}
        />
        <Text style={styles.tagline}>Đăng nhập</Text>
      </View>
      <View>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          <ErrorMessage
            error="Sai tài khoản hoặc mật khẩu"
            visible={loginFailed}
          />
          <FormField
            name="email"
            placeholder="Email"
            iconName="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormField
            name="password"
            placeholder="Mật khẩu"
            iconName="key"
            secureTextEntry
          />
          <SubmitButton title="Đăng nhập" />
        </Form>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ManRegister")}>
          <Text style={styles.registerLink}>Đăng ký ngay</Text>
        </TouchableOpacity>
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerLink: {
    color: colors.secondary,
  },
});

export default ManLoginScreen;
