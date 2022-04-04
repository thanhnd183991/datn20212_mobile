import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  EditProfileRoute,
  CommentRoute,
  GroupRoute,
  HomeRoute,
  LoginRoute,
  InformationGroupRoute,
  ProfileRoute,
  RootRoute,
  SignupRoute,
  ListUserRoute,
  ChatRoute,
  TextEditorNewPostRoute,
} from "../constants/PathRoutes";
import {
  EditProfileScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  InformationGroupScreen,
  GroupScreen,
  ChatScreen,
  SignupScreen,
  TestScreen,
  CommentScreen,
  TextEditorNewPostScreen,
  ListUserScreen,
} from "../screens/";
import BottomTabNavigator from "./BottomTabNav";

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
        <Stack.Screen
          options={{ headerShown: false }}
          name={RootRoute}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={ProfileRoute} component={ProfileScreen} />
        <Stack.Screen name={ListUserRoute} component={ListUserScreen} />
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
        <Stack.Group
          screenOptions={({}) => ({
            presentation: "modal",
            gestureDirection: "vertical",
            transitionSpec: {
              open: config,
              close: config,
            },
          })}
        >
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

        <Stack.Screen name={HomeRoute} component={HomeScreen} />
        <Stack.Screen name={EditProfileRoute} component={EditProfileScreen} />
        <Stack.Screen name={"Test"} component={TestScreen} />
        <Stack.Screen name={LoginRoute} component={LoginScreen} />
        <Stack.Screen name={ChatRoute} component={ChatScreen} />
        <Stack.Screen name={SignupRoute} component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
