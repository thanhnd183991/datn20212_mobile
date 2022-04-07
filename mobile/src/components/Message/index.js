import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import Layout from "../../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import AudioPlayer from "../AudioPlayer";
import ContentHyperlink from "../ContentHyperlink";
import { chat_room } from "../../utils/dummyData/chat_room";
import MessageReply from "../MessageReply";
// import Lightbox from "react-native-lightbox-v2";
// import Carousel from "react-native-looped-carousel";

const blue = "#3777f0";
const grey = "lightgrey";

// const renderCarousel = ({ uri }) => (
//   <Carousel style={{ width: Layout.window.width, height: Layout.window.width }}>
//     <Image
//       style={{ flex: 1 }}
//       resizeMode="contain"
//       source={{
//         uri,
//       }}
//     />
//   </Carousel>
// );
const Message = ({ message, setAsMessageReply, lastMessage }) => {
  const [repliedTo, setRepliedTo] = useState(undefined);
  const [user, setUser] = useState();
  const [isMe, setIsMe] = useState(message.user.id === "u1");
  const [soundURI, setSoundURI] = useState(null);

  useEffect(() => {
    // console.log("query message belong to user then set user");

    const repMessage = chat_room.messages.filter(
      (el) => el.id === message.replyTo
    );
    if (repMessage.length > 0) {
      console.log(repMessage);
      setRepliedTo(repMessage[0]);
    }
    // return () => (repliedTo = undefined);
  }, []);

  useEffect(() => {
    // console.log("query reply message from current message");
  }, [message]);

  useEffect(() => {
    // console.log("subscribe to update status of message");
  }, []);

  useEffect(() => {
    setAsRead();
  }, [isMe, message]);

  useEffect(() => {
    if (message.audio) {
    }
  }, [message]);

  useEffect(() => {
    const checkIfMe = async () => {
      if (!user) {
        return;
      }
    };
    // checkIfMe();
  }, [user]);

  const setAsRead = async () => {
    // console.log("message have been read already");
  };

  if (!user) {
    // return <ActivityIndicator />;
  }

  return (
    <Pressable
      onLongPress={setAsMessageReply}
      style={[
        styles.container,
        isMe ? styles.rightContainer : styles.leftContainer,
        { width: soundURI ? "75%" : "auto" },
      ]}
    >
      {repliedTo && (
        <MessageReply
          messageReply={repliedTo}
          isMe={message.user.id === "u1"}
        />
      )}
      {message.images && (
        <View style={{}}>
          <FlatList
            data={message.images}
            numColumns={2}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                resizeMode="cover"
                style={{
                  flex: 1,
                  height: Layout.window.width * 0.35,
                  width: Layout.window.width * 0.35,
                }}
              />
              // <Lightbox
              //   springConfig={{ tension: 15, friction: 7 }}
              //   swipeToDismiss={false}
              //   // renderContent={() => renderCarousel({ uri: item })}
              // >
              //   <Image
              //     source={{ uri: item }}
              //     resizeMode="cover"
              //     style={{
              //       flex: 1,
              //       height: Layout.window.width * 0.35,
              //       width: Layout.window.width * 0.35,
              //     }}
              //   />
              // </Lightbox>
            )}
          />
        </View>
      )}
      {soundURI && <AudioPlayer soundURI={soundURI} />}
      <View>
        {message.content && (
          <ContentHyperlink
            contentText={message.content}
            styleMessage={{
              color: isMe ? "black" : "white",
              backgroundColor: isMe ? grey : blue,
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderRadius: 10,
              borderTopLeftRadius: isMe ? 10 : 0,
              borderTopRightRadius: isMe ? 0 : 10,
            }}
          />
        )}

        {isMe &&
          !!message.status &&
          message.status !== "" &&
          lastMessage.id === message.id && (
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 5,
                justifyContent: "flex-end",
              }}
            >
              <Ionicons
                name={
                  message.status === "DELIVERED"
                    ? "checkmark"
                    : "checkmark-done"
                }
                size={13}
                color="lightgray"
                style={{ marginHorizontal: 5, alignSelf: "flex-end" }}
              />
              <Text style={{ fontSize: 12, color: "lightgray" }}>
                {message.status === "DELIVERED" ? "Đã gửi" : "Đã nhận"}
              </Text>
            </View>
          )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    maxWidth: "75%",
  },
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
    marginLeft: 10,
    marginRight: "auto",
  },
  rightContainer: {
    marginLeft: "auto",
    marginRight: 10,
    alignItems: "flex-end",
  },
});

export default Message;
