import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import CommentIcon from "../../assets/icons/CommentIcon.js";
import LocationIcon from "../../assets/icons/LocationIcon.js";
import { colors } from "../../styles/global.js";

const PostsScreen = ({ navigation, route }) => {
  const params = route?.params;

  const toComments = () => {
    navigation.navigate("Comments");
  };
  const toLocation = () => {
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/background.png")}
          />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.Name}>Username</Text>
          <Text style={styles.email}>Email</Text>
        </View>
      </View>
      <View style={styles.postCards}>
        <View style={styles.postCard}>
          <Image
            style={styles.postImage}
            source={require("../../assets/background.png")}
          />
          <Text style={styles.postTitle}>Post title</Text>
          <View style={styles.postDetails}>
            <Pressable style={styles.detailsElement} onPress={toComments}>
              <CommentIcon />
              <Text style={styles.commentCount}>15</Text>
            </Pressable>
            <Pressable style={styles.detailsElement} onPress={toLocation}>
              <LocationIcon />
              <Text style={styles.locationText}>House, City, Country</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
    gap: 32,

    paddingVertical: 32,
    paddingHorizontal: 16,

    backgroundColor: colors.white,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  profileImage: { width: 60, height: 60, borderRadius: 16 },
  login: {
    color: colors.black,
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "capitalize",
  },
  email: {
    color: colors.black,
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    fontWeight: 400,
  },
  postCards: {},
  postCard: {
    // flex: 1,
    gap: 8,
  },
  postImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: Dimensions.get("window").width - 16 * 2,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.gray,
  },
  postTitle: {
    color: colors.black,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    fontWeight: 500,
  },
  postDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsElement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentCount: {
    color: colors.dark_gray,
  },
  locationText: {
    textDecorationLine: "underline",
  },
});
