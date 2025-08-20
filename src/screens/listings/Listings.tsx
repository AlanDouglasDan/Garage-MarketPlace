import React, { FC, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
  TextInput,
  Keyboard,
  RefreshControl,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BottomTabsNavParams } from "navigation/bottom-tabs-nav/BottomTabsNav";
import { useUser } from "store/user/hooks";
import { useGarage } from "store/garage/hooks";
import { GarageCard } from "components/GarageCard";
import { common, layout as layoutUtil, palette, spacing } from "core/styles";
import styles from "./Listings.styles";

const Listings: FC<NativeStackScreenProps<BottomTabsNavParams, "Listings">> = ({
  navigation,
}) => {
  const { getUser, currentUser, updateUser } = useUser();
  const { loading, getListings, listings } = useGarage();

  const [isHost, setIsHost] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [garages, setGarages] = useState<any[]>([]);
  const [filteredGarages, setFilteredGarages] = useState<any[]>([]);

  useEffect(() => {
    getListings();
    getUser();
  }, []);

  useEffect(() => {
    currentUser && setIsHost(currentUser?.is_host || false);
  }, [currentUser]);

  useEffect(() => {
    if (listings) {
      setGarages(listings);
      setFilteredGarages(listings);
    }
  }, [listings]);

  // Filter garages based on search term (searches both name and location)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredGarages(garages);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = garages.filter((garage) => {
      const matchesName = garage.title.toLowerCase().includes(searchLower);
      const matchesLocation =
        garage.address?.toLowerCase().includes(searchLower) || false;
      return matchesName || matchesLocation;
    });

    setFilteredGarages(filtered);
  }, [searchTerm, garages]);

  const clearSearch = () => {
    setSearchTerm("");
    Keyboard.dismiss();
  };

  // Handle switching host status
  const toggleHostStatus = async (value: boolean) => {
    setIsHost(value);

    const res = await updateUser({
      id: currentUser?.id,
      is_host: value,
    });

    if (res && !res.error) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your host status has been updated successfully",
      });
    }
  };

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
          <RefreshControl refreshing={loading} onRefresh={getListings} />
        }
      >
        <View style={layoutUtil.spacedRow}>
          <Text style={styles.semiheader18}>
            Hello {currentUser ? currentUser.full_name.split(" ")[0] : "Guest"}{" "}
            👋
          </Text>

          {currentUser && (
            <View style={layoutUtil.flexedRow}>
              <Text style={styles.semiheader16}>Is Host?</Text>
              <Switch
                value={isHost}
                onValueChange={toggleHostStatus} // Toggle the host status
              />
            </View>
          )}
        </View>

        <View
          style={[
            styles.searchContainer,
            spacing.marginTop20,
            spacing.marginBottom20,
            common.shadow,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Search garages by name or location"
            placeholderTextColor={palette.GREY}
            onChangeText={setSearchTerm}
            value={searchTerm}
            returnKeyType="search"
            onSubmitEditing={Keyboard.dismiss}
          />
          {searchTerm ? (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={22} color={palette.GREY} />
            </TouchableOpacity>
          ) : (
            <Ionicons name="search-outline" size={22} color={palette.GREY} />
          )}
        </View>

        <View
          style={[
            layoutUtil.flexedRow,
            layoutUtil.spacedRow,
            spacing.marginBottom16,
          ]}
        >
          <Text style={styles.bigText}>
            {searchTerm ? "Search Results" : "Popular Garages"}
            {!searchTerm && "🔥"}
          </Text>

          <Text style={styles.resultCount}>
            {filteredGarages.length}{" "}
            {filteredGarages.length === 1 ? "result" : "results"}
          </Text>
        </View>

        {filteredGarages.length > 0 ? (
          filteredGarages.map((listing) => (
            <GarageCard
              key={listing.id}
              listing={listing}
              navigation={navigation}
            />
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <Ionicons
              name="search"
              size={48}
              color={palette.GREY}
              style={spacing.marginBottom16}
            />

            <Text style={styles.noResultsText}>No garages found</Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your search or filters
            </Text>

            {searchTerm && (
              <TouchableOpacity
                style={[styles.clearButton, spacing.marginTop16]}
                onPress={clearSearch}
              >
                <Text style={styles.clearButtonText}>Clear all filters</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>

      {isHost && (
        <TouchableOpacity
          style={styles.fab}
          // @ts-ignore
          onPress={() => navigation.navigate("Create Listing")}
        >
          <Entypo name="plus" size={36} color={palette.WHITE} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Listings;
