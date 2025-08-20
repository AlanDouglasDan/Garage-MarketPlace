import React, { FC, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavParams } from "navigation/AppStackNav";
import { useUser } from "store/user/hooks";
import { useGarage } from "store/garage/hooks";
import { GarageCard } from "components/GarageCard";
import { Button } from "components/Button";
import { supabase } from "core/supabase";
import styles from "./RentNow.styles";
import { layout, spacing } from "@src/core/styles";

const RentNow: FC<NativeStackScreenProps<AppStackNavParams, "Rent Now">> = ({
  navigation,
  route,
}) => {
  const { listing } = route.params ?? {};

  const { currentUser } = useUser();
  const { rentGarage } = useGarage();

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [showStartDate, setShowStartDate] = useState<boolean>(false);
  const [showEndDate, setShowEndDate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const totalPrice = Math.round(
    (listing.price_per_day * (endDate.getTime() - startDate.getTime())) /
      (1000 * 60 * 60 * 24)
  );

  const createBooking = async () => {
    setLoading(true);

    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "This feature is only available to logged in users",
      });

      navigation.goBack();

      return;
    }

    // Convert dates to strings for comparison in the query (Supabase uses timestamp format)
    const startDateString = startDate.toISOString();
    const endDateString = endDate.toISOString();

    // Check for overlapping bookings
    const { data: conflictingBookings, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("listing_id", listing.id)
      .gte("start_date", startDateString)
      .lte("end_date", endDateString);

    if (bookingError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2:
          "Error checking for overlapping bookings: " + bookingError.message,
      });
    }

    // If there are conflicting bookings, do not proceed
    if (conflictingBookings && conflictingBookings.length > 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There are overlapping bookings for these dates.",
      });

      setLoading(false);
      return;
    }

    const res = await rentGarage({
      guest_id: currentUser.id,
      listing_id: listing.id,
      host_id: listing.host_id.id,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
    });

    if (res.error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error creating booking: " + res.error.message,
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Booking created successfully!",
      });

      // @ts-ignore
      navigation.navigate("Bottom Tabs", { screen: "Bookings" });
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
      >
        <GarageCard
          listing={listing}
          navigation={navigation}
          fullCard={false}
        />

        <View>
          <Text style={styles.semiheader16}>Select Start & End Dates</Text>

          <View style={layout.flexedRow}>
            <View style={layout.flex1}>
              <Text style={styles.text14}>Start Date</Text>

              {/* {showStartDate ? ( */}
              <DateTimePicker
                value={startDate}
                onChange={(event, date) => {
                  if (date) {
                    setStartDate(date);
                    setShowStartDate(false);
                  }
                }}
                mode="date"
                minimumDate={new Date()}
                style={{ marginLeft: -10 }}
              />
              {/* ) : (
              <TouchableOpacity onPress={() => setShowStartDate(true)}>
                <Text style={styles.text14}>
                  {startDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            )} */}
            </View>

            <View style={layout.flex1}>
              <Text style={styles.text14}>End Date</Text>
              {/* {showEndDate ? ( */}
              <DateTimePicker
                value={endDate}
                onChange={(event, date) => {
                  if (date) {
                    setEndDate(date);
                    setShowEndDate(false);
                  }
                }}
                mode="date"
                minimumDate={startDate}
                style={{ marginLeft: -10 }}
              />
              {/* ) : (
              <TouchableOpacity onPress={() => setShowEndDate(true)}>
                <Text style={styles.text14}>
                  {endDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            )} */}
            </View>
          </View>
        </View>

        <Text
          style={[
            styles.semiheader18,
            spacing.marginTop32,
            spacing.marginBottom20,
          ]}
        >
          Total Price: £{totalPrice}
        </Text>

        <Button
          title="Confirm Booking"
          onPress={() =>
            currentUser
              ? createBooking()
              : Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "User not authenticated",
                })
          }
          disabled={totalPrice === 0 || loading}
          loading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RentNow;
