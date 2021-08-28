import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import CardVertical from "../../components/CardVertical";
import Section from "../../components/Section";
import useApi from "../../hooks/useApi";
import menuItemApi from "../../api/menuItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../configs/colors";

function ManFoodListingScreen({ navigation }) {
  const getMenuItemsApi = useApi(menuItemApi.getMenuItems);
  const updateMenuItemApi = useApi(menuItemApi.updateMenuItem);
  const deleteMenuItemApi = useApi(menuItemApi.deleteMenuItem);
  useEffect(() => {
    getMenuItemsApi.request();
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  var groupByCategory = function (list) {
    return list.reduce(function (a, b) {
      const cName = b.category.name;
      if (!a[cName]) a[cName] = [];
      a[cName].push(b);
      return a;
    }, {});
  };

  const handleDelete = async (item) => {
    Alert.alert("Bạn có muốn xóa mục vừa chọn?", "", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Có",
        onPress: async () => {
          const result = await deleteMenuItemApi.request(item._id);
          console.log(result);
          if (result.ok) {
            getMenuItemsApi.request();
          } else {
            alert("Không thể xóa mục vừa chọn. Vui lòng thử lại sau");
          }
        },
      },
    ]);
  };

  const handleServingUpdate = async (item) => {
    const result = await updateMenuItemApi.request(item._id, {
      serving: !item.serving,
    });
    if (result.ok) {
      getMenuItemsApi.request();
    } else {
      console.log(result);
      alert("Không thể cập nhật trạng thái món. Vui lòng thử lại sau");
    }
  };

  const renderMenu = (navigation) => {
    const items = groupByCategory(getMenuItemsApi.data);
    return Object.keys(items).map((cName) => {
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
                  renderActions={() => {
                    return (
                      <View style={styles.actionContainer}>
                        <TouchableOpacity
                          style={styles.buttonDelete}
                          onPress={() => handleDelete(item)}
                        >
                          <MaterialCommunityIcons
                            color="#fff"
                            name="trash-can-outline"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleServingUpdate(item)}
                          style={[
                            styles.buttonStopServing,
                            item.serving && { backgroundColor: colors.primary },
                          ]}
                        >
                          <MaterialCommunityIcons
                            color="#fff"
                            name={item.serving ? "food" : "food-off"}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  key={item.name}
                  title={item.name}
                  imageUrl={item.images[0].url}
                  categoryName={item.category.name}
                  rate={item.rate}
                  processingTime={item.processingTime}
                  price={item.variations[0].price}
                  onPress={() => navigation.navigate("ManFoodEdit", item)}
                />
              );
            })}
          </ScrollView>
        </Section>
      );
    });
  };

  return (
    <View style={styles.container}>
      {/* <SafeArea> */}
      {/* <ActivityIndicator
        color={colors.primary}
        animating={getMenuItemsApi.loading}
      /> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={getMenuItemsApi.loading}
            onRefresh={() => {
              getMenuItemsApi.request();
            }}
          />
        }
      >
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            navigation.navigate("ManFoodEdit");
          }}
        >
          <MaterialCommunityIcons name="plus" size={18} />
        </TouchableOpacity>
        {renderMenu(navigation)}
      </ScrollView>
      {/* </SafeArea> */}
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
  buttonAdd: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    marginRight: 10,
    borderColor: "#aaa",
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  actionContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: "space-between",
  },
  buttonDelete: {
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: "#fff",
  },
  buttonStopServing: {
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.secondary,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default ManFoodListingScreen;
