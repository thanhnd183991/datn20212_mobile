import {
  StyleSheet,
  Pressable,
  View,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import React from "react";
import { users } from "../../utils/dummyData/users";
import { Avatar } from "react-native-elements";
import { posts } from "../../utils/dummyData/posts";
import { Post } from "../../components/";
import { ProfileRoute } from "../../constants/PathRoutes";

const HomeScreen = ({ navigation }) => {
  const user = users[0];
  const HeaderHomeScreen = () => (
    <Pressable
      onPress={() => navigation.navigate(ProfileRoute)}
      style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      <Avatar
        containerStyle={{ backgroundColor: "#C3A89B", marginRight: 10 }}
        size="medium"
        rounded
        source={{ uri: user.profile_media_url }}
      />
      <View>
        <Text style={{ fontWeight: "bold" }}>{user.name}</Text>
        <Text style={{ color: "gray" }}>sinh viên</Text>
      </View>
    </Pressable>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={HeaderHomeScreen}
        data={posts}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5F1",
  },
});
