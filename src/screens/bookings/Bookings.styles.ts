import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 40,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.LIGHT_GREY,
  },
  bigText: {
    ...typography.header28,
    color: palette.BLACK,
    textAlign: "center",
  },
  headerContainer: {
    paddingTop: 12,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    ...typography.header20,
    color: palette.BLACK,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    ...typography.text16,
    color: palette.GREY,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  separator: {
    height: 16,
  },
});
