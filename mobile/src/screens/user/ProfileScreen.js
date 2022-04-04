import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import { CreatePost, Post } from "../../components";
import { EditProfileRoute, ListUserRoute } from "../../constants/PathRoutes";
import { getDateOfMonth, getMonth, getYear } from "../../utils/dateUtils";
import { posts } from "../../utils/dummyData/posts";
import { users } from "../../utils/dummyData/users";

const StatUser = ({ number, title, handleClick }) => (
  <Pressable style={{ alignItems: "center" }} onPress={handleClick}>
    <Text style={{ fontWeight: "bold" }}>{number}</Text>
    <Text>{title}</Text>
  </Pressable>
);
export default function ProfileScreen({ navigation }) {
  const user = users[0];
  const HeaderComponentProfile = () => (
    <>
      <View style={{ backgroundColor: "white", paddingVertical: 10 }}>
        <View style={styles.top}>
          <View style={{ alignItems: "center" }}>
            <Avatar
              containerStyle={{ backgroundColor: "#C3A89B" }}
              size={64}
              rounded
              source={{ uri: user.profile_media_url }}
            />
            <Text>{user.name}</Text>
          </View>
          <StatUser
            number={user.number_of_posts}
            title="Bài viết"
            handleClick={() => {}}
          />
          <StatUser
            number={user.number_of_friends}
            title="Bạn bè"
            handleClick={() =>
              navigation.navigate(ListUserRoute, { type: "friend" })
            }
          />
          <StatUser
            number={user.number_of_blocks}
            handleClick={() =>
              navigation.navigate(ListUserRoute, { type: "block" })
            }
            title="Người chặn"
          />
        </View>
        <View style={styles.desc}>
          <Button
            title="Chỉnh sửa trang cá nhân"
            buttonStyle={{
              borderColor: "rgba(78, 116, 289, 1)",
              borderRadius: 8,
              padding: 0,
            }}
            type="outline"
            titleStyle={{
              color: "rgba(78, 116, 289, 1)",
              marginVertical: 1,
            }}
            containerStyle={{
              width: "80%",
              alignSelf: "center",
              marginVertical: 10,
            }}
            onPress={() => navigation.navigate(EditProfileRoute)}
          />
          <Text style={styles.textDesc}>
            Tham gia vào tháng {getMonth(user.created_at)} năm{" "}
            {getYear(user.created_at)}
          </Text>
          <Text style={styles.textDesc}>
            Sinh nhật ngày {getDateOfMonth(user.date_of_birth)} tháng{" "}
            {getMonth(user.date_of_birth)}
          </Text>
        </View>
      </View>

      <CreatePost user={user} navigation={navigation} />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={HeaderComponentProfile}
        data={posts}
        renderItem={({ item }) => <Post post={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        // extraData={selectedId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FDF5F1",
    marginTop: 10,
    flex: 1,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  desc: {
    width: "100%",
  },
  textDesc: {
    marginLeft: 10,
    fontWeight: "bold",
  },
});
