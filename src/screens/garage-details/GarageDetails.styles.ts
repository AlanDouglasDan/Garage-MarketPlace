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
  amenitiesContainer: {
    borderWidth: 1,
    borderColor: palette.GREY,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  amenityContainer: {
    gap: 8,
    alignItems: "center",
    flex: 1,
  },
  text13: {
    ...typography.text13,
    color: palette.BLACK,
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.BLACK,
    marginBottom: 16,
  },
  text14: {
    ...typography.text14,
    color: palette.GREY2,
  },
  reviewContainer: {
    gap: 8,
    flex: 1,
  },
  gap: {
    gap: 8,
  },
});
