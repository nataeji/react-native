import { Platform } from "react-native";

export default {
  primary: Platform.OS === "ios" ? "Helvetica" : "NanumSquareB",
  secondary: Platform.OS === "ios" ? "Helvetica" : "NanumSquareR",
};
