import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";

const Input = ({
  value,
  onTextChange,
  placeholder,
  outerStyles,
  leftIcon,
  actionButton,
  autofocus = false,
  secureTextEntry = false,
  onBlur: onBlurCustom,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);

    if (onBlurCustom) {
      onBlurCustom();
    }
  };

  return (
    <View
      onPress={onFocus}
      style={[styles.formInputField, isFocused && styles.focused, outerStyles]}
    >
      {leftIcon}
      <TextInput
        value={value}
        autofocus={autofocus}
        placeholder={placeholder}
        onChangeText={onTextChange}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        onFocus={onFocus}
        onBlur={onBlur}
        style={styles.formTextInput}
      />
      {actionButton}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formInputField: {
    flex: 1,
    flexDirection: "row",

    width: 343,
    maxHeight: 50,
    backgroundColor: "#F6F6F6",

    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 16,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",

    alignItems: "center",
  },
  formTextInput: {
    flexBasis: "auto",
    flexGrow: 1,
  },
  formInputTextPlaceholder: {
    color: "#BDBDBD",
  },
  formInputInteraction: {
    color: "#1B4371",
  },
  focused: {
    backgroundColor: "#ffffff",
    borderColor: "#FF6C00",
  },
});
