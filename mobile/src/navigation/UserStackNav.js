import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderRight } from "../components";
import {
  ListChatRoute,
  ListUserRoute,
  ProfileRoute,
  CreateChatRoute,
} from "../constants/PathRoutes";
import { ListChatScreen, ListUserScreen, ProfileScreen } from "../screens";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();
export default function UserStackNav() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <HeaderRight navigation={navigation} nameIcon="logout" />
        ),
      })}
    >
      <Stack.Screen name={ProfileRoute} component={ProfileScreen} />
      <Stack.Screen name={ListUserRoute} component={ListUserScreen} />
      <Stack.Screen
        name={ListChatRoute}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate(CreateChatRoute)}
            >
              <MaterialCommunityIcons
                name="pencil-circle"
                size={35}
                color="gray"
              />
            </TouchableOpacity>
          ),
        })}
        component={ListChatScreen}
      />
    </Stack.Navigator>
  );
}
