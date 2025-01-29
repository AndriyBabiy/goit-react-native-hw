import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import AddImageSVG from "../../assets/icons/addImage";
import Input from "../components/Input";
import { colors } from "../../styles/global";

const LoginScreen = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onInputChange = (value, input) => {
    setData((prev) => ({ ...prev, [input]: value }));
  };

  const onLogin = () => {
    console.log(data);
    setData((prev) => ({ ...prev, email: "", password: "" }));
  };

  const showPassword = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  const showButton = (
    <TouchableWithoutFeedback onPress={showPassword}>
      <Text
        style={[styles.formInputTextPlaceholder, styles.formInputInteraction]}
      >
        Show
      </Text>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <View style={styles.backgroundSection}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text style={styles.header}>Login</Text>
          <View style={styles.loginForm}>
            <View style={styles.formFields}>
              <Input
                value={data.email}
                placeholder={"Email"}
                onTextChange={(value) => onInputChange(value, "email")}
              />
              <Input
                value={data.password}
                placeholder={"Password"}
                onTextChange={(value) => onInputChange(value, "password")}
                actionButton={showButton}
                secureTextEntry={isPasswordHidden}
              />
            </View>
            <View style={styles.formSubmissionButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log(data)}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.textWithLink}>
                <Text>Don't have account? </Text>
                <TouchableWithoutFeedback onPress={onLogin}>
                  <Text>Register</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundSection: {
    width: "100%",
    height: 489,
    justifyContent: "center",
    alignItems: "center",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    gap: 34,
    justifyContent: "flex-start",
    alignItems: "center",

    paddingTop: 32,
  },
  header: {
    color: colors.black_primary,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
  },
  loginForm: {
    flex: 1,
    gap: 43,
  },
  formFields: {
    gap: 16,
  },
  formSubmissionButtons: {
    width: "100%",
    gap: 16,
  },
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
  buttonText: {
    color: colors.white,
  },
  textWithLink: {
    flexDirection: "row",
    justifyContent: "center",
    color: colors.navy_primary,
  },
});
