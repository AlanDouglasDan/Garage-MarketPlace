import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabsNav } from "navigation/bottom-tabs-nav";

import {
  Welcome,
  SignUp,
  Login,
  CreateListing,
  GarageDetails,
  RentNow,
} from "screens";

export type AppStackNavParams = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  "Bottom Tabs": undefined;
  "Create Listing": undefined;
  "Garage Details": { listing: any };
  "Rent Now": { listing: any };
};

const Stack = createNativeStackNavigator<AppStackNavParams>();

const AppStackNav: FC = () => {
  return (
    <>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerTitle: "Sign Up",
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "Log In",
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />

        <Stack.Screen
          name="Bottom Tabs"
          component={BottomTabsNav}
          options={{ headerShown: false, gestureEnabled: false }}
        />

        <Stack.Screen
          name="Create Listing"
          component={CreateListing}
          options={{
            headerTitle: "Create Listing",
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />

        <Stack.Screen
          name="Garage Details"
          component={GarageDetails}
          options={{
            headerTitle: "Garage Details",
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />

        <Stack.Screen
          name="Rent Now"
          component={RentNow}
          options={{
            headerTitle: "Rent Now",
            headerBackButtonDisplayMode: "minimal",
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStackNav;
