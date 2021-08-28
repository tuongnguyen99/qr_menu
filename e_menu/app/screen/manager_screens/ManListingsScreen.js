import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SafeArea from '../../components/SafeArea';

function ManListingsScreen(props) {
  return (
    <View style={styles.container}>
      <SafeArea>
        <View>
          <Text style={styles.title}>All</Text>
          <Text style={styles.strongTitle}>Listings</Text>
        </View>
      </SafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#7b7b7b',
  },
  strongTitle: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#222222',
  },
});

export default ManListingsScreen;
