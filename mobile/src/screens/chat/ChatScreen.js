import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { Message, MessageInput } from "../../components/";
import { ChatRoute } from "../../constants/PathRoutes";
import { chat_room } from "../../utils/dummyData/chat_room";

export default function ChatScreen({ route, navigation }) {
  const handleClick = () => navigation.navigate(ChatRoute);
  const [messageReplyTo, setMessageReplyTo] = useState(null);
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={chat_room.messages}
        renderItem={({ item }) => (
          <Message
            message={item}
            lastMessage={chat_room.messages[0]}
            setAsMessageReply={() => setMessageReplyTo(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        inverted
      />
      <MessageInput
        messageReplyTo={messageReplyTo}
        removeMessageReplyTo={() => setMessageReplyTo(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
