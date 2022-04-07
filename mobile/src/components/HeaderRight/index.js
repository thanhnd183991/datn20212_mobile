import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";

const HeaderRight = ({ onPress, nameIcon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <MaterialIcons
        name={nameIcon ? nameIcon : "mode-comment"}
        size={24}
        color="gray"
      />

      {nameIcon === "mode-comment" ? (
        <Badge
          status="primary"
          value={1}
          containerStyle={{
            position: "absolute",
            top: -7,
            right: -5,
            fontSize: 12,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default HeaderRight;
