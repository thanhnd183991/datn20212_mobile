import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import {
  CalendarRoute,
  CreateCalendarRoute,
  DetailCalendarRoute,
  ListCalendarRoute,
} from "../constants/PathRoutes";
import {
  CalendarScreen,
  CreateCalendarScreen,
  DetailCalendarScreen,
  ListCalendarScreen,
} from "../screens/";
import { HeaderRight } from "../components";

import { MaterialCommunityIcons } from "@expo/vector-icons";
const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createNativeStackNavigator();
export default function CalendarStackNav() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate(ListCalendarRoute)}
            >
              <MaterialCommunityIcons
                name="account-details"
                size={28}
                color="gray"
              />
            </TouchableOpacity>
            <HeaderRight navigation={navigation} />,
          </View>
        ),
      })}
    >
      <Stack.Screen name={CalendarRoute} component={CalendarScreen} />
      <Stack.Screen name={ListCalendarRoute} component={ListCalendarScreen} />
      <Stack.Screen
        name={DetailCalendarRoute}
        component={DetailCalendarScreen}
      />
      <Stack.Screen
        name={CreateCalendarRoute}
        component={CreateCalendarScreen}
      />
    </Stack.Navigator>
  );
}
