import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import { Badge, Icon } from "react-native-elements";
import {
  CalendarRoute,
  ListGroupRoute,
  HomeRoute,
  CreateChatRoute,
  ListChatRoute,
  ProfileRoute,
  ListUserRoute,
  ListCalendarRoute,
  StatisticRoute,
  TextEditorNewPostRoute,
  NotificationRoute,
  RootHomeRoute,
  RootGroupRoute,
  RootCalendarRoute,
  RootStatRoute,
  RootUserRoute,
} from "../constants/PathRoutes";
import {
  CalendarScreen,
  ListGroupScreen,
  HomeScreen,
  ListChatScreen,
  StatisticScreen,
} from "../screens";
import HomeStackNav from "./HomeStackNav";
import GroupStackNav from "./GroupStackNav";
import CalendarStackNav from "./CalendarStackNav";
import StatStackNav from "./StatStackNav";
import UserStackNav from "./UserStackNav";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={"RootBottom"}
      screenOptions={({ navigation }) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarActiveBackgroundColor: "lightgray",
        headerShown: false,
      })}
    >
      <BottomTab.Screen
        name={RootHomeRoute}
        component={HomeStackNav}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              type="font-awesome"
              style={{ width: 25 }}
              size={28}
              color="gray"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={RootGroupRoute}
        component={GroupStackNav}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="group"
              type="font-awesome"
              style={{ width: 25 }}
              size={24}
              color="gray"
            />
          ),
        }}
      />

      <BottomTab.Screen
        name={RootCalendarRoute}
        component={CalendarStackNav}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Icon
              name="calendar"
              type="font-awesome"
              style={{ width: 25 }}
              size={24}
              color="gray"
            />
          ),
        })}
      />
      <BottomTab.Screen
        name={RootStatRoute}
        component={StatStackNav}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="calculator"
              type="font-awesome"
              style={{ width: 25 }}
              size={24}
              color="gray"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={RootUserRoute}
        component={UserStackNav}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Icon
              name="user"
              type="font-awesome"
              style={{ width: 25 }}
              size={24}
              color="gray"
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
