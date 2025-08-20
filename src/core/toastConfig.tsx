/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  SuccessToast,
  InfoToast,
  ErrorToast,
} from "react-native-toast-message";

export const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text2NumberOfLines={0} // 👈 This is key: shows full text2 without truncation
      text2Style={{
        flexWrap: "wrap", // ensure wrapping is allowed
      }}
    />
  ),

  info: (props) => (
    <InfoToast
      {...props}
      text2NumberOfLines={0} // 👈 This is key: shows full text2 without truncation
      text2Style={{
        flexWrap: "wrap", // ensure wrapping is allowed
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={0} // 👈 This is key: shows full text2 without truncation
      text2Style={{
        flexWrap: "wrap", // ensure wrapping is allowed
      }}
    />
  ),
};
