import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LogOutIcon from "../../assets/icons/LogOutIcon.js";

const LogoutButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LogOutIcon />
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({});
