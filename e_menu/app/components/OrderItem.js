import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../configs/colors';

function OrderItem({ order }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.col}>
          <Text style={styles.titleText}>{order.item.name}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.titleText}>
            {order.details.quantity} / {order.details.variation.name}
          </Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.titleText}>{order.details.variation.price}đ</Text>
        </View>
      </View>
      <View>
        {order.details.stuff.map((item) => {
          return (
            <View style={styles.stuffItem} key={item._id}>
              <View style={styles.col}>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.number}>x {item.quantity}</Text>
              </View>
              <View style={styles.col}>
                <Text style={styles.subPrice}>
                  {item.quantity * item.price}đ
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: 'bold',
    color: '#3C4146',
    // width: '100%',
    // textAlign: 'left',
  },
  stuffItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginLeft: 14,
  },
  number: {
    color: '#5f6368',
  },
  subPrice: {
    color: colors.medium,
  },
  col: {
    // width: '33.33%',
    // alignItems: 'center',
  },
});

export default OrderItem;
