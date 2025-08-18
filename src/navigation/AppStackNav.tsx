import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome, SignUp, Login } from "screens";

export type AppStackNavParams = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  Home: undefined; // Add Home screen to navigation params
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
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "Log In",
            headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          }}
        />
        
        {/* <Stack.Screen
          name="Home"
          component={Welcome} // Temporary - replace with actual Home component
          options={{
            headerShown: false, // Hide header for home screen
          }}
        /> */}
      </Stack.Navigator>
    </>
  );
};

export default AppStackNav;
