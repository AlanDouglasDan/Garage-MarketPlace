import React, { FC } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Toast from "react-native-toast-message";

import { useUser } from "store/user/hooks";
import { useGarage } from "store/garage/hooks";
import { Button } from "components/Button";
import { common, layout, palette } from "core/styles";
import styles from "./GarageCard.styles";

interface GarageCardProps {
  listing: any;
  navigation: any;
  fullCard?: boolean;
}

const GarageCard: FC<GarageCardProps> = ({
  listing,
  navigation,
  fullCard = true,
}) => {
  const { currentUser } = useUser();
  const { updateListing, getListings } = useGarage();

  const handleSubmit = async () => {
    const res = await updateListing({
      id: listing.id,
      host_id: currentUser?.id,
      is_active: false,
    });

    if (res.error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error deleting listing: " + res.error.message,
      });
    } else {
      await getListings();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Listing deleted successfully!",
      });
    }
  };

  return (
    <View
      key={listing.id}
      style={[
        styles.listingContainer,
        fullCard ? common.shadow : {},
        fullCard ? styles.cardedContainer : {},
      ]}
    >
      <View style={{ position: "relative" }}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>£{listing.price_per_day}/day</Text>
        </View>

        <Image
          source={{
            uri: listing.listing_photos[0]?.url,
          }}
          style={{ width: "100%", height: 250 }}
          contentFit="cover"
        />

        {fullCard && listing.host_id === currentUser?.id && (
          <TouchableOpacity
            style={styles.trashButton}
            onPress={() => {
              Alert.alert(
                "Delete Garage",
                "Are you sure you want to delete this garage? This action cannot be undone.",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                      handleSubmit();
                    },
                  },
                ]
              );
            }}
          >
            <Feather name="trash-2" size={20} color={palette.RED} />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={[
          styles.listingInfoContainer,
          { paddingHorizontal: fullCard ? 12 : 0 },
          layout.spacedRow,
        ]}
      >
        <View style={styles.gap}>
          <Text style={styles.semiheader18}>{listing.title}</Text>

          <View style={layout.flexedRow}>
            <Ionicons
              name="location-sharp"
              size={16}
              color={palette.ORANGE}
              style={{ marginLeft: -3, marginRight: 3 }}
            />

            <Text style={styles.text14}>{listing.address}</Text>
          </View>
        </View>

        {fullCard && (
          <Button
            title="Details"
            style={{ paddingHorizontal: 20, paddingVertical: 12 }}
            variant="transparent"
            onPress={() =>
              // @ts-ignore
              navigation.navigate("Garage Details", { listing })
            }
          />
        )}
      </View>
    </View>
  );
};

export default GarageCard;
