import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Form, FormField, SubmitButton } from '../../components/forms';
import colors from '../../configs/colors';

function CusRegisterScreen({ navigation }) {
  const handleSubmit = () => {
    // submit to server
    //...
    navigation.navigate('CusApp');
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/undraw_profile_details_f8b7.png')}
          style={styles.image}
        />
        <Text style={styles.tagline}>Register</Text>
      </View>
      <View>
        <Form
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <FormField name="name" placeholder="Name" />
          <FormField
            name="email"
            placeholder="email"
            iconName="email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormField name="password" placeholder="Password" />
          <FormField
            name="passwordConfirmation"
            placeholder="Confirm password"
          />
          <SubmitButton title="Register" />
        </Form>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('ManLogin')}>
          <Text style={styles.registerLink}>Sign In now</Text>
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
    marginTop: 60,
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

export default CusRegisterScreen;
