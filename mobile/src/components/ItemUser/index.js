import React from "react";
import { Text, TouchableOpacity, SafeAreaView } from "react-native";
import { Avatar, Button } from "react-native-elements";

const ItemUser = ({
  user,
  added,
  handleClick,
  type,
  handleSendRequestUser,
}) => (
  <SafeAreaView
    style={{
      flexDirection: "row",
      marginBottom: 3,
      padding: 10,
      backgroundColor: "white",
      borderRadius: 20,
      alignItems: "center",
    }}
  >
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",

        alignItems: "center",
      }}
      onPress={() => handleClick()}
    >
      <Avatar
        containerStyle={{ backgroundColor: "#C3A89B", marginRight: 10 }}
        size="small"
        rounded
        source={{ uri: user.profile_media_url }}
      />
      <Text style={{ fontWeight: "bold" }}>{user?.user_name || "Text"}</Text>
    </TouchableOpacity>
    {type === "friend" && (
      <Button
        onPress={() => handleSendRequestUser()}
        type="outline"
        title="Xóa bạn"
        buttonStyle={{ paddingVertical: 1, borderRadius: 10 }}
      />
    )}
    {type === "block" && (
      <Button
        type="outline"
        title="Hủy chặn"
        onPress={() => handleSendRequestUser()}
        buttonStyle={{ paddingVertical: 1, borderRadius: 10 }}
      />
    )}
    {type === "kick" && (
      <Button
        type="outline"
        title="Xóa"
        onPress={() => handleSendRequestUser()}
        buttonStyle={{ paddingVertical: 1, borderRadius: 10 }}
      />
    )}
    {type === "addToRoom" && (
      <Button
        type="outline"
        title={added ? "Đã thêm" : "Thêm"}
        onPress={!added ? handleSendRequestUser : () => {}}
        buttonStyle={{ paddingVertical: 1, borderRadius: 10 }}
      />
    )}
    {type === "calendar" && (
      <Button
        type="outline"
        title={"Đặt lịch"}
        onPress={handleSendRequestUser}
        buttonStyle={{ paddingVertical: 1, borderRadius: 10 }}
      />
    )}
  </SafeAreaView>
);

export default ItemUser;
