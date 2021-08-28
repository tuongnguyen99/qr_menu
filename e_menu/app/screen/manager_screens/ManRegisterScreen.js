import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../../components/forms";
import colors from "../../configs/colors";
import * as Yup from "yup";
import "yup-phone";
import useApi from "../../hooks/useApi";
import usersApi from "../../api/users";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";

const validationScheme = Yup.object().shape({
  name: Yup.string().min(1).required(),
  email: Yup.string()
    .email()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    ),
  // phone: Yup.string().phone().required(),
  phone: Yup.string().required(),
  shopName: Yup.string().min(1).required(),
  password: Yup.string().min(5).required(),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

const initialValues = {
  name: "",
  email: "",
  phone: "",
  shopName: "",
  password: "",
  passwordConfirmation: "",
  address: "",
};

function ManRegisterScreen({ navigation }) {
  const regisMangerApi = useApi(usersApi.regisManager);
  const loginApi = useApi(authApi.loginAsManager);
  const auth = useAuth();

  const handleSubmit = async ({ email, password, name, shopName, phone }) => {
    const res = await regisMangerApi.request(
      email,
      password,
      name,
      shopName,
      phone
    );
    if (res.ok) {
      const user = res.data.manager;
      const response = await loginApi.request(user.email, user.password);
      if (response.ok) auth.login(response.data);
      else
        Alert.alert(
          "Thông báo",
          "Không thể tạo tài khoản, vui lòng thử lại sau"
        );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ActivityIndicator
          color={colors.primary}
          animating={regisMangerApi.loading}
        />
        <Text style={styles.tagline}>Đăng ký</Text>
      </View>
      <View>
        <Form
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationScheme}
        >
          <ErrorMessage
            error={regisMangerApi.error}
            visible={regisMangerApi.error}
          />
          <FormField name="name" placeholder="Tên" iconName="account" />
          <FormField
            name="email"
            placeholder="Email"
            iconName="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormField
            name="phone"
            placeholder="Số điện thoại"
            iconName="phone"
          />
          <FormField
            name="shopName"
            placeholder="Tên cửa hàng"
            iconName="store"
          />
          <FormField
            name="address"
            placeholder="Địa chỉ"
            iconName="map-marker"
          />
          <FormField
            secureTextEntry
            name="password"
            placeholder="Mật khẩu"
            iconName="key"
          />
          <FormField
            secureTextEntry
            name="passwordConfirmation"
            placeholder="Nhập lại mật khẩu"
            iconName="key"
          />
          <SubmitButton title="Đăng ký" />
        </Form>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("ManLogin")}>
          <Text style={styles.registerLink}>Đăng nhập</Text>
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
    marginTop: 60,
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

export default ManRegisterScreen;
