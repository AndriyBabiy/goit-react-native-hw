import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";

const Stack = createStackNavigator();

const AuthNavigator = ({ authorization }) => {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        authorization={authorization}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      /> */}
      <Stack.Screen name="Register">
        {(props) => (
          <RegistrationScreen {...props} authorization={authorization} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} authorization={authorization} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
