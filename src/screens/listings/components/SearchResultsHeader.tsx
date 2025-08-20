import { View, Text } from "react-native";
import { layout } from "core/styles";
import styles from "../Listings.styles";

export const renderResultsHeader = ({ searchTerm, filteredGarages }: any) => (
  <View
    style={[layout.flexedRow, layout.spacedRow, styles.resultsHeader]}
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
