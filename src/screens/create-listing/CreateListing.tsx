import React, { FC, useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Slider from "@react-native-community/slider";
// import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
// import MapView, { Marker } from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppStackNavParams } from "navigation/AppStackNav";
import { useUser } from "store/user/hooks";
import { useGarage } from "store/garage/hooks";
import { supabase } from "core/supabase";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { layout, spacing, palette } from "core/styles";
import styles from "./CreateListing.styles";

interface FormValues {
  title: string;
  description: string;
  size: string;
  address: string;
  price: number;
}

const initialValues: FormValues = {
  title: "",
  description: "",
  size: "",
  address: "",
  price: 10, // Default price
};

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  size: yup.string().required("Size is required"),
  address: yup.string().required("Address is required"),
  price: yup
    .number()
    .min(1, "Price must be at least £1")
    .required("Price is required"),
});

const CreateListing: FC<
  NativeStackScreenProps<AppStackNavParams, "Create Listing">
> = ({ navigation }) => {
  const { currentUser } = useUser();
  const { createListing } = useGarage();

  const [loading, setLoading] = useState<boolean>(false);

  //   const [location, setLocation] = useState<any>({
  //     lat: undefined,
  //     lng: undefined,
  //   });
  const [amenities, setAmenities] = useState({
    cctv: false,
    indoor: false,
    security24h: false,
  });
  const [image, setImage] = useState<any>(null);

  // Get the current user's location
  //   useEffect(() => {
  //     (async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         console.log("Location permission not granted");
  //         return;
  //       }

  //       let location = await Location.getCurrentPositionAsync({});
  //       setLocation({
  //         lat: location.coords.latitude,
  //         lng: location.coords.longitude,
  //       });
  //     })();
  //   }, []);

  // Function to pick an image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [amenity]: !prevAmenities[amenity],
    }));
  };

  // Function to upload image to Supabase Storage
  const uploadImage = async (listingId: string) => {
    const fileExtension = image.split(".").pop(); // Get the file extension (jpg, png, etc.)
    const fileName = `${Date.now()}.${fileExtension}`;
    const path = `${listingId}/${fileName}`;

    const formData = new FormData();
    // @ts-ignore
    formData.append("file", {
      uri: image,
      name: fileName,
      type: `image/${fileExtension}`,
    });

    const { error: uploadError } = await supabase.storage
      .from("listing-photos") // Specify the correct bucket
      .upload(path, formData, { upsert: false }); // Upload the image

    if (uploadError) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error uploading image: " + uploadError.message,
      });
    } else {
      // Generate the public URL of the uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("listing-photos").getPublicUrl(path); // Use the path to generate the URL

      // Insert the image details into the 'listing_photos' table
      const { error: insertError } = await supabase
        .from("listing_photos")
        .insert([
          {
            listing_id: listingId, // Associate the image with the listing
            url: publicUrl, // The public URL of the image
            sort_order: 1, // Optional: if you want to order the images
          },
        ]);

      if (insertError) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error inserting image: " + insertError.message,
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Listing created successfully!",
        });

        navigation.navigate("Bottom Tabs");
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);

    const { title, description, size, address, price } = values;

    const res = await createListing({
      host_id: currentUser?.id,
      title,
      description,
      price_per_day: price,
      size_sqft: parseInt(size),
      amenities: Object.keys(amenities).filter((key) => amenities[key]),
      address,
    });

    if (res && !res.error) {
      await uploadImage(res.payload[0].id);
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error creating listing: " + res.error.message,
      });
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.innerContainer}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}
          behavior="padding"
          style={layout.flex1}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              touched,
              errors,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
              isValid,
              dirty,
            }) => {
              return (
                <>
                  <View style={layout.flex1}>
                    <Input
                      label="Enter the title"
                      placeholder="Title"
                      value={values.title}
                      onChangeText={(text) => setFieldValue("title", text)}
                      containerStyle={spacing.marginTop12}
                      error={
                        touched.title && errors.title ? errors.title : undefined
                      }
                      onBlur={() => setFieldTouched("title")}
                      keyboardType="default"
                    />

                    <Input
                      label="Enter the description"
                      placeholder="Description"
                      value={values.description}
                      onChangeText={(text) =>
                        setFieldValue("description", text)
                      }
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.description && errors.description
                          ? errors.description
                          : undefined
                      }
                      onBlur={() => setFieldTouched("description")}
                      keyboardType="default"
                    />

                    <Input
                      label="Enter the size (in square feet)"
                      placeholder="Size"
                      value={values.size}
                      onChangeText={(text) => setFieldValue("size", text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.size && errors.size ? errors.size : undefined
                      }
                      onBlur={() => setFieldTouched("size")}
                      keyboardType="numeric"
                    />

                    <Input
                      label="Enter the address"
                      placeholder="Address"
                      value={values.address}
                      onChangeText={(text) => setFieldValue("address", text)}
                      containerStyle={spacing.marginTop24}
                      error={
                        touched.address && errors.address
                          ? errors.address
                          : undefined
                      }
                      onBlur={() => setFieldTouched("address")}
                      keyboardType="default"
                    />

                    {/* Amenities Checkbox */}
                    <View style={spacing.marginTop24}>
                      <Text style={styles.label}>Amenities</Text>

                      <View
                        style={[styles.checkboxContainer, spacing.marginTop12]}
                      >
                        <View style={layout.flexedRow}>
                          <Checkbox
                            value={amenities.cctv}
                            onValueChange={() => toggleAmenity("cctv")}
                            color={palette.BLACK}
                          />
                          <Text style={styles.checkboxLabel}>CCTV</Text>
                        </View>

                        <View style={layout.flexedRow}>
                          <Checkbox
                            value={amenities.indoor}
                            onValueChange={() => toggleAmenity("indoor")}
                            color={palette.BLACK}
                          />
                          <Text style={styles.checkboxLabel}>Indoor</Text>
                        </View>

                        <View style={layout.flexedRow}>
                          <Checkbox
                            value={amenities["security24h"]}
                            onValueChange={() => toggleAmenity("security24h")}
                            color={palette.BLACK}
                          />
                          <Text style={styles.checkboxLabel}>24h Security</Text>
                        </View>
                      </View>
                    </View>

                    <View style={[spacing.marginTop24, styles.sliderContainer]}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: palette.BLACK,
                          fontWeight: "600",
                          marginBottom: 8,
                        }}
                      >
                        Price per day: £{values.price.toFixed(2)}
                      </Text>
                      <View style={styles.sliderWrapper}>
                        <Slider
                          style={styles.slider}
                          minimumValue={5}
                          maximumValue={200}
                          step={5}
                          minimumTrackTintColor={palette.BLACK}
                          maximumTrackTintColor={palette.GREY}
                          thumbTintColor={palette.BLACK}
                          value={values.price}
                          onValueChange={(value) =>
                            setFieldValue("price", value)
                          }
                        />
                        <View style={styles.sliderLabels}>
                          <Text style={{ fontSize: 12 }}>£5</Text>
                          <Text style={{ fontSize: 12 }}>£200</Text>
                        </View>
                      </View>
                      {touched.price && errors.price && (
                        <Text style={styles.errorText}>{errors.price}</Text>
                      )}
                    </View>

                    {/* <GooglePlacesAutocomplete
                      placeholder="Search for Address"
                      predefinedPlaces={[]}
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        setFieldValue("address", data.description);
                        setLocation({
                          lat: details?.geometry.location.lat,
                          lng: details?.geometry.location.lng,
                        });
                      }}
                      query={{
                        key: "AIzaSyCqySNRVr-nR-6l_4bOL-R8BPDXf2a8RTA",
                        language: "en",
                      }}
                      styles={{
                        textInputContainer: spacing.marginTop20,
                        textInput: {
                          height: 38,
                          color: "#000",
                          fontSize: 16,
                        },
                        // predefinedPlacesDescription: styles.header16,
                        description: {
                          color: "#000",
                        },
                      }}
                      textInputProps={{
                        label: "Enter the address",
                        InputComp: Input,
                        clearButtonMode: "unless-editing",
                        placeholder: "Enter the address",
                        containerStyle: styles.input,
                      }}
                      listViewDisplayed
                    /> */}

                    {/* <MapView
                      provider="google"
                      style={styles.map}
                      region={{
                        latitude: location.lat,
                        longitude: location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                      showsUserLocation={true}
                    >
                      <Marker coordinate={location} />
                    </MapView> */}

                    {/* Image Picker */}
                    <TouchableOpacity style={styles.image} onPress={pickImage}>
                      {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                      ) : (
                        <Text style={styles.imageText}>Pick an Image</Text>
                      )}
                    </TouchableOpacity>

                    <Button
                      title="Submit"
                      containerStyle={spacing.marginTop16}
                      onPress={() => handleSubmit()}
                      disabled={!(isValid && dirty) || loading}
                      loading={loading}
                    />
                  </View>
                </>
              );
            }}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateListing;
