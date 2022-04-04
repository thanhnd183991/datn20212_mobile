import { Formik } from "formik";
import React from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/FontAwesome";
import validate from "../../utils/FormValidations/registrationValidation";
import { LoginRoute } from "../../constants/PathRoutes";

const SignupScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            Alert("login sucess");
            resetForm({});
          }}
          validateOnChange={true}
          validate={validate}
        >
          {({
            handleSubmit,
            errors,
            values,
            touched,
            handleChange,
            isSubmitting,
          }) => (
            <View style={styles.formWrapper}>
              <Avatar
                rounded
                size="medium"
                overlayContainerStyle={{ backgroundColor: "lightgray" }}
                icon={{ name: "lock", type: "font-awesome", color: "gray" }}
                activeOpacity={0.7}
              />
              <Input
                placeholder={"Nhập email của bạn"}
                leftIcon={
                  <Icon
                    name="user"
                    style={{ width: 25 }}
                    size={24}
                    color="gray"
                  />
                }
                secureTextEntry={true}
                onChangeText={handleChange("email")}
                style={{ color: "#fff", marginBottom: 0 }}
                value={values.email}
                errorStyle={{ color: "red", fontSize: 13 }}
                errorMessage={errors.email && touched.email ? errors.email : ""}
              />
              <Input
                placeholder={"Nhập mật khẩu của bạn"}
                leftIcon={
                  <Icon
                    name="key"
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
              <Input
                placeholder={"Xác thực mật khẩu của bạn"}
                leftIcon={
                  <Icon
                    name="key"
                    style={{ width: 25 }}
                    size={24}
                    color="gray"
                  />
                }
                secureTextEntry={true}
                onChangeText={handleChange("confirmPassword")}
                style={{ color: "#fff", marginBottom: 0 }}
                value={values.confirmPassword}
                errorStyle={{ color: "red", fontSize: 13 }}
                errorMessage={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
              <Button
                title="Đăng ký"
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
                <Pressable onPress={() => navigation.navigate(LoginRoute)}>
                  <Text style={styles.textRegister}>Đăng nhập</Text>
                </Pressable>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default SignupScreen;

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
