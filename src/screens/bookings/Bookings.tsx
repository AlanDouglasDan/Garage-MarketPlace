import React, { FC, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
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

  // Render header for the FlatList
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.bigText}>Bookings</Text>
    </View>
  );

  // Render empty state when there are no bookings
  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No bookings found</Text>
      <Text style={styles.emptySubtext}>
        {currentUser 
          ? "You don't have any bookings yet." 
          : "Please sign in to view your bookings."}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        <FlatList
          data={bookings || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BookingCard
              booking={item}
              navigation={navigation}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchBookings} />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Bookings;
