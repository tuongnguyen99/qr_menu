import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../../components/forms";
import ListItem from "../../components/ListItem";
import Separator from "../../components/Separator";
import colors from "../../configs/colors";
import useApi from "../../hooks/useApi";
import categoriesApi from "../../api/categories";
import * as Yup from "yup";
import { Swipeable } from "react-native-gesture-handler";
import CategoryListItem from "../../components/CategoryListItem";

const validationScheme = Yup.object().shape({
  categoryName: Yup.string().min(2).required().label("Category name"),
});

function ManCategoriesScreen(props) {
  const getCategoriesApi = useApi(categoriesApi.getCategories);
  const createCategoryApi = useApi(categoriesApi.createCategory);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async ({ categoryName }) => {
    const res = await createCategoryApi.request(categoryName);
    if (res.ok) getCategoriesApi.request();
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={getCategoriesApi.loading || createCategoryApi.loading}
        color={colors.medium}
      />
      <ErrorMessage
        error={createCategoryApi.error}
        visible={createCategoryApi.error}
      />
      <ErrorMessage
        error="Error: Get categories"
        visible={getCategoriesApi.error}
      />
      <FlatList
        data={getCategoriesApi.data.categories}
        keyExtractor={(c) => {
          return c._id + "";
        }}
        renderItem={({ item }) => {
          return <CategoryListItem title={item.name} />;
        }}
        ItemSeparatorComponent={Separator}
        refreshing={refreshing}
        onRefresh={() => getCategoriesApi.request()}
      />
      <View>
        <Form
          initialValues={{ categoryName: "" }}
          validationSchema={validationScheme}
          onSubmit={handleSubmit}
        >
          <FormField name="categoryName" placeholder="Danh mục mới" />
          <SubmitButton title="Thêm" />
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  modalClose: {
    color: colors.secondary,
    alignSelf: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

export default ManCategoriesScreen;
