import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Button } from "react-native-elements";
import { imagePickerArray } from "../../utils/media/image";
import ImageOne from "../ImageOne";
import styles from "./styles";

const ActionButtons = ({ setText }) => {
  const [images, setImages] = useState([]);
  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  return (
    <View style={{ justifyContent: "center" }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          justifyContent: "flex-start",
          padding: 5,
        }}
      >
        {images.length > 0 &&
          images.map((el, i) => (
            <ImageOne
              sourceUri={el}
              handleClick={() => handleDeleteImage(i)}
              style={{ width: 100, height: 100 }}
              key={i}
            />
          ))}
      </ScrollView>
      <View style={styles.actions}>
        <View style={styles.button}>
          <Button
            title="Ảnh"
            icon={{
              name: "image",
              type: "font-awesome",
              size: 15,
              color: "gray",
            }}
            onPress={() => imagePickerArray(setImages, images)}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ color: "gray" }}
            buttonStyle={{
              backgroundColor: "#FDF5F1",
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
            title="Tệp đính kèm"
            icon={{
              name: "file",
              type: "font-awesome",
              size: 15,
              color: "gray",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ color: "gray" }}
            buttonStyle={{
              backgroundColor: "#FDF5F1",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 8,
            }}
            containerStyle={{
              width: "100%",
              marginLeft: 10,
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default ActionButtons;
