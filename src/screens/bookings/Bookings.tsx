import React, { FC, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { useUser } from "store/user/hooks";
import { useGarage } from "store/garage/hooks";
import { BookingCard } from "components/BookingCard";
import { palette } from "core/styles";
import styles from "./Bookings.styles";

const Bookings: FC<NativeStackScreenProps<BottomTabsNavParams, "Bookings">> = ({
  navigation,
}) => {
  const { currentUser } = useUser();
  const { getBookings, bookings, loading } = useGarage();

  const fetchBookings = async () => {
    if (!currentUser) {
      Toast.show({
        type: "info",
        text1: "Info",
        text2: "This feature is only available to loggedin users",
      });

      return;
    }

    getBookings(currentUser.id);
  };

  // Fetch bookings when the component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.BLACK} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchBookings} />
        }
      >
        <Text style={styles.bigText}>Bookings</Text>

        {bookings?.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookings;
