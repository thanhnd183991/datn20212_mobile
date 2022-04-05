import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { Badge, Icon } from "react-native-elements";
import {
  CalendarRoute,
  ListGroupRoute,
  HomeRoute,
  ListChatRoute,
  ListUserRoute,
  StatisticRoute,
  TextEditorNewPostRoute,
  NotificationRoute,
} from "../constants/PathRoutes";
import {
  CalendarScreen,
  ListGroupScreen,
  HomeScreen,
  ListChatScreen,
  StatisticScreen,
} from "../screens";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={HomeRoute}
      screenOptions={({ navigation }) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarActiveBackgroundColor: "lightgray",
        headerTitleStyle: {
          fontWeight: "bold",
        },

        headerStyle: { backgroundColor: "#FDF5F1" },
        // title: route.params.title,
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Icon
              name="bell"
              style={{ width: 30 }}
              type="font-awesome"
              size={24}
              color="gray"
              onPress={() => navigation.navigate(NotificationRoute)}
            />

            <Badge
              status="primary"
              value={1}
              containerStyle={{
                position: "absolute",
                top: -10,
                right: -10,
                fontSize: 13,
              }}
            />
          </View>
        ),
      })}
    >
      <BottomTab.Screen
        name={HomeRoute}
        component={HomeScreen}
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
        name={ListGroupRoute}
        component={ListGroupScreen}
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
        name={CalendarRoute}
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="calendar"
              type="font-awesome"
              style={{ width: 25 }}
              size={24}
              color="gray"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={StatisticRoute}
        component={StatisticScreen}
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
        name={ListChatRoute}
        component={ListChatScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color }) => (
            <Icon
              name="comments"
              type="font-awesome"
              style={{ width: 25 }}
              size={24}
              color="gray"
            />
          ),
          tabBarBadge: 3,
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                marginRight: 10,
                alignItems: "center",
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Icon
                  name="bell"
                  style={{ width: 30 }}
                  type="font-awesome"
                  size={24}
                  color="gray"
                  onPress={() => navigation.navigate(NotificationRoute)}
                />

                <Badge
                  status="primary"
                  value={1}
                  containerStyle={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    fontSize: 13,
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: "lightgray",
                  padding: 6,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              >
                <Icon
                  name="pencil"
                  style={{ width: 30 }}
                  type="font-awesome"
                  size={24}
                  color="gray"
                  onPress={() => navigation.navigate(ListUserRoute)}
                />
              </View>
            </View>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}
