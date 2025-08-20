import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.BLACK,
    marginBottom: 16,
  },
  semiheader16: {
    ...typography.semiheader16,
    color: palette.BLACK,
    marginBottom: 16,
  },
  text14: {
    ...typography.text14,
    color: palette.BLACK,
    marginBottom: 16,
  },
  gap: {
    gap: 16,
  },
});
