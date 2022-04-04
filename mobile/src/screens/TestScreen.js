import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Avatar, Input, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TestScreen = () => {
  const getData = () => {
    AsyncStorage.getItem("user")
      .then(() => {
        console.log("good");
      })
      .catch((e) => console.console(e.message));
  };
  useEffect(() => {
    getData();
    return;
  }, []);
  return (
    <View>
      <Avatar
        rounded
        size="medium"
        overlayContainerStyle={{ backgroundColor: "lightgray" }}
        icon={{ name: "lock", type: "font-awesome", color: "gray" }}
        activeOpacity={0.7}
      />
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
        // onChangeText={handleChange("email")}
        style={{ color: "#fff", marginBottom: 10 }}
        // value={values.email}
        errorStyle={{ color: "red", fontSize: 13 }}
        // errorMessage={errors.email && touched.email ? errors.email : ""}
      />
    </View>
  );
};

export default TestScreen;
