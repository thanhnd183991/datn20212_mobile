import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, View } from "react-native";
import {
  CalendarRoute,
  CreateCalendarRoute,
  DetailCalendarRoute,
  ListCalendarRoute,
  RootCalendarRoute,
  RootUserRoute,
} from "../constants/PathRoutes";
import {
  CalendarScreen,
  CreateCalendarScreen,
  DetailCalendarScreen,
  ListCalendarScreen,
} from "../screens/";
import { HeaderRight } from "../components";
import { ListChatRoute, ProfileRoute } from "../constants/PathRoutes";

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
            <HeaderRight
              onPress={() => navigation.navigate(ListCalendarRoute)}
              nameIcon="description"
            />
            <View style={{ marginRight: 10 }} />
            <HeaderRight
              onPress={() =>
                navigation.navigate("Root", {
                  screen: RootUserRoute,
                  params: {
                    screen: ListChatRoute,
                  },
                })
              }
              nameIcon="mode-comment"
            />
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
