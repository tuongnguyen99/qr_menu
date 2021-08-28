import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import {
  Form,
  FormField,
  FormImagePicker,
  FormPicker,
  SubmitButton,
} from "../../components/forms";
import FormListInput from "../../components/forms/FormListInput";
import * as Yup from "yup";
import useApi from "../../hooks/useApi";
import menuItemApi from "../../api/menuItem";
import categoriesApi from "../../api/categories";
import colors from "../../configs/colors";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import shortid from "shortid";
import FormSwitch from "../../components/forms/FormSwitch";

const validationScheme = Yup.object().shape({
  images: Yup.array().min(1).required(),
  name: Yup.string().min(1).required(),
  description: Yup.string().optional(),
  stuff: Yup.array().of(
    Yup.object()
      .shape({
        name: Yup.string().min(1).required(),
        price: Yup.number().min(1).required(),
      })
      .optional()
      .nullable()
  ),
  variations: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(1).required(),
        price: Yup.number().min(1).required(),
      })
    )
    .min(1),
  category: Yup.object().required(),
  processingTime: Yup.number().min(1).max(120).required(),
});

const emptyInitial = {
  images: [],
  name: "",
  description: "",
  stuff: [],
  variations: [],
  category: {},
  serving: true,
  processingTime: 15,
};

function ManMenuItemEditScreen({ route }) {
  const createMenuItemApi = useApi(menuItemApi.createMenuItem);
  const getCategoriesApi = useApi(categoriesApi.getCategories);
  const updateMenuItemApi = useApi(menuItemApi.updateMenuItem);
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    setFormInit();
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async (values) => {
    if (route.params) return updateMenuItem(values);
    const res = await createMenuItemApi.request(values);
    if (!res.ok)
      return Alert.alert("Thông báo", "Có lỗi xảy ra, vui lòng thử lại sau!");
    Alert.alert("Thông báo", "Thêm món thành công");
  };

  const updateMenuItem = (values) => {
    const imgs = route.params.images.filter(({ url }) => {
      return url.startsWith("http") && values.images.indexOf(url) > -1;
    });

    const images = imgs.map((img) => img.name);
    const newImages = values.images.filter((img) => {
      return img.startsWith("file");
    });

    updateMenuItemApi.request(route.params._id, {
      ...values,
      images,
      newImages,
    });
  };

  const generateKey = (obj) => {
    obj.key = shortid.generate();
    return obj;
  };

  const setFormInit = () => {
    const item = route.params;
    if (!item) return setInitialValues(emptyInitial);
    setInitialValues({
      // images: item.images,
      images: item.images.map((image) => image.url),
      name: item.name,
      description: item.description,
      stuff: item.stuff.map((s) => {
        return generateKey(s);
      }),
      variations: item.variations.map((v) => {
        return generateKey(v);
      }),
      category: item.category,
      serving: item.serving,
      processingTime: item.processingTime,
    });
  };

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <ActivityIndicator
          animating={createMenuItemApi.loading || updateMenuItemApi.loading}
          color={colors.primary}
        />
        {initialValues && (
          <Form
            initialValues={initialValues}
            validationSchema={validationScheme}
            onSubmit={handleSubmit}
          >
            <FormImagePicker name="images" />
            <FormField name="name" iconName="food" placeholder="Tên" />
            <FormField name="description" iconName="more" placeholder="Mô tả" />
            <FormListInput
              name="stuff"
              title="Gọi thêm"
              attributes={[
                { name: "name", placeholder: "Tên", type: "text" },
                { name: "price", placeholder: "Giá", type: "number" },
              ]}
            />
            <FormListInput
              name="variations"
              title="Biến thể"
              attributes={[
                { name: "name", placeholder: "Tên", type: "text" },
                { name: "price", placeholder: "Giá", type: "number" },
              ]}
            />
            <FormPicker
              iconName="apps"
              name="category"
              items={getCategoriesApi.data.categories}
              placeholder="Danh mục"
            />
            <FormSwitch
              name="serving"
              iconName="food-variant-off"
              text="Đang phục vụ"
            />
            <FormField
              keyboardType="numeric"
              name="processingTime"
              iconName="food"
              placeholder="Thời gian chuẩn bị (phút)"
            />

            <SubmitButton title={!route.params ? "Thêm món" : "Cập nhật"} />
          </Form>
        )}
      </View>
    </KeyboardAvoidingWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
});

export default ManMenuItemEditScreen;
