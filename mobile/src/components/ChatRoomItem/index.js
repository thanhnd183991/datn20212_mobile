import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-elements";
import { fromNow } from "../../utils/dateUtils";

export default function ChatRoomItem({ chatRoom, handleClick }) {
  // const [users, setUsers] = useState<User[]>([]); // all users in this chatroom
  const [user, setUser] = useState(null); // the display user
  const [lastMessage, setLastMessage] = useState();

  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <Avatar
        containerStyle={{ backgroundColor: "#C3A89B" }}
        size="medium"
        rounded
        source={{ uri: chatRoom.avatar }}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chatRoom.chat_room_name}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {fromNow(chatRoom.last_message_created_at)}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {chatRoom?.last_message_content}
        </Text>
      </View>
    </Pressable>
  );
}
