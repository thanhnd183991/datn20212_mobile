import * as React from "react";
import { View, Text, FlatList } from "react-native";
import { RadioButton } from "react-native-paper";
import { styles } from "./HomeScreen";
import { ItemStat } from "../../components";

const StatisticScreen = () => {
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            onPress={() => setChecked("first")}
            color="black"
          />
          <Text>Giao dịch</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
            color="black"
          />
          <Text>Hoạt động</Text>
        </View>
      </View>

      <FlatList
        data={new Array(20).fill(0)}
        renderItem={({ item }) => <ItemStat />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default StatisticScreen;
