import React from 'react';
import { TouchableOpacity, StyleSheet, Image, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import colors from '../configs/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function CartItem({ cardItem, onDelete }) {
  const { key, item, orderDetails } = cardItem;
  const formatStuff = () => {
    return orderDetails.stuff.reduce((p, c) => {
      return p + `${p.length === 0 ? '' : ', '} x${c.quantity} ${c.name}`;
    }, '');
  };
  return (
    <Swipeable
      renderRightActions={() => {
        return (
          <TouchableOpacity
            onPress={() => {
              onDelete(key);
            }}
            style={{ alignSelf: 'center' }}
          >
            <MaterialCommunityIcons
              size={26}
              color="#f88e86"
              name="trash-can-outline"
            />
          </TouchableOpacity>
        );
      }}
    >
      <TouchableOpacity style={styles.container}>
        <View>
          <Image source={{ uri: item.images[0].url }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={{ flex: 1 }}>
            <Text
              style={styles.title}
            >{`x${orderDetails.quantity} ${item.name}`}</Text>
            {orderDetails.stuff.length > 0 && (
              <Text style={styles.extra}>{formatStuff()}</Text>
            )}
          </View>
          <Text style={styles.price}>{orderDetails.totalPrice}đ</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 12,
    elevation: 1,
    margin: 6,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 22,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#272727',
    marginBottom: 6,
  },
  extra: {
    color: colors.medium,
  },
  price: {
    fontWeight: 'bold',
    color: colors.primary,
    fontSize: 16,
  },
});

export default CartItem;
