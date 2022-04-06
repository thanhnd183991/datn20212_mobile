import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeRoute } from "../constants/PathRoutes";
import { HomeScreen } from "../screens/";
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
export default function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => <HeaderRight navigation={navigation} />,
      })}
    >
      <Stack.Screen name={HomeRoute} component={HomeScreen} />
    </Stack.Navigator>
  );
}
