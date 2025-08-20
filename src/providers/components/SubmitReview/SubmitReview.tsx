import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import Toast from "react-native-toast-message";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { SheetManager } from "react-native-actions-sheet";

import { useGarage } from "store/garage/hooks";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { spacing, palette } from "core/styles";
import { navigate } from "navigation/utils";
import styles from "./SubmitReview.styles";

const SubmitReview = (props: any) => {
  const listing_id: string = props?.payload?.listing_id ?? "";
  const guest_id: string = props?.payload?.guest_id ?? "";

  const { submitReview, loading, getBookings, getListings } = useGarage();

  const [feedback, setFeedback] = useState<string>("");

  const [rating, setRating] = useState<number>(0);

  const handleSubmit = async () => {
    const res = await submitReview({
      listing_id,
      guest_id,
      comment: feedback,
      rating,
    });

    if (res && !res.error) {
      await getBookings(guest_id);
      await getListings();

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Review submitted successfully!",
      });

      SheetManager.hide("submit-review");

      navigate("Bottom Tabs");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error submitting review: " + res.error.message,
      });
    }
  };

  return (
    <ActionSheet
      animated
      id={props.sheetId}
      gestureEnabled={true}
      containerStyle={styles.container}
    >
      <Text style={styles.header18}>Rate your booking</Text>

      <View style={[styles.flexedRow, spacing.marginTop12]}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            activeOpacity={1}
          >
            <FontAwesome
              name={rating < star ? "star-o" : "star"}
              color={rating < star ? palette.GREY : palette.YELLOW}
              size={24}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Input
        label="Write your feedback"
        placeholder="Your feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        containerStyle={spacing.marginTop24}
        rows={4}
      />

      <Button
        title="Submit"
        onPress={handleSubmit}
        disabled={loading}
        loading={loading}
        style={spacing.marginTop28}
      />
    </ActionSheet>
  );
};

export default SubmitReview;
