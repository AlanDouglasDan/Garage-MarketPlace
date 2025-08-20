import React, { FC } from "react";
import { TouchableOpacity, Text, View, Alert } from "react-native";
import Toast from "react-native-toast-message";

import { useUser } from "store/user/hooks";
import { useGarage } from "store/garage/hooks";
import { Button } from "components/Button";
import { spacing, common, layout } from "core/styles";
import styles from "./BookingCard.styles";

interface BookingProps {
  booking: any;
  navigation?: any;
}

const Booking: FC<BookingProps> = ({ booking, navigation }) => {
  const { currentUser } = useUser();
  const { cancelBooking, loading, getBookings } = useGarage();

  const handleSubmit = async () => {
    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not authenticated",
      });

      return;
    }

    const res = await cancelBooking({
      bookingId: booking.id,
      userId: currentUser.id,
    });

    if (res.error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error canceling booking: " + res.error.message,
      });
    } else {
      await getBookings(currentUser.id);

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Booking cancelled successfully!",
      });
    }
  };

  return (
    <View style={[styles.bookingContainer, common.shadow]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Garage Details", {
            listing: booking.listings,
            fromBookingCard: true,
          })
        }
      >
        <View style={[styles.gap4, layout.flex1]}>
          <Text style={styles.header16}>{booking.listings.title}</Text>

          <View style={spacing.marginTop20}>
            <Text style={styles.header30}>€{booking.total_price}</Text>
          </View>

          <Text style={styles.semiheader18}>
            Host: {booking.listings.host_id.full_name}
          </Text>

          <Text style={[styles.text18, spacing.marginTop20]}>
            {new Date(booking.start_date).toDateString()} -{" "}
            {new Date(booking.end_date).toDateString()}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={spacing.marginTop12}>
        <View style={[styles.flexedRow, spacing.marginTop10]}>
          <Button
            title="Book Again"
            variant="transparent"
            containerStyle={layout.flex1}
            onPress={() =>
              navigation.navigate("Rent Now", {
                listing: booking.listings,
                fromBookingCard: true,
              })
            }
          />

          {new Date(booking.start_date) > new Date() && (
            <Button
              title="Cancel"
              variant="destructive"
              containerStyle={layout.flex1}
              onPress={() => {
                Alert.alert(
                  "Cancel Booking",
                  "Are you sure you want to cancel this booking?",
                  [
                    {
                      text: "Close",
                      onPress: () => {},
                    },
                    {
                      text: "Cancel Booking",
                      style: "destructive",
                      onPress: async () => handleSubmit(),
                    },
                  ]
                );
              }}
              disabled={loading}
              loading={loading}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Booking;
