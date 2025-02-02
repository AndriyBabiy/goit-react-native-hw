import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StrictMode, useState } from "react";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";

export default function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const onAuthorization = () => {
    setIsLoggedin((prev) => !prev);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {!isLoggedin ? (
        <AuthNavigator authorization={onAuthorization} />
      ) : (
        <MainNavigation authorization={onAuthorization} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto-Regular",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});
