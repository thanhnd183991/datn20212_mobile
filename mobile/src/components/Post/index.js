import { View, ScrollView, Text, Image, Animated } from "react-native";
import React, { useState } from "react";
import { Avatar, Button } from "react-native-elements";
import { users } from "../../utils/dummyData/users";
import Layout from "../../constants/Layout";
import styles from "./styles";
import { fromNow } from "../../utils/dateUtils";
import { CommentRoute } from "../../constants/PathRoutes";

const Post = ({ post, navigation }) => {
  const user = users[0];
  // console.log(navigation);
  const [currentImage, setCurrentImage] = useState(1);
  const handleScroll = (e) => {
    const curImage = Math.round(
      e.nativeEvent.contentOffset.x / Layout.window.width
    );
    setCurrentImage(curImage < 0 ? 1 : curImage + 1);
  };
  return (
    <View style={styles.postWrapper}>
      <View style={styles.header}>
        <Avatar
          containerStyle={{ backgroundColor: "#C3A89B", marginRight: 10 }}
          size={40}
          rounded
          source={{ uri: user.profile_media_url }}
        />
        <View style={styles.descHeader}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.span}>{`${user.name} ` || ""}</Text>
            <Text>đã đăng bài viết</Text>
          </View>
          <Text style={styles.date}>{fromNow(post?.posting_date)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text>{post.content}</Text>
      </View>
      {post.number_of_images && (
        <View>
          <ScrollView
            onScroll={(e) => handleScroll(e)}
            scrollEventThrottle={16}
            pagingEnabled
            horizontal
          >
            {post.images.map((image, index) => (
              <Image
                source={{ uri: image }}
                style={{
                  width: Layout.window.width,
                  height: Layout.window.width,
                }}
                key={index}
              />
            ))}
          </ScrollView>

          <Text style={styles.calCurrentImage}>
            {currentImage}/{post.images.length}
          </Text>
        </View>
      )}
      <View style={styles.buttonWrapper}>
        <View style={styles.button}>
          <Button
            title={`${post.number_of_reactions} thích`}
            icon={{
              name: "thumbs-up",
              type: "font-awesome",
              size: 20,
              color: "gray",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ color: "gray" }}
            buttonStyle={{
              backgroundColor: "#fff",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 8,
            }}
            containerStyle={{
              width: "100%",
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title={`${post.number_of_comments} bình luận`}
            icon={{
              name: "comment",
              type: "font-awesome",
              size: 20,
              color: "gray",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ color: "gray" }}
            buttonStyle={{
              backgroundColor: "#fff",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 8,
            }}
            containerStyle={{
              width: "100%",
              marginLeft: 10,
            }}
            onPress={() => {
              navigation ? navigation.navigate(CommentRoute) : {};
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Post;
