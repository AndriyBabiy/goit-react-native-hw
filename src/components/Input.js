import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { colors } from "../../styles/global";

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
  alternativeInput = false,
  children,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const PLACES_KEY = process.env.EXPO_PUBLIC_PLACES_KEY;
  const autocompleteRef = useRef(null);

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
      {alternativeInput ? (
        children
      ) : (
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
      )}
      {actionButton}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formInputField: {
    flexDirection: "row",

    width: 343,
    maxHeight: 150,
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
    paddingVertical: 15,
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
