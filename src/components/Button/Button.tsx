import React, { FC } from "react";
import {
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { palette } from "core/styles";
import styles from "./Button.styles";

interface ButtonProps {
  title: string;
  variant?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  title,
  variant = "default",
  disabled = false,
  loading = false,
  onPress,
  style,
  containerStyle = {},
  textStyle,
  prefixIcon,
  suffixIcon,
}) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.6}
        style={[
          styles.button,
          disabled && styles.disabled,
          variant === "transparent" && styles.transparent,
          style,
        ]}
        onPress={disabled ? () => {} : onPress}
      >
        {prefixIcon}

        {loading ? (
          <ActivityIndicator size={24} color={palette.BLACK} />
        ) : (
          <Text
            style={[
              styles.buttonText,
              textStyle,
              variant === "transparent" && { color: palette.BLACK },
              disabled && { color: palette.GREY2 },
            ]}
          >
            {title}
          </Text>
        )}

        {!loading && suffixIcon}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
