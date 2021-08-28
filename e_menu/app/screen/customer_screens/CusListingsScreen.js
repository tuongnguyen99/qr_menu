import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import CardHorizontal from "../../components/CardHorizontal";
import CardVertical from "../../components/CardVertical";
import Pill from "../../components/Pill";
import Section from "../../components/Section";
import colors from "../../configs/colors";
import SafeArea from "../../components/SafeArea";
import IndentContext from "../../context/IndentContext";
import useApi from "../../hooks/useApi";
import categoriesApi from "../../api/categories";
import menuItemApi from "../../api/menuItem";

function CusListingsScreen({ navigation, route }) {
  const indent = React.useContext(IndentContext);
  const getCategoriesApi = useApi(categoriesApi.getShopCategories);
  const getMenuItemsApi = useApi(menuItemApi.getShopMenuItems);
  const [selectedCategory, setSelectedCategory] = useState({ _id: "_all" });

  useEffect(() => {
    getCategoriesApi.request(indent._id);
    getMenuItemsApi.request(indent._id);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const getMenuItemsByCategory = () => {
    if (!getMenuItemsApi.data) return [];
    if (selectedCategory._id === "_all") return getMenuItemsApi.data;
    return getMenuItemsApi.data.filter((i) => {
      return i.category._id === selectedCategory._id;
    });
  };

  const renderMenu = (navigation) => {
    return selectedCategory._id === "_all"
      ? renderAll(navigation)
      : renderByCategory(navigation);
  };

  const renderAll = (navigation) => {
    const items = groupByCategory(getMenuItemsApi.data);
    return (
      <ScrollView>
        {Object.keys(items).map((cName) => {
          return (
            <Section title={cName} maxHeight={300} key={cName}>
              <ScrollView
                nestedScrollEnabled={true}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {items[cName].map((item) => {
                  return (
                    <CardVertical
                      key={item.name}
                      title={item.name}
                      imageUrl={item.images[0].url}
                      categoryName={item.category.name}
                      rate={item.rate}
                      price={item.variations[0].price}
                      processingTime={item.processingTime}
                      onPress={() =>
                        navigation.navigate("ListingDetails", item)
                      }
                    />
                  );
                })}
              </ScrollView>
            </Section>
          );
        })}
      </ScrollView>
    );
  };
  const renderByCategory = (navigation) => {
    const menuItems = getMenuItemsByCategory();
    return (
      <FlatList
        data={menuItems}
        keyExtractor={(item) => {
          return item._id;
        }}
        renderItem={({ item }) => {
          return (
            <CardHorizontal
              title={item.name}
              imageUrl={item.images[0].url}
              categoryName={item.category.name}
              rate={item.rate}
              price={item.variations[0].price}
              onPress={() => navigation.navigate("ListingDetails", item)}
              processingTime={item.processingTime}
            />
          );
        }}
      />
    );
  };

  const renderCategories = () => {
    return (
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} cnest>
          <Pill
            backgroundColor={
              "_all" === selectedCategory._id ? colors.primary : colors.light
              // colors.primary
            }
            key={"_all"}
            text={"Tất cả"}
            onPress={() => {
              handleCategorySelect({ _id: "_all" });
            }}
          />
          {getCategoriesApi.data.categories.map((c) => {
            return (
              <Pill
                backgroundColor={
                  c._id === selectedCategory._id ? colors.primary : colors.light
                  // colors.primary
                }
                key={c._id}
                text={c.name}
                onPress={() => {
                  handleCategorySelect(c);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  };

  var groupByCategory = function (list) {
    return list.reduce(function (a, b) {
      const cName = b.category.name;
      if (!a[cName]) a[cName] = [];
      a[cName].push(b);
      return a;
    }, {});
  };

  return (
    <View style={styles.container}>
      <SafeArea>
        <View>
          <Text style={styles.title}>Xin mời </Text>
          <Text style={styles.strongTitle}>chọn món</Text>
        </View>
        <ActivityIndicator
          color={colors.primary}
          animating={getCategoriesApi.loading || getMenuItemsApi.loading}
        />
        {getCategoriesApi.done && renderCategories()}
        {getMenuItemsApi.done && renderMenu(navigation)}
      </SafeArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: "#fdfdfd",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#7b7b7b",
  },
  strongTitle: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#222222",
  },
  categoriesContainer: {
    marginVertical: 20,
  },
});

export default CusListingsScreen;
