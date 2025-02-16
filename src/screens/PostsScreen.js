import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CommentIcon from "../../assets/icons/CommentIcon.js";
import LocationIcon from "../../assets/icons/LocationIcon.js";
import { colors } from "../../styles/global.js";
import { fetchAllPosts, getUser } from "../utils/firestore.js";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PostsScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.user.userInfo);
  const [userData, setUserData] = useState(null);
  const params = route?.params;
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefresh] = useState(false);

  const getAllPosts = async () => {
    try {
      const result = await fetchAllPosts();
      setPosts(result);
      setRefresh(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const result = await getUser(user.uid);
        setUserData((prev) => ({ ...prev, ...result }));
      } catch (e) {
        console.error(e);
      }
    };

    getAllPosts();
    getUserData();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    getAllPosts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            source={
              userData && userData.profileImage.length > 1
                ? { uri: userData.profileImage }
                : require("../../assets/placeholder_profile_image.png")
            }
          />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.username}>
            {userData ? userData.username : "Username"}
          </Text>
          <Text style={styles.email}>
            {userData ? userData.email : "email"}
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <Post data={item} />}
        style={styles.postCards}
        onRefresh={onRefresh}
        refreshing={refreshing}
      ></FlatList>
    </View>
  );
};

const Post = ({ data }) => {
  const navigation = useNavigation();
  const { id, image, title, comments, address, geolocation } = data.item;
  const toComments = () => {
    navigation.navigate("Comments", { postId: id });
  };
  const toLocation = ({ longitude, latitude }) => {
    navigation.navigate("Map", { geolocation: geolocation });
  };

  console.log(data);

  return (
    <View style={styles.postCard}>
      <Image style={styles.postImage} source={{ uri: image }} />
      <Text style={styles.postTitle}>{title}</Text>
      <View style={styles.postDetails}>
        <Pressable style={styles.detailsElement} onPress={toComments}>
          <CommentIcon />
          <Text style={styles.commentCount}>{comments.length}</Text>
        </Pressable>
        <Pressable style={styles.detailsElement} onPress={toLocation}>
          <LocationIcon />
          <Text
            style={styles.locationText}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {address}
          </Text>
        </Pressable>
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
  username: {
    color: colors.black,
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    // fontWeight: 700,
    textTransform: "capitalize",
  },
  email: {
    color: "graphite",
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    fontWeight: 400,
  },
  postCards: {},
  postCard: {
    // flex: 1,
    gap: 8,
    paddingBottom: 32,
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
    maxWidth: 220,
    textDecorationLine: "underline",
  },
});
