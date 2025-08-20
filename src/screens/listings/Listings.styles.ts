import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.LIGHT_GREY,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bigText: {
    ...typography.header20,
    color: palette.BLACK,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: palette.BLACK,
    borderRadius: 28,
    elevation: 4,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.LIGHT_GREY,
  },
  semiheader16: {
    ...typography.semiheader16,
    marginRight: 8,
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.BLACK,
  },
  input: {
    flex: 1,
    ...typography.text14,
    color: palette.BLACK,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    paddingHorizontal: 16,
    height: 48,
    backgroundColor: palette.WHITE,
  },
  clearButton: {
    alignSelf: "center",
    padding: 8,
    marginTop: 8,
  },
  clearButtonText: {
    ...typography.text14,
    color: palette.BLUE,
    textDecorationLine: "underline",
  },
  resultCount: {
    ...typography.text14,
    color: palette.GREY,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  noResultsText: {
    ...typography.header18,
    color: palette.BLACK,
    textAlign: "center",
    marginBottom: 8,
  },
  noResultsSubtext: {
    ...typography.text16,
    color: palette.GREY,
    textAlign: "center",
    marginTop: 8,
  },
  headerContainer: {
    paddingTop: 16,
    marginBottom: 20,
  },
  searchBarContainer: {
    marginBottom: 20,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  searchIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterButton: {
    padding: 4,
  },
  priceFilterContainer: {
    overflow: "hidden",
    backgroundColor: palette.WHITE,
    borderRadius: 8,
    paddingTop: 16,
    paddingHorizontal: 16,
    marginTop: 8,
    elevation: 2,
    shadowColor: palette.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sliderContainer: {
    width: "100%",
  },
  priceRangeTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceRangeText: {
    ...typography.text14,
    color: palette.BLACK,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  clearFilterButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  clearFilterText: {
    ...typography.text12,
    color: palette.BLUE,
    textDecorationLine: "underline",
  },
});
