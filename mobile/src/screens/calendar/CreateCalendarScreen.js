import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  TextInput,
} from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateFormat } from "../../utils/dateUtils";
import { users } from "../../utils/dummyData/users";
import { Avatar } from "react-native-elements";
import { DatePicker } from "../../components";

const CreateCalendarScreen = ({ navigation }) => {
  const user = users[0];
  const [date, setDate] = React.useState(new Date());
  const [desc, setDesc] = React.useState(null);
  const [title, setTitle] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={() => {}} title="Gửi yêu cầu" />,
    });
  }, [navigation]);

  const WrapperInfoUserTrans = () => (
    <View
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
        <Text style={{ color: "gray" }}>TA</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <WrapperInfoUserTrans />
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold", color: "gray" }}>
          {dateFormat(date, "LLLL")}
        </Text>
      </View>
      <DatePicker date={date} setDate={setDate} />
      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          flex: 1,
          marginTop: 10,
        }}
      >
        <TextInput
          placeholder="Tiêu đề"
          style={{
            marginBottom: 10,
            borderBottomWidth: 1,
            fontSize: 15,
            borderBottomColor: "gray",
          }}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={{ flex: 1, fontSize: 14, textAlignVertical: "top" }}
          multiline
          placeholder="Mô tả giao dịch"
          value={desc}
          onChangeText={setDesc}
        />
      </View>
    </View>
  );
};

export default CreateCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5F1",
  },
});
