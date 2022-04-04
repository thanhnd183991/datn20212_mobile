import React, { useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet, Image } from "react-native";
import { CommentOne, ImageOne, InputComment } from "../../components";
import { comments } from "../../utils/dummyData/comments";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Layout from "../../constants/Layout";

const CommentScreen = ({ deep = 0, navigation }) => {
  const cmts = comments.filter((cmt) => !cmt.root_id);
  const [commentInput, setCommentInput] = useState(null);

  const handleCommentInput = (cmt) => {
    setCommentInput(cmt);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ , padding: 10 }}> */}
      <FlatList
        data={cmts}
        renderItem={({ item }) => (
          <CommentOne
            comment={item}
            handleCommentInput={handleCommentInput}
            deep={deep}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 10,
        }}
      />
      <InputComment commentInput={commentInput} />
    </SafeAreaView>
  );
};

export default CommentScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDF5F1",
    // marginTop: 20,
    flex: 1,
  },
});
