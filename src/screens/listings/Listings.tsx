import React, { FC, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
  TextInput,
  Keyboard,
  RefreshControl,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
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
  const [showPriceFilter, setShowPriceFilter] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [priceRange, setPriceRange] = useState<number>(0);
  const slideAnim = React.useRef(new Animated.Value(0)).current;

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
  // Toggle price filter visibility with animation
  const togglePriceFilter = () => {
    const toValue = showPriceFilter ? 0 : 1;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    setShowPriceFilter(!showPriceFilter);
  };

  // Filter garages based on search term and price range
  useEffect(() => {
    let filtered = [...garages];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((garage) => {
        const matchesName = garage.title.toLowerCase().includes(searchLower);
        const matchesLocation =
          garage.address?.toLowerCase().includes(searchLower) || false;
        return matchesName || matchesLocation;
      });
    }

    // Apply price filter
    if (priceRange > 0) {
      filtered = filtered.filter(
        (garage) => garage.price_per_day >= priceRange
      );
    }

    setFilteredGarages(filtered);
  }, [searchTerm, garages, priceRange]);

  // Set max price when garages are loaded
  useEffect(() => {
    if (garages.length > 0) {
      const max = Math.max(...garages.map((g) => g.price_per_day || 0));
      setMaxPrice(Math.ceil(max / 50) * 50); // Round up to nearest 50
    }
  }, [garages]);

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

  // Empty state component
  const renderEmptyComponent = () => (
    <View style={[styles.noResultsContainer, { marginTop: 20 }]}>
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
  );

  // Header with greeting and host toggle
  const renderGreeting = () => (
    <View style={[layoutUtil.spacedRow, styles.headerContainer]}>
      <Text style={styles.semiheader18}>
        Hello {currentUser ? currentUser.full_name.split(" ")[0] : "Guest"} 👋
      </Text>

      {currentUser && (
        <View style={layoutUtil.flexedRow}>
          <Text style={styles.semiheader16}>Is Host?</Text>
          <Switch value={isHost} onValueChange={toggleHostStatus} />
        </View>
      )}
    </View>
  );

  // Search results header
  const renderResultsHeader = () => (
    <View
      style={[layoutUtil.flexedRow, layoutUtil.spacedRow, styles.resultsHeader]}
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
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.innerContainer}>
        {renderGreeting()}

        <View
          style={[
            styles.searchContainer,
            common.shadow,
            showPriceFilter ? styles.searchBarContainer : {},
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
          <View style={styles.searchIconsContainer}>
            <TouchableOpacity
              onPress={togglePriceFilter}
              style={styles.filterButton}
            >
              <Ionicons
                name="options"
                size={22}
                color={priceRange > 0 ? palette.BLUE : palette.GREY}
              />
            </TouchableOpacity>
            {searchTerm ? (
              <TouchableOpacity onPress={clearSearch}>
                <Ionicons name="close-circle" size={22} color={palette.GREY} />
              </TouchableOpacity>
            ) : (
              <Ionicons name="search-outline" size={22} color={palette.GREY} />
            )}
          </View>
        </View>

        {/* Price Filter Slider */}
        <Animated.View
          style={[
            styles.priceFilterContainer,
            {
              minHeight: showPriceFilter ? 120 : 0,
              height: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }),
              opacity: slideAnim,
              marginBottom: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 16],
              }),
            },
          ]}
        >
          {showPriceFilter && (
            <View style={styles.sliderContainer}>
              <View style={styles.priceRangeTextContainer}>
                <Text style={styles.priceRangeText}>
                  Min Price: ${priceRange}
                </Text>
                <Text style={styles.priceRangeText}>Max: ${maxPrice}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={maxPrice}
                step={10}
                minimumTrackTintColor={palette.BLUE}
                maximumTrackTintColor={palette.LIGHT_GREY}
                thumbTintColor={palette.BLUE}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <TouchableOpacity
                onPress={() => setPriceRange(0)}
                style={styles.clearFilterButton}
              >
                <Text style={styles.clearFilterText}>Clear Filter</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        <FlatList
          data={filteredGarages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GarageCard listing={item} navigation={navigation} />
          )}
          ListHeaderComponent={renderResultsHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getListings} />
          }
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      </View>

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
