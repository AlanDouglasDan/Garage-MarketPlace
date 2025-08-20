import React, { FC } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useUser } from "store/user/hooks";
import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { Button } from "components/Button";
import styles from "./Settings.styles";

const Settings: FC<NativeStackScreenProps<BottomTabsNavParams, "Settings">> = ({
  navigation,
}) => {
  const { currentUser, logOut } = useUser();

  const logout = async () => {
    await logOut();

    // @ts-ignore
    navigation.replace("Welcome");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.bigText}>Settings</Text>

        {currentUser ? (
          <Button title="Logout" onPress={logout} />
        ) : (
          // @ts-ignore
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Settings;
