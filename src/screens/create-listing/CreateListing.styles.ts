import { StyleSheet, Platform } from "react-native";

import { palette, typography } from "core/styles";

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: palette.WHITE,
  },
  innerContainer: {
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: 24,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "ios" ? 20 : 60,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderWrapper: {
    marginTop: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: palette.RED,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  map: {
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.GREY,
    borderRadius: 8,
  },
  input: {
    height: 40,
    ...typography.text16,
    borderColor: "#ccc",
    color: palette.BLACK,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  imageText: {
    ...typography.header16,
    color: palette.BLACK,
  },
  label: {
    ...typography.text18,
    color: palette.BLACK,
  },
});
