import { AntDesign } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, ImageBackground, Pressable } from "react-native";
const ImageOne = ({ style, sourceUri, handleClick }) => {
  useEffect(() => {
    return () => (sourceUri = null);
  }, []);
  if (!sourceUri) {
    return;
  }
  return (
    <>
      <ImageBackground source={{ uri: sourceUri }} style={{ ...style }}>
        <Pressable
          onPress={() => handleClick()}
          style={{ position: "absolute", top: 5, right: 5 }}
        >
          <AntDesign name="closecircleo" size={20} color="black" />
        </Pressable>
      </ImageBackground>
    </>
  );
};

export default ImageOne;
