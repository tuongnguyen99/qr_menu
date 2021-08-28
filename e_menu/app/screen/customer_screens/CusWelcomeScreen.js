import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import colors from '../../configs/colors';

function CusWelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/undraw_eating_together_tjhx.png')}
          style={styles.image}
        />
        <Text style={styles.tagline}>E-menu - The Future of Order</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text style={styles.text}>Choose your plan</Text>
        <Button title="Login" onPress={() => navigation.navigate('CusLogin')} />
        <Button
          title="Continue without login"
          backgroundColor={colors.secondary}
        />
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
});

export default CusWelcomeScreen;
