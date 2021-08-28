import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from '../../components/forms';
import colors from '../../configs/colors';
import * as Yup from 'yup';
import authApi from '../../api/auth';
import useAuth from '../../auth/useAuth';

const validationScheme = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(4).required().label('Password'),
});

function CusLoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  const auth = useAuth();

  const handleSubmit = async ({ email, password }) => {
    setLoginFailed(false);
    const result = await authApi.loginAsCustomer(email, password);
    if (!result.ok) return setLoginFailed(true);
    auth.login(result.data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/undraw_Access_account_re_8spm.png')}
          style={styles.image}
        />
        <Text style={styles.tagline}>Login</Text>
      </View>
      <View>
        <Form
          validationScheme={validationScheme}
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <ErrorMessage
            error="Invalid email of password"
            visible={loginFailed}
          />
          <FormField
            name="email"
            placeholder="email"
            iconName="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormField name="password" placeholder="password" iconName="key" />
          <SubmitButton title="Login" />
        </Form>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Don't have a account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CusRegister')}>
          <Text style={styles.registerLink}>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 300,
    height: 300,
  },
  tagline: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.medium,
  },
  text: {
    alignSelf: 'center',
    marginBottom: 10,
    color: colors.medium,
    opacity: 0.6,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerLink: {
    color: colors.secondary,
  },
});

export default CusLoginScreen;
