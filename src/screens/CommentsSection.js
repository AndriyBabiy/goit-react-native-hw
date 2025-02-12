import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Input from "../components/Input";
import { colors } from "../../styles/global";
import Button from "../components/Button";
import SendArrowIcon from "../../assets/icons/SendArrowIcon";

const CommentsSection = ({ navigation, route }) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "flex",
          paddingTop: 4,
          paddingHorizontal: 82,
          alignItems: "center",
          justifyContent: "center",
        },
      });
    };
  }, []);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/background.png")}
            />
            <ScrollView>
              <View style={styles.comments}>
                <View style={[styles.comment, styles.commentRight]}>
                  <Image
                    source={require("../../assets/background.png")}
                    style={styles.commentUserImage}
                  />
                  <View
                    style={[styles.commentContent, styles.commentContentRight]}
                  >
                    <Text style={styles.commentBody}>
                      Main comment text Main comment text Main comment text Main
                      comment text Main comment text Main comment text Main
                      comment text Main comment text
                    </Text>
                    <Text
                      style={[
                        styles.commentTimestamp,
                        styles.commentTimestampLeft,
                      ]}
                    >
                      Comment Timestamp
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <Input
              outerStyles={styles.commentInput}
              placeholder={"Comment..."}
              actionButton={
                <Button buttonStyle={styles.commentSubmitButton}>
                  <SendArrowIcon />
                </Button>
              }
            ></Input>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsSection;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: Dimensions.get("window").width,
    paddingVertical: 32,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    gap: 32,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.gray,
  },
  comments: {
    gap: 24,
  },
  comment: {
    gap: 16,
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
  commentLeft: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  commentContent: {
    width: 299,
    height: "auto",
    padding: 16,
    gap: 8,
    backgroundColor: colors.light_gray,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentContentLeft: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentUserImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.gray,
    overflow: "hidden",
  },
  commentTimestamp: {
    fontFamily: "Roboto-Regular",
    color: colors.dark_gray,
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
  },
  commentTimestampLeft: {
    textAlign: "left",
  },
  commentInput: {
    width: "auto",
    borderRadius: 100,
  },
  commentSubmitButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "auto",
    height: "auto",

    backgroundColor: colors.accent_orange,
    position: "absolute",
    top: 8,
    right: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
});
