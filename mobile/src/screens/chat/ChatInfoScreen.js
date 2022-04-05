import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React from "react";
import { users } from "../../utils/dummyData/users";
import { styles } from "../root/HomeScreen";
import { ItemUser, MyModal } from "../../components";
import { group_chats } from "../../utils/dummyData/group_chats";
import { ProfileRoute } from "../../constants/PathRoutes";
import { Avatar, SearchBar } from "react-native-elements";
import Layout from "../../constants/Layout";

export const HeaderChatInfoScreen = ({
  group,
  modalVisible,
  setModalVisible,
}) => (
  <View style={{ alignItems: "center" }}>
    <Pressable
      style={{
        padding: 10,
        backgroundColor: "white",
        width: Layout.window.width,
        marginBottom: 5,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Avatar
          containerStyle={{ backgroundColor: "#C3A89B", marginRight: 10 }}
          size="large"
          rounded
          source={{ uri: group.avatar }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold" }}>{group.title}</Text>
        <Text style={{ color: "gray" }}>
          Số lượng thành viên: {group?.number_of_members || 1}
        </Text>
      </View>
    </Pressable>
    <TouchableOpacity
      style={{
        borderRadius: 20,
        paddingBottom: 10,
        // elevation: 2,
        width: Layout.window.width * 0.8,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,

        borderWidth: 1,
        borderColor: "gray",
      }}
      onPress={() => setModalVisible(true)}
    >
      <Text style={{ color: "gray", marginTop: 10 }}>Thêm thành viên</Text>
    </TouchableOpacity>
  </View>
);

const ChatInfoScreen = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(true);
  console.log(route);
  const group = group_chats[0];
  const arrUsers = [...users, users[0], users[0], users[0], users[0], users[0]];
  const handleSendRequestUser = () => {
    console.log("send request user");
  };

  const ContentModal = () => (
    <SafeAreaView
      style={{
        width: Layout.window.width * 0.8,
        height: Layout.window.width * 0.8,
      }}
    >
      <TextInput
        placeholder="Tìm kiếm người/nhóm"
        // onChangeText={setSearch}
        // value={search}
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 0,
          marginBottom: 10,
          fontSize: 15,
        }}
      />
      <FlatList
        data={arrUsers}
        renderItem={({ item }) => (
          <ItemUser
            user={item}
            handleClick={() => navigation.push(ProfileRoute)}
            handleSendRequestUser={handleSendRequestUser}
            type="addToRoom"
          />
        )}
        keyExtractor={(item, index) => index}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() =>
          HeaderChatInfoScreen({ group, modalVisible, setModalVisible })
        }
        data={arrUsers}
        renderItem={({ item }) => (
          <ItemUser
            user={item}
            handleClick={() => navigation.push(ProfileRoute)}
            handleSendRequestUser={handleSendRequestUser}
            type="kick"
          />
        )}
        keyExtractor={(item, index) => index}
        // extraData={selectedId}
      />
      {modalVisible && (
        <MyModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          ContentModal={ContentModal}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatInfoScreen;
