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
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import AddImageSVG from "../../assets/icons/AddImageIcon";
import Input from "../components/Input";
import { colors } from "../../styles/global";
import Button from "../components/Button";

const LoginScreen = ({ route, navigation, authorization }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onInputChange = (value, input) => {
    setData((prev) => ({ ...prev, [input]: value }));
  };

  const onLogin = () => {
    if (data.email.length > 1 && data.password.length > 1) {
      console.log(data);
      setData((prev) => ({ ...prev, email: "", password: "" }));
      authorization();
    } else {
      console.log("Data Missing: Please fill all fields.");
    }
  };

  const showPassword = () => {
    setIsPasswordHidden((prev) => !prev);
  };

  const toRegister = () => {
    navigation.replace("Register", {
      email: data.email,
      password: data.password,
    });
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
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <Image
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-274 + 32}
      >
        <View style={styles.backgroundSection}>
          <View style={styles.content}>
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
                <Button onPress={onLogin}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
                <View style={styles.textWithLink}>
                  <Text>Don't have account? </Text>
                  <TouchableWithoutFeedback onPress={toRegister}>
                    <Text style={styles.link}>Register</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Pressable>
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
    position: "absolute",
    top: 0,
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
  link: {
    textDecorationLine: "underline",
  },
});
