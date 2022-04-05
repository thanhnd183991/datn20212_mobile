import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AudioPlayer from "../AudioPlayer";
const blue = "#3777f0";
const grey = "lightgrey";

const MessageReply = ({ messageReply, isMe }) => {
  //   console.log(messageReply);
  console.log(isMe);
  return (
    <View
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
        { width: "auto" },
      ]}
    >
      <Text
        style={{
          color: "lightgray",
          alignSelf: "flex-start",
          marginLeft: 5,
          fontSize: 13,
        }}
      >
        Trả lời tin nhắn
      </Text>
      {messageReply.content ? (
        <Text style={styles.textReply}>{messageReply.content}</Text>
      ) : messageReply?.images?.length > 0 ? (
        <Text style={styles.textReply}>Trả lời tin nhắn ảnh</Text>
      ) : (
        <Text style={styles.textReply}>Trả lời tin tệp đính kèm</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  messageReply: {
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 5,
  },
  leftContainer: {
    marginRight: "auto",
  },
  rightContainer: {
    marginLeft: "auto",
    marginRight: 0,
    alignItems: "flex-end",
  },
  textReply: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    // margin: 10,
    borderRadius: 10,
    backgroundColor: "transparent",
    maxWidth: "75%",
    borderWidth: 1,
    borderColor: "lightgray",
    fontSize: 14,
    fontStyle: "italic",
    color: "lightgray",
  },
});

export default MessageReply;
