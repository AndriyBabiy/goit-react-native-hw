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

const RegistrationScreen = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onInputChange = (value, input) => {
    setData((prev) => ({ ...prev, [input]: value }));
  };

  const onRegister = () => {
    console.log(data);
    setData((prev) => ({ ...prev, username: "", email: "", password: "" }));
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
          <View style={styles.photoInput}>
            <TouchableWithoutFeedback
              style={styles.addImageButton}
              onPress={() => console.log("Add Image")}
            >
              <AddImageSVG style={styles.addImageButton} />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.header}>Registration</Text>
          <View style={styles.registrationForm}>
            <View style={styles.formFields}>
              <Input
                value={data.username}
                placeholder={"Username"}
                onTextChange={(value) => onInputChange(value, "username")}
              />
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
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
              <View style={styles.textWithLink}>
                <Text>Aready have account? </Text>
                <TouchableWithoutFeedback onPress={onRegister}>
                  <Text>Login</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default RegistrationScreen;

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
    height: 549,
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

    paddingTop: 92,
  },
  photoInput: {
    height: 120,
    width: 120,
    backgroundColor: colors.light_gray,
    borderRadius: 16,

    position: "absolute",
    top: -60,
    left: "50%" - 60,
  },
  addImageButton: {
    height: 25,
    width: 25,

    position: "absolute",
    right: -12,
    bottom: 14,
  },
  header: {
    color: colors.black_primary,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
  },
  registrationForm: {
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
