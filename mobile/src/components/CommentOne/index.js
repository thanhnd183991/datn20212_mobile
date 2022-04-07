import {
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  Text,
  StyleSheet,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { comments } from "../../utils/dummyData/comments";
import { users } from "../../utils/dummyData/users";
import { fromNow } from "../../utils/dateUtils";
import styles from "./styles";
import ContentHyperlink from "../ContentHyperlink";

const CommentOne = ({ comment, handleCommentInput, deep }) => {
  const user = users[0];
  // console.log("render cmt");
  const listChildrenCmt = comments.filter((cmt) => cmt.root_id === comment.id);
  return (
    <View>
      <View style={[styles.container, { marginLeft: deep * 20 }]}>
        <Avatar
          size="small"
          rounded
          source={{ uri: user.profile_media_url }}
          title="Bj"
          containerStyle={{ backgroundColor: "grey", marginRight: 10 }}
        ></Avatar>
        <View style={styles.commentContentWrapper}>
          <View style={styles.commentContent}>
            <Text style={{ fontWeight: "bold" }}>{user.user_name}</Text>
            <ContentHyperlink
              styleComment={styles.contentText}
              contentText={comment.content}
            />
          </View>
          <View style={styles.commentActions}>
            <Text style={styles.textAction}>{fromNow(comment.created_at)}</Text>
            <Text style={styles.textAction}>Thích</Text>
            <Pressable onPress={() => handleCommentInput(comment)}>
              <Text style={styles.textAction}>Phản hồi</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        data={listChildrenCmt}
        renderItem={({ item }) => (
          <CommentOne
            handleCommentInput={handleCommentInput}
            comment={item}
            deep={deep + 1}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default CommentOne;
