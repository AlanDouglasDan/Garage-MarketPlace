import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.LIGHT_GREY,
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
    ...typography.text14,
    color: palette.GREY,
    textAlign: "center",
  },
});
