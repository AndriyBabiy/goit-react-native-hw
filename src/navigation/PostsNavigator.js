import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostsScreen from "../screens/PostsScreen";
import CommentsSection from "../screens/CommentsSection";
import LogoutButton from "../components/LogoutButton";
import { colors } from "../../styles/global";
import BackButton from "../components/BackButton";
import MapScreen from "../screens/MapScreen";

const PostsStack = createNativeStackNavigator();

const PostsNavigator = ({ authorization }) => {
  return (
    <PostsStack.Navigator
      initialRouteName="Posts"
      options={{
        headerLeft: () => (
          <BackButton onPress={() => navigation.navigate("Posts Navigator")} />
        ),
      }}
    >
      <PostsStack.Screen
        name={"Posts"}
        // component={PostsScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ focused }) => (
            <PublicationsIcon
              size={32}
              color={focused ? colors.accent_orange : colors.black_primary}
            />
          ),
          tabBarIconStyle: styles.bottomBarElement,
          headerRightContainerStyle: styles.headerRightStyle,
          headerRight: ({}) => <LogoutButton onPress={authorization} />,
        })}
      >
        {(props) => <PostsScreen {...props} authorization={authorization} />}
      </PostsStack.Screen>
      <PostsStack.Screen
        name={"Comments"}
        component={CommentsSection}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
      <PostsStack.Screen
        name={"Map"}
        component={MapScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        })}
      />
    </PostsStack.Navigator>
  );
};

export default PostsNavigator;

const styles = StyleSheet.create({
  bottomBarElement: {
    height: 40,
    width: 40,
  },
  addPostElement: {
    backgroundColor: colors.accent_orange,
    width: 70,
    borderRadius: 50,
  },
  headerRightStyle: {
    paddingRight: 10,
  },
});
