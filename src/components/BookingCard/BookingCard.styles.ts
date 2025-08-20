import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  bookingContainer: {
    backgroundColor: palette.WHITE,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
  },
  header16: {
    ...typography.header16,
    color: palette.BLACK,
  },
  gap4: {
    gap: 4,
  },
  semiheader18: {
    ...typography.semiheader18,
    color: palette.BLACK,
  },
  text18: {
    ...typography.text18,
    color: palette.GREY2,
  },
  rightAlign: {
    alignItems: "flex-end",
  },
  header30: {
    ...typography.header30,
    lineHeight: 30,
    color: palette.BLACK,
  },
  flexedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    // borderWidth: 1,
  },
  text14: {
    ...typography.text14,
    color: palette.GREY2,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
