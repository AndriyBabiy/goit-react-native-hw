import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StrictMode, useEffect, useState } from "react";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./src/navigation/MainNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { colors } from "./styles/global";
import { authStateChanged } from "./src/utils/auth";

export default function App() {
  // const [isLoggedin, setIsLoggedin] = useState(false);
  // const {isLoggedin, isLoading } = useAuth()

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1}}>
  //       <ActivityIndicator size={'large'} color={colors.accent_orange}/>
  //     </View>
  //   )
  // }

  // const onAuthorization = () => {
  //   setIsLoggedin((prev) => !prev);
  // };

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} color={colors.accent_orange} />
      </View>
    );
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
        <AuthListener />
      </PersistGate>
    </Provider>
  );
}

const AuthListener = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    authStateChanged(dispatch);
  }, [dispatch]);

  return (
    <NavigationContainer>
      {user ? <MainNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

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
