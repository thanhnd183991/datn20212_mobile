import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditProfileRoute,
  CommentRoute,
  GroupRoute,
  HomeRoute,
  NotificationRoute,
  LoginRoute,
  InformationGroupRoute,
  ProfileRoute,
  RootRoute,
  SignupRoute,
  ListUserRoute,
  ChatRoute,
  TextEditorNewPostRoute,
  ChatInfoRoute,
  ListChatRoute,
  ListCalendarRoute,
  CreateChatRoute,
  CreateCalendarRoute,
  CalendarRoute,
  DetailCalendarRoute,
  StatisticRoute,
} from "../constants/PathRoutes";
import {
  EditProfileScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  InformationGroupScreen,
  GroupScreen,
  NotificationScreen,
  ChatScreen,
  SignupScreen,
  TestScreen,
  CreateChatScreen,
  CreateCalendarScreen,
  CommentScreen,
  TextEditorNewPostScreen,
  ListUserScreen,
  ChatInfoScreen,
  DetailCalendarScreen,
  ListCalendarScreen,
  ListChatScreen,
  CalendarScreen,
  StatisticScreen,
} from "../screens/";
import BottomTabNavigator from "./BottomTabNav";
import { Icon, Badge } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";
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
export default function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name={"Test"} component={TestScreen} /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name={RootRoute}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={CreateChatRoute} component={CreateChatScreen} />
        <Stack.Screen name={StatisticRoute} component={StatisticScreen} />
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

        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name={ChatInfoRoute} component={ChatInfoScreen} />
          <Stack.Screen
            name={TextEditorNewPostRoute}
            options={({}) => ({
              headerShown: false,
            })}
            component={TextEditorNewPostScreen}
          />
          <Stack.Screen
            name={CommentRoute}
            options={({}) => ({})}
            component={CommentScreen}
          />
        </Stack.Group>
        <Stack.Screen name={ProfileRoute} component={ProfileScreen} />
        <Stack.Screen name={ListUserRoute} component={ListUserScreen} />
        <Stack.Screen
          name={NotificationRoute}
          options={{}}
          component={NotificationScreen}
        />
        <Stack.Group
          screenOptions={({ route, navigation }) => ({
            gestureDirection: "vertical",
            transitionSpec: {
              open: config,
              close: config,
            },
          })}
        >
          <Stack.Screen
            // options={({ route }) => ({
            //   title: route.params.group.title,
            // })}
            name={GroupRoute}
            component={GroupScreen}
          />
          <Stack.Screen
            // options={({ route }) => ({
            //   title: route.params.group.title,
            // })}
            name={InformationGroupRoute}
            component={InformationGroupScreen}
          />
        </Stack.Group>

        <Stack.Screen name={HomeRoute} component={HomeScreen} />
        <Stack.Screen name={EditProfileRoute} component={EditProfileScreen} />
        <Stack.Screen name={LoginRoute} component={LoginScreen} />
        <Stack.Screen
          name={ChatRoute}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                style={{
                  backgroundColor: "lightgray",
                  paddingVertical: 6,
                  paddingHorizontal: 6,
                  borderRadius: 20,
                }}
                onPress={() => navigation.navigate(ChatInfoRoute)}
              >
                <Icon
                  name="info"
                  style={{ width: 30 }}
                  type="font-awesome"
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            ),
          })}
          component={ChatScreen}
        />
        <Stack.Screen name={SignupRoute} component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
