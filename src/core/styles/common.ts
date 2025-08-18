import { StyleSheet } from "react-native";
import { palette } from "./palette";

export const common = StyleSheet.create({
  textCenter: {
    textAlign: "center",
  },
  shadow: {
    shadowColor: "#999",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  w100: {
    width: "100%",
  },
  h100: {
    height: "100%",
  },
  line: {
    height: 1,
    // width: '100%',
    flex: 1,
    backgroundColor: palette.GREY,
  },
});
