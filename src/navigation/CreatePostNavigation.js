import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreatePostScreen from "../screens/CreatePostScreen";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import CameraScreen from "../screens/CameraScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const CreatePostStack = createNativeStackNavigator();

const CreatePostNavigation = () => {
  return (
    <CreatePostStack.Navigator
      initialRouteName="Create Post"
      screenOptions={({ navigation }) => ({
        headerLeftContainerStyle: styles.headerLeft,
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      })}
    >
      <CreatePostStack.Screen name="Create Post" component={CreatePostScreen} />
      <CreatePostStack.Screen name="Camera" component={CameraScreen} />
    </CreatePostStack.Navigator>
  );
};

export default CreatePostNavigation;

const styles = StyleSheet.create({
  headerLeft: {
    padding: 16,
  },
});
