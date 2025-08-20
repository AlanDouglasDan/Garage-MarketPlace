import React, { FC, useEffect, useState } from "react";
import { Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import styles from "./Messages.styles";

const Messages: FC<NativeStackScreenProps<BottomTabsNavParams, "Messages">> = ({
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.bigText}>Messages</Text>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
