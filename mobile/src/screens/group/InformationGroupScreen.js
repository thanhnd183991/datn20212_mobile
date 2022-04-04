import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import { groups } from "../../utils/dummyData/groups";
import { styles, HeaderGroupScreen } from "./GroupScreen";
import { Post, ItemUser } from "../../components";
import { posts } from "../../utils/dummyData/posts";
import { users } from "../../utils/dummyData/users";
import { Avatar } from "react-native-elements";
import { ProfileRoute } from "../../constants/PathRoutes";

const HeaderDetailGroupScreen = ({ group }) => {
  return (
    <View>
      <HeaderGroupScreen group={group} />
      <View
        style={{
          backgroundColor: "white",
          color: "black",
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Trạng thái:</Text>
        <Text>{group.status}</Text>

        <Text style={{ fontWeight: "bold", marginTop: 10 }}>Mô tả:</Text>
        <Text>{group.summary}</Text>
      </View>
      <Text style={{ fontWeight: "bold", margin: 10 }}>
        Thành viên ({group.number_of_members}):
      </Text>
    </View>
  );
};

const InformationGroupScreen = ({ navigation }) => {
  const group = groups[0];
  const arrUsers = [...users, users[0], users[0], users[0], users[0], users[0]];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <HeaderDetailGroupScreen group={group} navigation={navigation} />
        )}
        data={arrUsers}
        renderItem={({ item }) => (
          <ItemUser
            user={item}
            handleClick={() => navigation.navigate(ProfileRoute)}
          />
        )}
        keyExtractor={(item, index) => index}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default InformationGroupScreen;
