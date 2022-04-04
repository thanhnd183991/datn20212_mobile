import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Input, Button, Avatar, Icon } from "react-native-elements";
import { users } from "../../utils/dummyData/users";
import { imagePicker } from "../../utils/media/image";
import validate from "../../utils/FormValidations/editProfileValidation";
import { HomeRoute, SignupRoute } from "../../constants/PathRoutes";

const EditProfileScreen = ({ navigation }) => {
  const user = users[0];
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            name: user.name,
            user_name: user.user_name,
            email: user.email,
            address: user.address,
            date_of_birth: user.date_of_birth,
            avatar: user.profile_media_url,
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
          }}
          validate={validate}
        >
          {({
            handleSubmit,
            handleChange,
            errors,
            setFieldValue,
            values,
            touched,
          }) => (
            <View style={styles.formWrapper}>
              <View style={{ alignItems: "center" }}>
                <Avatar
                  size={120}
                  rounded
                  source={{ uri: values.avatar }}
                  title="Bj"
                  containerStyle={{ backgroundColor: "grey" }}
                >
                  <Avatar.Accessory
                    onPress={() => imagePicker(setFieldValue, "avatar")}
                    size={23}
                  />
                </Avatar>
              </View>
              <View style={[styles.inputWrapper, { marginTop: 10 }]}>
                <Input
                  placeholder="Nhập tên của bạn"
                  label="Tên"
                  onChangeText={handleChange("name")}
                  value={values.name}
                  errorStyle={{ color: "red", fontSize: 13 }}
                  errorMessage={errors.name && touched.name ? errors.name : ""}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Input
                  placeholder={"Nhập tên người dùng của bạn"}
                  label="Tên người dùng"
                  onChangeText={handleChange("username")}
                  value={values.user_name}
                  errorStyle={{ color: "red", fontSize: 13 }}
                  errorMessage={
                    errors.username && touched.username ? errors.username : ""
                  }
                />
              </View>
              <View style={styles.inputWrapper}>
                <Input
                  placeholder={"Nhập email dùng của bạn"}
                  label={"Email"}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  errorStyle={{ color: "red", fontSize: 13 }}
                  errorMessage={
                    errors.email && touched.email ? errors.email : ""
                  }
                />
              </View>

              <Button
                title="Lưu"
                loading={false}
                loadingProps={{ size: "small", color: "white" }}
                buttonStyle={{
                  backgroundColor: "rgba(111, 202, 186, 1)",
                  borderRadius: 5,
                }}
                titleStyle={{ fontWeight: "bold", fontSize: 18 }}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 200,
                  marginVertical: 10,
                }}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#FDF5F1",
  },
  formWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500,
  },
  inputWrapper: {
    marginBottom: 10,
    width: "100%",
    // backgroundColor: "red",
  },
  register: {
    color: "gray",
    width: "100%",
    flexDirection: "row",
  },
  textRegister: {
    color: "lightgray",
    textDecorationLine: "underline",
    textDecorationColor: "lightgray",
  },
});
