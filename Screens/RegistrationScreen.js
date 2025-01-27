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
} from "react-native";
import React, { Component } from "react";
import { background_img } from "../assets/registration-bg.jpg";
import { StatusBar } from "expo-status-bar";
import { SvgComponent as addImage } from "../assets/icons/addImage.js";

export default class RegistrationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundSection}>
          <View style={styles.content}>
            <View style={styles.photoInput}>
              <TouchableWithoutFeedback
                style={styles.addImageButton}
                onPress={() => console.log("Add Image")}
              >
                <Image source={addImage} style={styles.addImageButton} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.header}>Registration</Text>
            <View style={styles.registrationForm}>
              <View style={styles.formFields}>
                <TouchableWithoutFeedback
                  onPress={() => console.log("Form Field Entry")}
                >
                  <View style={styles.formInputField}>
                    <Text style={styles.formInputTextPlaceholder}>Login</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => console.log("Form Field Entry")}
                >
                  <View style={styles.formInputField}>
                    <Text style={styles.formInputTextPlaceholder}>Email</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => console.log("Form Field Entry")}
                >
                  <View style={styles.formInputField}>
                    <Text style={styles.formInputTextPlaceholder}>
                      Password
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() => console.log("Show password clicked")}
                    >
                      <Text
                        style={[
                          styles.formInputTextPlaceholder,
                          styles.formInputInteraction,
                        ]}
                      >
                        Show
                      </Text>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.formInteractionButtons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => console.log("Register")}
                >
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.textWithLink}>
                  <Text>Aready have account? </Text>
                  <TouchableWithoutFeedback
                    onPress={() => console.log("Switch to Login")}
                  >
                    <Text>Login</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

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

    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    gap: 34,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",

    paddingTop: 92,
  },
  photoInput: {
    height: 120,
    width: 120,
    backgroundColor: "#f6f6f6",
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
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
  },
  registrationForm: {
    gap: 43,
  },
  formFields: {
    gap: 16,
  },
  formInputField: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",

    flexDirection: "row",
    justifyContent: "space-between",

    padding: 16,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  formInputTextPlaceholder: {
    color: "#BDBDBD",
  },
  formInputInteraction: {
    color: "#1B4371",
  },
  formInteractionButtons: {
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
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  textWithLink: {
    flexDirection: "row",
    justifyContent: "center",
    color: "#1B4371",
  },
});
