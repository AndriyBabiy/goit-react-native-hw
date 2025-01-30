import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../styles/global";

const Button = ({ children, onPress, buttonStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 343,
    height: 19 + 16 * 2,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    gap: 12,
    borderRadius: 100,
    backgroundColor: colors.accent_orange,
  },
});
