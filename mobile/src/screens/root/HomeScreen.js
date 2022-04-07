import {
  StyleSheet,
  Pressable,
  View,
  Text,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React from "react";
import { users } from "../../utils/dummyData/users";
import { Avatar } from "react-native-elements";
import { posts } from "../../utils/dummyData/posts";
import { Post } from "../../components";
import { ProfileRoute } from "../../constants/PathRoutes";

const HomeScreen = ({ navigation }) => {
  const user = users[0];
  const [refreshing, setRefreshing] = React.useState(false);
  const [text, setText] = React.useState("");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      posts.unshift(posts[0]);
      setRefreshing(false);
    }, 2000);
  }, []);
  const handleToEnd = () => {
    setText("scroll to end");
  };

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
        keyExtractor={(item, index) => index}
        // extraData={selectedId}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={handleToEnd}
        onEndReachedThreshold={1}
      />
      {text ? <Text> {text}</Text> : null}
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
