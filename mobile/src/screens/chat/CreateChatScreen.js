import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { ItemUser } from "../../components";
import { styles } from "../root/HomeScreen";
import { users } from "../../utils/dummyData/users";
import { Icon, Button, Avatar } from "react-native-elements";
import Layout from "../../constants/Layout";
import { AntDesign } from "@expo/vector-icons";

const CreateChatScreen = () => {
  const [isGroup, setIsGroup] = React.useState("");
  const [group, setGroup] = React.useState([]);
  const arrUsers = [
    ...users,
    users[0],
    users[0],
    users[0],
    users[0],
    users[0],
    users[0],
    users[0],
    users[0],
    users[0],
    users[0],
  ];

  const handleClickDeleteUser = (item) => {
    const newGroup = group.filter((el) => el.id !== item.id);
    setGroup(newGroup);
  };

  return (
    <SafeAreaView style={[styles.container, { padding: 10 }]}>
      <TextInput
        placeholder="Tìm kiếm người/nhóm"
        // onChangeText={setSearch}
        // value={search}
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 10,
          marginBottom: 10,
          fontSize: 15,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          backgroundColor: "white",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsGroup(!isGroup)}
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Icon
            name="group"
            type="font-awesome"
            style={{ width: 25 }}
            size={24}
            color="gray"
          />
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            Tạo nhóm chat
          </Text>
        </TouchableOpacity>
        {isGroup && (
          <Button
            type="outline"
            title="Tạo"
            onPress={() => {}}
            buttonStyle={{ paddingVertical: 1, borderRadius: 10 }}
          />
        )}
      </View>
      {isGroup && group.length > 0 && (
        <View>
          <FlatList
            data={group}
            horizontal={true}
            renderItem={({ item, index }) => (
              <View style={{ alignItems: "center", marginRight: 5 }}>
                <Avatar
                  containerStyle={{ backgroundColor: "#C3A89B" }}
                  size={40}
                  rounded
                  source={{ uri: item.profile_media_url }}
                />
                <Text numberOfLines={1} style={{ maxWidth: 40 }}>
                  {item.name}
                </Text>
                <Pressable
                  onPress={() => handleClickDeleteUser(item)}
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  <AntDesign name="closecircleo" size={15} color="black" />
                </Pressable>
              </View>
            )}
            keyExtractor={(item, index) => index}
            // extraData={selectedId}
          />
        </View>
      )}

      <Text style={{ marginBottom: 5, fontWeight: "bold", color: "gray" }}>
        Gợi ý
      </Text>
      <FlatList
        data={arrUsers}
        renderItem={({ item }) => (
          <ItemUser
            user={item}
            handleClick={() => {}}
            handleSendRequestUser={() => setGroup([...group, item])}
            type={isGroup ? "addToRoom" : ""}
            added={group.findIndex((el) => el.id === item.id) !== -1}
          />
        )}
        keyExtractor={(item, index) => index}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default CreateChatScreen;
