import React, { FC, useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SheetManager } from "react-native-actions-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavParams } from "navigation/AppStackNav";
import { useUser } from "store/user/hooks";
import { GarageCard } from "components/GarageCard";
import { Button } from "components/Button";
import { layout, palette, spacing } from "core/styles";
import styles from "./GarageDetails.styles";
import Toast from "react-native-toast-message";

const GarageDetails: FC<
  NativeStackScreenProps<AppStackNavParams, "Garage Details">
> = ({ navigation, route }) => {
  const { listing, fromBookingCard = false } = route.params ?? {};

  const { currentUser } = useUser();

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

        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityContainer}>
            <MaterialCommunityIcons
              name={listing.amenities.includes("cctv") ? "cctv" : "cctv-off"}
              size={24}
              color={palette.GREY}
            />

            <Text style={styles.text13}>CCTV</Text>
          </View>

          <View style={styles.amenityContainer}>
            <MaterialIcons
              name={listing.amenities.includes("indoor") ? "pool" : "cancel"}
              size={24}
              color={palette.GREY}
            />

            <Text style={styles.text13}>Indoor</Text>
          </View>

          <View style={styles.amenityContainer}>
            <MaterialCommunityIcons
              name={
                listing.amenities.includes("security24h")
                  ? "security"
                  : "cancel"
              }
              size={24}
              color={palette.GREY}
            />

            <Text style={styles.text13}>24hSecurity</Text>
          </View>

          <View style={styles.amenityContainer}>
            <FontAwesome5 name="vector-square" size={24} color={palette.GREY} />

            <Text style={styles.text13}>{listing.size_sqft} sqft</Text>
          </View>
        </View>

        <View style={spacing.marginTop24}>
          <Text style={styles.semiheader18}>Description</Text>

          <Text style={styles.text14}>{listing.description}</Text>
        </View>

        <View style={spacing.marginTop24}>
          <Text style={styles.semiheader18}>Reviews</Text>

          {listing.reviews?.length > 0 ? (
            listing.reviews.map((review: any, index: number) => (
              <View key={index} style={styles.reviewContainer}>
                <View style={[layout.flexedRow, styles.gap]}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                      key={star}
                      name="star"
                      color={
                        review.rating < star ? palette.GREY : palette.YELLOW
                      }
                      size={24}
                    />
                  ))}
                </View>

                <Text style={styles.text14}>{review.comment}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.text14}>No reviews yet</Text>
          )}
        </View>

        {/* Show Action buttons only if the current user is not the host */}
        {currentUser?.id !==
          (fromBookingCard ? listing.host_id.id : listing.host_id) && (
          <View style={[spacing.marginTop24, styles.gap]}>
            <Button
              title="Leave Review"
              variant="transparent"
              onPress={() =>
                currentUser
                  ? SheetManager.show("submit-review", {
                      // @ts-ignore
                      payload: {
                        listing_id: listing.id,
                        guest_id: currentUser?.id,
                      },
                    })
                  : Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: "User not authenticated",
                    })
              }
            />

            <Button
              title="Rent Now"
              onPress={() => navigation.navigate("Rent Now", { listing })}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GarageDetails;
