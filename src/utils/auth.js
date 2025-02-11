import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { clearUserInfo, setUserInfo } from "../redux/reducers/userSlice";
import { auth } from "../../config";
import { addUser, getUser } from "./firestore";

export const registerDB = async (email, password, username) => {
  try {
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(credentials);

    const user = credentials.user;

    await addUser(user.uid, {
      uid: user.uid,
      email: user.email,
      username,
    });
  } catch (error) {
    console.log("SIGNUP ERROR: ", error);
  }
};

export const loginDB = async ({ email, password }, dispatch) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    console.log(credentials);

    const user = credentials.user;

    dispatch(
      setUserInfo({
        uid: user.uid,
        email: user?.email || "",
        displayName: user.displayName || "",
        profilePhoto: user?.photoURL || "",
      })
    );

    return user;
  } catch (e) {
    console.log(error);
  }
};

export const logoutDB = async (dispatch) => {
  try {
    await signOut(auth);

    dispatch(clearUserInfo());
  } catch (e) {
    console.log("LOGOUT ERROR: ", e);
  }
};

export const authStateChanged = (dispatch) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUser(user.id);

      dispatch(
        setUserInfo({
          ...userData,
          uid: user.uid,
          email: user.email || "",
        })
      );
    } else {
      dispatch(clearUserInfo());
    }
  });
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, update);
    } catch (e) {
      throw error;
    }
  }
};
