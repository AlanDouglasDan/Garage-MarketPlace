import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { palette, spacing } from "core/styles";
import styles from "../Listings.styles";

export const renderEmptyComponent = ({ searchTerm, clearSearch }: any) => (
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
