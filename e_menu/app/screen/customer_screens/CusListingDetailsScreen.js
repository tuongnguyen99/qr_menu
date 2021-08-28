import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import {
  Form,
  FormCounter,
  FormField,
  FormPillPicker,
  SubmitButton,
} from "../../components/forms";

import FormCalculationResult from "../../components/forms/FormCalculationResult";
import FormListCounter from "../../components/forms/FormListCounter";
import colors from "../../configs/colors";
import CartContext from "../../context/CartContext";
import LottieView from "lottie-react-native";
import shortid from "shortid";
import { SliderBox } from "react-native-image-slider-box";

function CusListingDetailsScreen({ route }) {
  const listing = route.params;
  const [animating, setAnimating] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const handleSubmit = (values) => {
    values.orderTime = Date.now().toString();
    values.totalPrice = calculateTotalPrice(values);
    setCart([
      ...cart,
      { key: shortid.generate(), item: listing, orderDetails: values },
    ]);
    setAnimating(true);
  };

  const calculateTotalPrice = (values) => {
    const stuffTotal = values["stuff"].reduce((b, c) => {
      return b + c.price * c.quantity;
    }, 0);

    return values["variation"].price * values["quantity"] + stuffTotal;
  };

  const getImages = () => {
    return listing.images.map((image) => image.url);
  };

  return (
    <View style={styles.container}>
      {animating && (
        <LottieView
          style={{ elevation: 2 }}
          source={require("../../assets/animations/loader.json")}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setAnimating(false);
          }}
        />
      )}
      {/* <Image
        style={styles.image}
        source={{ uri: listing.images[0].url }}
        resizeMode="cover"
      /> */}
      <SliderBox
        style={styles.slider}
        images={getImages()}
        dotColor={colors.primary}
        autoPlay
      />
      <ScrollView>
        <View style={styles.body}>
          <Form
            // innerRef={formRef}
            initialValues={{
              stuff: [],
              quantity: 1,
              variation: listing.variations[0],
              requirements: "",
            }}
            onSubmit={handleSubmit}
          >
            <View style={styles.header}>
              <Text style={styles.title}>{listing.name}</Text>
              <FormCalculationResult calculateMethod={calculateTotalPrice} />
            </View>
            <FormPillPicker name="variation" items={listing.variations} />
            <FormCounter name="quantity" min={1} max={50} />
            {listing.stuff.length > 0 && (
              <View>
                <Text style={styles.heading}>Gọi thêm</Text>
                <FormListCounter name="stuff" items={listing.stuff} />
              </View>
            )}
            {/* <FormField name="requirements" placeholder="Special requirements" /> */}
            <SubmitButton title="Thêm vào giỏ hàng" />
          </Form>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  slider: {
    width: "100%",
    height: 250,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: colors.dark,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  body: {
    padding: 10,
    marginBottom: 20,
  },
});

export default CusListingDetailsScreen;
