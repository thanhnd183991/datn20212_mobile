import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Avatar, SearchBar } from "react-native-elements";
import { GroupRoute } from "../../constants/PathRoutes";
import { dateFormat } from "../../utils/dateUtils";
import { groups } from "../../utils/dummyData/groups";

const ItemGroup = ({ group, navigation }) => (
  <TouchableOpacity
    style={{ flexDirection: "row", marginBottom: 10 }}
    onPress={() => navigation.navigate(GroupRoute, { group })}
  >
    <Avatar
      rounded
      size="medium"
      overlayContainerStyle={{ backgroundColor: "lightgray" }}
      icon={{ name: "lock", type: "font-awesome", color: "gray" }}
      activeOpacity={0.7}
    />
    <View style={{ flex: 1, marginLeft: 5 }}>
      <Text style={{ fontWeight: "bold", color: "#000" }}>{group.title}</Text>
      <Text style={{ color: "gray" }}>
        {group.number_of_members} thành viên
      </Text>
    </View>
    <Text style={{ color: "lightgray", fontSize: 13 }}>
      {dateFormat(group.created_at, "DD/MM/YYYY")}
    </Text>
  </TouchableOpacity>
);

const ListGroupScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FDF5F1",
        backgroundColor: "white",
      }}
    >
      <SearchBar
        placeholder="Tìm kiếm nhóm"
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={{
          backgroundColor: "white",
          borderRadius: 20,
        }}
        inputStyle={{
          padding: 0,
          fontSize: 15,
        }}
        containerStyle={{ backgroundColor: "#FDF5F1", marginBottom: 10 }}
        lightTheme={{ backgroundColor: "#FDF5F1" }}
      />
      <FlatList
        data={groups}
        renderItem={({ item }) => (
          <ItemGroup group={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
};

export default ListGroupScreen;
