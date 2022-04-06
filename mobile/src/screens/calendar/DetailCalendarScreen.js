import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, Platform, View } from "react-native";
import { Button as ElButton } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { MyModal } from "../../components";
import { fromNow } from "../../utils/dateUtils";
import { users } from "../../utils/dummyData/users";

const DetailCalendarScreen = ({ navigation }) => {
  const user = users[0];

  // const [date, setDate] = React.useState("2022-08-04");
  const date = fromNow("2022-04-06 10:00");
  const [desc, setDesc] = React.useState(null);
  const [starCount, setStarCount] = React.useState(3.5);
  const [title, setTitle] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Feather name="trash-2" size={24} color="black" />,
    });
  }, [navigation]);

  const ModalComponent = () => (
    <StarRating
      disabled={false}
      maxStars={5}
      fullStarColor={"#d5f78b"}
      rating={starCount}
      selectedStar={setStarCount}
    />
  );

  const WrapperInfoUserTrans = () => (
    <ElButton
      title={date.includes("tới") ? date : "Đi đến cuộc trò chuyện"}
      icon={
        <View style={{ marginLeft: 10 }}>
          <AntDesign name="rightcircle" size={24} color="white" />
        </View>
      }
      iconRight
      iconContainerStyle={{ marginLeft: 10 }}
      titleStyle={{ fontWeight: "700" }}
      disabled={date.includes("tới") ? true : false}
      buttonStyle={{
        backgroundColor: "rgba(199, 43, 98, 1)",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 30,
      }}
      containerStyle={{
        marginHorizontal: 50,
        marginVertical: 10,
      }}
    />
  );

  return (
    <View style={styles.container}>
      <WrapperInfoUserTrans />
      <View style={{ alignItems: "center", marginBottom: 10 }}></View>
      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          flex: 1,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            borderBottomWidth: 1,
            fontSize: 15,
            borderBottomColor: "gray",
          }}
        >
          Nhan đề: What is Lorem Ipsum?
        </Text>
        <Text style={{ flex: 1, fontSize: 14, textAlignVertical: "top" }}>
          Mô tả: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          justifyContent: "space-around",
        }}
      >
        <ElButton
          title="Đánh giá"
          icon={<AntDesign name="star" size={24} color="yellow" />}
          iconLeft
          disabled={date.includes("tới") ? true : false}
          onPress={() => setModalVisible(true)}
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(199, 43, 98, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
            paddingHorizontal: 20,
          }}
          containerStyle={{}}
        />
        <ElButton
          title="Đóng tiền"
          disabled={date.includes("tới") ? true : false}
          icon={<MaterialIcons name="attach-money" size={24} color="yellow" />}
          iconLeft
          iconContainerStyle={{ marginLeft: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(199, 43, 98, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
            paddingHorizontal: 20,
          }}
          containerStyle={{}}
        />
      </View>
      {modalVisible ? (
        <MyModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          ContentModal={ModalComponent}
        />
      ) : null}
    </View>
  );
};

export default DetailCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5F1",
  },
});
