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
import validate from "../../utils/FormValidations/loginValidation";
import { HomeRoute, SignupRoute } from "../../constants/PathRoutes";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            navigation.navigate(HomeRoute);
            resetForm({});
          }}
          validate={validate}
        >
          {({ handleSubmit, handleChange, errors, values, touched }) => (
            <View style={styles.formWrapper}>
              <Avatar
                rounded
                size="medium"
                overlayContainerStyle={{ backgroundColor: "lightgray" }}
                icon={{ name: "lock", type: "font-awesome", color: "gray" }}
                activeOpacity={0.7}
              />
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Nhập email của bạn"
                  leftIcon={
                    <Icon
                      name="user"
                      style={{ width: 25 }}
                      type="font-awesome"
                      size={24}
                      color="gray"
                    />
                  }
                  onChangeText={handleChange("email")}
                  style={{ color: "#fff", marginBottom: 0 }}
                  value={values.email}
                  errorStyle={{ color: "red", fontSize: 13 }}
                  errorMessage={
                    errors.email && touched.email ? errors.email : ""
                  }
                />
              </View>
              {/* <View style={styles.inputWrapper}> */}
              <Input
                placeholder={"Nhập mật khẩu của bạn"}
                leftIcon={
                  <Icon
                    name="key"
                    type="font-awesome"
                    style={{ width: 25 }}
                    size={24}
                    color="gray"
                  />
                }
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                style={{ color: "#fff", marginBottom: 0 }}
                value={values.password}
                errorStyle={{ color: "red", fontSize: 13 }}
                errorMessage={
                  errors.password && touched.password ? errors.password : ""
                }
              />
              {/* </View> */}

              <Button
                title="Đăng nhập"
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
              <View style={styles.register}>
                <Text style={{ color: "gray" }}>Bạn đã có mật khẩu?</Text>
                <Pressable onPress={() => navigation.navigate(SignupRoute)}>
                  <Text style={styles.textRegister}>Đăng ký</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#4a3737",
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
