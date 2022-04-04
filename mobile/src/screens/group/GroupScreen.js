import {
  StyleSheet,
  Pressable,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";

import { dateFormat } from "../../utils/dateUtils";
import { posts } from "../../utils/dummyData/posts";
import { users } from "../../utils/dummyData/users";
import { groups } from "../../utils/dummyData/groups";
import { Post } from "../../components";
import { InformationGroupRoute } from "../../constants/PathRoutes";
import { CreatePost } from "../../components";

export const HeaderGroupScreen = ({ group, navigation, user }) => (
  <View>
    <Pressable
      onPress={() => {
        navigation ? navigation.navigate(InformationGroupRoute) : {};
      }}
      style={{
        padding: 10,
        backgroundColor: "white",
        marginTop: 10,
        // flex: 1,
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
          Được thành lập vào: {dateFormat(group.created_at, "DD/MM/YYYY")}
        </Text>
        <Text style={{ color: "gray" }}>
          Số lượng thành viên: {group.number_of_members}
        </Text>
      </View>
    </Pressable>
    <CreatePost user={user} navigation={navigation} />
  </View>
);

const GroupScreen = ({ navigation }) => {
  const group = groups[0];
  const user = users[0];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <HeaderGroupScreen
            group={group}
            navigation={navigation}
            user={user}
          />
        )}
        data={posts}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default GroupScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5F1",
  },
});
