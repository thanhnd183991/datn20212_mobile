import {
  TextInput,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { imagePicker } from "../../utils/media/image";
import ImageOne from "../ImageOne";
import styles from "./styles";

const InputComment = ({ commentInput }) => {
  const [newComment, setNewComment] = useState(commentInput?.content || "");
  const [commentImage, setCommentImage] = useState(null);
  const handleClick = () => setCommentImage(null);
  // console.log(commentImage);

  useEffect(() => {
    if (commentInput) {
      setNewComment(commentInput?.content || "");
    }
  }, [commentInput]);
  return (
    <View>
      <View style={styles.container}>
        {commentImage && (
          <View style={{ backgroundColor: "white", padding: 5 }}>
            <ImageOne
              sourceUri={commentImage}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
              handleClick={handleClick}
            />
          </View>
        )}
        <View style={styles.wrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="Nhập bình luận"
              value={newComment}
              onChangeText={setNewComment}
              style={styles.textInput}
            />
            <TouchableOpacity
              onPress={() => imagePicker(setCommentImage, "")}
              // style={styles.imageIcon}
            >
              <Ionicons name="image" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendIcon}>
            <Ionicons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InputComment;
