/* eslint-disable react/no-unstable-nested-components */
import React, { FC, JSX } from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Listings, Bookings, Messages, Settings, Profile } from "screens";
import { palette } from "core/styles";
import styles from "./BottomTabsNav.styles";

export type BottomTabsNavParams = {
  Listings: undefined;
  Bookings: undefined;
  Messages: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsNavParams>();

const renderTabBarIcon = (name: string, focused: boolean): JSX.Element => {
  let icon;

  switch (name) {
    case "Listings":
      icon = "home";
      break;
    case "Bookings":
      icon = "calendar";
      break;
    case "Messages":
      icon = "message-circle";
      break;
    case "Settings":
      icon = "settings";
      break;
    default:
      icon = "user";
      break;
  }

  return (
    <Feather
      name={icon}
      size={24}
      color={focused ? palette.BLACK : palette.GREY}
    />
  );
};

const renderTabBarLabel = (name: string, focused: boolean): JSX.Element => {
  const style = focused ? "text10Focus" : "text10";
  return <Text style={styles[style]}>{name}</Text>;
};

const BottomTabsNav: FC = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <Tab.Navigator
        screenOptions={{ tabBarStyle: styles.tabBar }}
        initialRouteName="Listings"
      >
        <Tab.Screen
          name="Listings"
          component={Listings}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Listings", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Garages", focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Bookings"
          component={Bookings}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Bookings", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Bookings", focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Messages", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Messages", focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Profile", focused),
            tabBarLabel: ({ focused }) => renderTabBarLabel("Profile", focused),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => renderTabBarIcon("Settings", focused),
            tabBarLabel: ({ focused }) =>
              renderTabBarLabel("Settings", focused),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabsNav;
