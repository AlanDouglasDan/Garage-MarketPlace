import React, { FC, useState } from "react";
import {
  TextInput,
  View,
  ViewStyle,
  Text,
  KeyboardTypeOptions,
  Keyboard,
  TouchableOpacity,
} from "react-native";
// import { Ionicons } from "@expo/vector-icons";

import { palette, common } from "core/styles";
import { noop } from "core/utils";
import styles from "./Input.styles";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  error?: string;
  onBlur?: () => void;
  keyboardType?: KeyboardTypeOptions;
  textBoxStyle?: any;
  rows?: number;
  disabled?: boolean;
  icon?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  autoComplete?: any;
  type?: "text" | "password";
}

const Input: FC<InputProps> = ({
  placeholder,
  value,
  label,
  containerStyle = {},
  onChangeText,
  error,
  onBlur = noop,
  keyboardType,
  textBoxStyle = {},
  rows,
  disabled,
  icon,
  autoCapitalize = "sentences",
  autoComplete = "off",
  type = "text",
}) => {
  const [focused, setFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(type === "password");

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}

      {icon && <View style={[styles.icon, !label && { top: 20 }]}>{icon}</View>}

      <View style={{ position: "relative" }}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={palette.GREY}
          style={[
            styles.input,
            focused && styles.inputFocus,
            error && styles.inputError,
            textBoxStyle,
            disabled ? styles.disabled : null,
            common.shadow,
            icon && styles.iconPadding,
            type === "password" && styles.inputWithToggle,
            // height,
          ]}
          value={value}
          onChangeText={onChangeText}
          // onContentSizeChange={handleContentSizeChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (!value) {
              setFocused(false);
            }
            onBlur();
          }}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          returnKeyLabel="Done"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          // selectionColor={palette.BLUE}
          multiline={!!rows}
          numberOfLines={rows}
          editable={!disabled}
          blurOnSubmit
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
        />
        {type === "password" && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={toggleSecureEntry}
            activeOpacity={0.7}
          >
            <Text style={styles.passwordToggleText}>
              {secureTextEntry ? "SHOW" : "HIDE"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {!!error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
};

export default Input;
