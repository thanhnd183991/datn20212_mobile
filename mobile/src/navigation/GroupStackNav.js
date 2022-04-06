import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GroupRoute,
  InformationGroupRoute,
  ListGroupRoute,
} from "../constants/PathRoutes";
import {
  GroupScreen,
  InformationGroupScreen,
  ListGroupScreen,
} from "../screens/";
import { HeaderRight } from "../components";

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
export default function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => <HeaderRight navigation={navigation} />,
      })}
    >
      <Stack.Screen name={ListGroupRoute} component={ListGroupScreen} />
      <Stack.Screen name={GroupRoute} component={GroupScreen} />
      <Stack.Screen
        name={InformationGroupRoute}
        component={InformationGroupScreen}
      />
    </Stack.Navigator>
  );
}
