import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { users } from "../../utils/dummyData/users";
import { ItemUser } from "../../components";
import {
  ProfileRoute,
  CreateCalendarRoute,
  DetailCalendarRoute,
} from "../../constants/PathRoutes";

const ListCanlendarScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState(0);

  return (
    <View style={styles.container}>
      <View
        style={{ alignItems: "center", marginVertical: 10, marginBottom: 20 }}
      >
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 40,
            width: 250,
            borderWidth: 1,
            backgroundColor: "lightgray",
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Đã lên lịch" value={1} />
          <Picker.Item label="Đang chờ duyệt" value={0} />
        </Picker>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
        Danh sách:
      </Text>
      <View>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <ItemUser
              user={item}
              handleClick={() => navigation.push(DetailCalendarRoute)}
            />
          )}
          keyExtractor={(item, index) => index}
          // extraData={selectedId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF5F1",
  },
});

export default ListCanlendarScreen;
