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
import AddImageSVG from "../../assets/icons/addImage";
import Input from "../components/Input";
import { colors } from "../../styles/global";
import Button from "../components/Button";

const RegistrationScreen = ({ switchAuthorization }) => {
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
    if (
      data.email.length > 1 &&
      data.username.length > 1 &&
      data.password.length > 1
    ) {
      console.log(data);
      setData((prev) => ({ ...prev, username: "", email: "", password: "" }));
    } else {
      console.log("Data Missing: Please fill all fields.");
    }
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
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-208 + 32}
      >
        <View style={styles.backgroundSection}>
          <View style={styles.content}>
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
                <Button onPress={onRegister}>
                  <Text style={styles.buttonText}>Register</Text>
                </Button>
                <View style={styles.textWithLink}>
                  <Text>Aready have account? </Text>
                  <TouchableWithoutFeedback onPress={switchAuthorization}>
                    <Text style={styles.link}>Login</Text>
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
