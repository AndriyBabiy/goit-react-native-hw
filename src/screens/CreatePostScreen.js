import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Pressable, TextInput, TouchableWithoutFeedback } from "react-native";
import CameraIcon from "../../assets/icons/CameraIcon.js";
import LocationIcon from "../../assets/icons/LocationIcon.js";
import BinIcon from "../../assets/icons/BinIcon.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../styles/global";
import Input from "../components/Input.js";
import Button from "../components/Button.js";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const postFields = {
  image: "",
  title: "",
  location: "",
  geolocation: {
    latitude: "",
    longitude: "",
  },
};

const CreatePostScreen = ({ navigation, route }) => {
  const params = route?.params;
  const [postData, setPostData] = useState(postFields);
  const [buttonActive, setButtonActive] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [errorMsg, setErrorMsg] = useState(null);

  const navigateToCameraScreen = () => {
    navigation.replace("Camera", {
      title: postData?.title,
      location: postData?.location,
    });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setPostData((prev) => ({ ...prev, image: uri }));
    }
  };

  const onInputChange = (value, input) => {
    setPostData((prev) => ({ ...prev, [input]: value }));
  };

  useEffect(() => {
    if (
      postData.image.length > 1 &&
      postData.title.length > 1 &&
      postData.location.length > 1
    ) {
      setButtonActive(true);
    }
  }, [postData]);

  useEffect(() => {
    if (!params?.photo) return;

    setPostData((prev) => ({
      ...prev,
      image: params?.photo,
      title: params?.title,
      location: params?.location,
    }));
  }, [params]);

  const clearPost = () => {
    setPostData((prev) => ({ ...prev, ...postFields }));

    // navigation.setParams(null);
    () => {
      params.image = "";
      params.title = "";
      params.location = "";
    };
    setButtonActive(false);
  };

  const onSubmitPost = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    setPostData((prev) => ({
      ...prev,
      geolocation: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    }));

    params.postData = postData;

    clearPost();
    navigation.navigate("Posts Navigator");
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.createPostSection}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.photoSection}>
            <View style={[styles.photoContainer, { overflow: "hidden" }]}>
              {postData.image ? (
                <Image source={{ uri: postData.image }} style={styles.image} />
              ) : !cameraPermission ? (
                <View />
              ) : !cameraPermission.granted ? (
                <View
                  style={[
                    styles.container,
                    {
                      backgroundColor: colors.light_gray,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <Text style={styles.message}>
                    We need your permission to show the camera
                  </Text>
                  <Button
                    onPress={requestCameraPermission}
                    buttonStyle={{ backgroundColor: colors.accent_orange }}
                  >
                    <Text style={{ color: colors.white }}>
                      Grant permission
                    </Text>
                  </Button>
                </View>
              ) : (
                <CameraView
                  style={{
                    flex: 1,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  facing="back"
                >
                  <Button
                    buttonStyle={styles.cameraButton}
                    onPress={navigateToCameraScreen}
                  >
                    <CameraIcon />
                  </Button>
                </CameraView>
              )}
            </View>
            <TouchableWithoutFeedback onPress={pickImage}>
              <Text style={styles.fieldDescription}>Upload Photo</Text>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.formSection}>
            <Input
              value={postData.title}
              placeholder={"Title..."}
              onTextChange={(value) => onInputChange(value, "title")}
              outerStyles={{
                width: "100%",
                borderWidth: 0,
                backgroundColor: colors.white,
                paddingHorizontal: 0,
                borderBottomWidth: 1,
                borderRadius: 0,
              }}
            />
            <Input
              value={postData.location}
              placeholder={"Location..."}
              onTextChange={(value) => onInputChange(value, "location")}
              outerStyles={{
                width: "100%",
                borderWidth: 0,
                backgroundColor: colors.white,
                paddingHorizontal: 0,
                borderBottomWidth: 1,
                borderRadius: 0,
              }}
              leftIcon={<LocationIcon style={{ marginRight: 4 }} />}
            />
          </View>
          <Button
            buttonStyle={[
              { width: "100%" },
              !buttonActive && {
                backgroundColor: colors.light_gray,
              },
            ]}
            disabled={!buttonActive}
            onPress={onSubmitPost}
          >
            <Text
              style={
                !buttonActive
                  ? { color: colors.dark_gray }
                  : { color: colors.white }
              }
            >
              Create
            </Text>
          </Button>
        </KeyboardAvoidingView>
        <Button
          buttonStyle={[
            {
              alignSelf: "center",
              width: 70,
              height: 40,
              justifyContent: "center",
              backgroundColor: colors.light_gray,
            },
          ]}
          onPress={clearPost}
        >
          <BinIcon />
        </Button>
      </View>
    </Pressable>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 32,
    paddingHorizontal: 16,

    justifyContent: "space-between",
    backgroundColor: colors.white,
    gap: 32,
  },
  createPostSection: {
    gap: 32,
  },
  photoSection: {
    gap: 8,
  },
  photoContainer: {
    width: "100%",
    height: 240,
    flexShrink: 0,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.light_gray,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  cameraButton: {
    height: 60,
    width: 60,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  fieldDescription: {
    width: "100%",
    color: colors.dark_gray,
  },
  formSection: {
    flex: 1,
    gap: 16,
    minHeight: 150,
  },
});
