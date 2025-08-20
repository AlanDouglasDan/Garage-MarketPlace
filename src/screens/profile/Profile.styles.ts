import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 0 : 50,
    backgroundColor: palette.WHITE,
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
    ...typography.header28,
    color: palette.BLACK,
    textAlign: "center",
    marginBottom: 24,
  },
});
