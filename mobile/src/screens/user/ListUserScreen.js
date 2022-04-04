import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { users } from "../../utils/dummyData/users";
import { styles } from "../root/HomeScreen";
import { ItemUser } from "../../components";
import { ProfileRoute } from "../../constants/PathRoutes";

const ListUserScreen = ({ route, navigation }) => {
  console.log(route);
  const arrUsers = [...users, users[0], users[0], users[0], users[0], users[0]];
  const handleSendRequestUser = () => {
    console.log("send request user");
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={arrUsers}
        renderItem={({ item }) => (
          <ItemUser
            user={item}
            handleClick={() => navigation.push(ProfileRoute)}
            handleSendRequestUser={handleSendRequestUser}
            type={route.params.type}
          />
        )}
        keyExtractor={(item, index) => index}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default ListUserScreen;
