import React from "react";
import { Text, View, Pressable } from "react-native";
import { Avatar, Button } from "react-native-elements";
import { TextEditorNewPostRoute } from "../../constants/PathRoutes";
import styles from "./styles";

const CreatePost = ({ user, navigation }) => {
  return (
    <View style={styles.createPost}>
      <Text style={[styles.textDesc, { fontSize: 16 }]}>Bài viết mới</Text>
      <View style={styles.inputWrapper}>
        <Avatar
          containerStyle={{ backgroundColor: "#C3A89B" }}
          size={40}
          rounded
          source={{ uri: user?.profile_media_url }}
        />
        <Pressable
          style={{ flex: 1 }}
          onPress={() => navigation.navigate(TextEditorNewPostRoute)}
        >
          <Text style={styles.placeholder}>Nội dung bài viết</Text>
        </Pressable>
      </View>
      {/* <View style={styles.actions}>
        <View style={styles.button}>
          <Button
            title="Ảnh"
            icon={{
              name: "image",
              type: "font-awesome",
              size: 15,
              color: "gray",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ color: "gray" }}
            buttonStyle={{
              backgroundColor: "#FDF5F1",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 8,
            }}
            containerStyle={{
              width: "90%",
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Tệp đính kèm"
            icon={{
              name: "file",
              type: "font-awesome",
              size: 15,
              color: "gray",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ color: "gray" }}
            buttonStyle={{
              backgroundColor: "#FDF5F1",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 8,
            }}
            containerStyle={{
              width: "90%",
            }}
          />
        </View>
      </View> */}
    </View>
  );
};

export default CreatePost;
