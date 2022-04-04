import React from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Message, MessageInput } from "../../components/";
import { ChatRoute } from "../../constants/PathRoutes";
import { chat_room } from "../../utils/dummyData/chat_room";

export default function ChatScreen({ route, navigation }) {
  const handleClick = () => navigation.navigate(ChatRoute);

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chat_room.messages}
        renderItem={({ item }) => <Message message={item} />}
        showsVerticalScrollIndicator={false}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
