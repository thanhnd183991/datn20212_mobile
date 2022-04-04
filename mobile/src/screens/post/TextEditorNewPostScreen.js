import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Avatar, Button, Header, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ActionButtons } from "../../components";
import { users } from "../../utils/dummyData/users";

const TempScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const user = users[0];
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Header
          backgroundColor="#FDF5F1"
          barStyle="dark-content"
          leftComponent={
            <Icon
              name="chevron-left"
              type="font-awesome"
              style={{ width: 25, padding: 10 }}
              size={20}
              color="#000"
              onPress={() => navigation.goBack()}
            />
          }
          centerComponent={{
            text: "Tạo bài viết mới",
            style: { color: "#000", fontWeight: "bold", fontSize: 20 },
          }}
          rightComponent={
            <Button
              title="Đăng"
              buttonStyle={{ paddingHorizontal: 8, paddingVertical: 5 }}
              onPress={() => {
                console.log(text);
              }}
            />
          }
        />
        <View style={{ flexDirection: "row", margin: 10 }}>
          <Avatar
            containerStyle={{ backgroundColor: "#C3A89B", marginRight: 10 }}
            size="medium"
            rounded
            source={{ uri: user.profile_media_url }}
          />
          <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
        </View>
        <View style={styles.inputArea}>
          <TextInput
            placeholder="Nội dung bài viết"
            style={styles.input}
            onChangeText={setText}
            multiline
            value={text}
          />
        </View>
        <ActionButtons setText={setText} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default TempScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FDF5F1",
  },
  inputArea: {
    flex: 1,
    padding: 5,
  },
  input: { height: "100%", fontSize: 18, textAlignVertical: "top" },
});
