import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";
import { ListChatRoute, ProfileRoute } from "../../constants/PathRoutes";

const HeaderRight = ({ navigation, nameIcon }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Root", {
          screen: ProfileRoute,
          params: {
            screen: ListChatRoute,
          },
        })
      }
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <MaterialIcons
        name={nameIcon ? nameIcon : "mode-comment"}
        size={24}
        color="gray"
      />

      {!nameIcon ? (
        <Badge
          status="primary"
          value={1}
          containerStyle={{
            position: "absolute",
            top: -10,
            right: -5,
            fontSize: 13,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default HeaderRight;
