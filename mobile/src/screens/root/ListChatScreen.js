import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { ChatRoomItem } from "../../components/";
import { ChatRoute } from "../../constants/PathRoutes";
import { group_chats } from "../../utils/dummyData/group_chats";

export default function ListChatScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const handleClick = () => {
    navigation.navigate(ChatRoute);
  };
  return (
    <View style={styles.page}>
      <SearchBar
        placeholder="Tìm kiếm người/nhóm"
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={{
          backgroundColor: "white",
          borderRadius: 20,
        }}
        inputStyle={{
          padding: 0,
          fontSize: 15,
        }}
        containerStyle={{ backgroundColor: "#FDF5F1" }}
        lightTheme={{ backgroundColor: "#FDF5F1" }}
      />
      <FlatList
        data={group_chats}
        renderItem={({ item }) => (
          <ChatRoomItem chatRoom={item} handleClick={handleClick} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
