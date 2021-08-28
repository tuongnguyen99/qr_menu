import { useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Counter from '../Counter';
import ListItem from '../ListItem';

function FormListCounter({ name, minCount = 0, maxCount = 100, items = [] }) {
  const { values, setFieldValue, setFieldTouched, errors, touched, insert } =
    useFormikContext();

  const handleIncrease = (i) => {
    const list = values[name];
    const index = list.findIndex((listItem) => {
      return listItem._id === i._id;
    });

    if (index === -1) {
      i.quantity = 1;
      list.push(i);
    } else if (list[index].quantity < maxCount) {
      list[index].quantity += 1;
    } else return;

    setFieldValue(name, list);
  };

  const handleDecrease = (i) => {
    let list = values[name];
    const index = list.findIndex((listItem) => {
      return listItem._id === i._id;
    });

    if (index === -1) return;
    if (list[index].quantity > minCount + 1) {
      list[index].quantity -= 1;
    } else {
      list = list.filter((listItem) => {
        return listItem._id !== i._id;
      });
    }

    setFieldValue(name, list);
  };

  const getItemQuantity = (i) => {
    const list = values[name];
    const index = list.findIndex((listItem) => {
      return listItem._id === i._id;
    });
    return index === -1 ? 0 : list[index].quantity;
  };

  return (
    <View style={styles.container}>
      {items.map((i) => {
        return (
          <ListItem
            disabled
            key={i._id}
            text={i.name}
            subText={i.price + "đ"}
            renderLeftAction={() => {
              return (
                <Counter
                  value={getItemQuantity(i)}
                  onIncrease={() => {
                    handleIncrease(i);
                  }}
                  onDecrease={() => {
                    handleDecrease(i);
                  }}
                />
              );
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default FormListCounter;
