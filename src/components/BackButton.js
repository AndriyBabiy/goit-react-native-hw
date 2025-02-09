import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackArrowIcon from "../../assets/icons/BackArrowIcon.js";

const BackButton = ({ onPress }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <TouchableOpacity onPress={onPress}>
      <BackArrowIcon />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
