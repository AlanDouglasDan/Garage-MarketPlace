import React, { FC, useEffect, useState } from "react";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "core/supabase";

import { AppStackNavParams } from "navigation/AppStackNav";
import { Button } from "components/Button";
import { spacing, palette } from "core/styles";
import styles from "./Welcome.styles";

const Welcome: FC<NativeStackScreenProps<AppStackNavParams, "Welcome">> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        // If there's an active session, navigate to the Bottom Tabs screen
        if (session?.user) {
          navigation.navigate("Bottom Tabs");
          return; // Exit early to prevent setting loading to false
        }
      } catch (error) {
        console.error("Error checking user session:", error);
      }

      setLoading(false);
    };

    checkUser();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.BLACK} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.bigText}>Alan's Garage Marketplace</Text>

        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />

        <Button
          title="Continue as Guest"
          containerStyle={spacing.marginTop20}
          onPress={() => navigation.navigate("Bottom Tabs")}
          variant="transparent"
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
