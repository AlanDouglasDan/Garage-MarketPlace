import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingTop: Platform.OS === "ios" ? 20 : 48,
    paddingBottom: Platform.OS === "ios" ? 20 : 44,
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexGrow: 1,
  },
  centerSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  text16: {
    ...typography.text16,
    color: palette.BLACK,
  },
  header20: {
    ...typography.header20,
    color: palette.BLACK,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signInText: {
    ...typography.text16,
    color: palette.BLACK,
  },
  signInLink: {
    ...typography.text16,
    color: palette.BLUE,
    fontWeight: '600',
  },
});
