import React, { useState } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { ChatRoomItem } from "../../components/";
import { group_chats } from "../../utils/dummyData/group_chats";
import { fromNow } from "../../utils/dateUtils";

export default function NotificationScreen({ navigation }) {
  const handleClick = () => {
    navigation.navigate(ChatRoute);
  };
  return (
    <View style={styles.page}>
      <FlatList
        data={group_chats}
        renderItem={({ item }) => (
          <ItemNotification notification={item} handleClick={handleClick} />
        )}
        style={{ margin: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const ItemNotification = ({ notification, handleClick }) => {
  return (
    <View style={styles.wrapperNotification}>
      <View style={styles.topNotification}>
        <Text style={{ fontWeight: "bold" }}>
          {notification.chat_room_name}
        </Text>
        <Text style={{ color: "gray" }}>
          {fromNow(notification.last_message_created_at)}
        </Text>
      </View>
      <Text style={{ marginTop: 5 }}>{notification.last_message_content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#FDF5F1",
  },
  wrapperNotification: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "red",
  },
  topNotification: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
