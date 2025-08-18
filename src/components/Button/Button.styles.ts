import { StyleSheet } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  button: {
    backgroundColor: palette.BLACK,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: palette.WHITE,
    ...typography.semiheader16,
  },
  disabled: {
    backgroundColor: palette.DISABLED,
    opacity: 0.5,
  },
  transparent: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: palette.BLACK,
  },
});
