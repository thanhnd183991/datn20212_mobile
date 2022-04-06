import { View, Text } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { dateFormat } from "../../utils/dateUtils";
import Layout from "../../constants/Layout";
const ItemStat = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        marginBottom: 5,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <AntDesign name="creditcard" size={24} color="black" />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Phạm Văn A</Text>
        <Text>Trả tiền học</Text>
      </View>
      <View>
        <Text style={{ fontWeight: "bold" }}>-200.000đ</Text>
        <Text numberOfLines={1} style={{ maxWidth: Layout.window.width * 0.5 }}>
          {dateFormat(new Date(), "L")} {dateFormat(new Date(), "LTS")}
        </Text>
      </View>
    </View>
  );
};

export default ItemStat;
