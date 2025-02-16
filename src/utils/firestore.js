import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const addUser = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });

    console.log("User added: ", userId);
  } catch (e) {
    console.log("Error adding user: ", e);
  }
};

export const addPost = async (userId, post) => {
  try {
    await setDoc(doc(db, "posts", userId), post, { merge: true });
    console.log("Post added: ", userId);
  } catch (e) {
    console.log("Error adding post: ", e);
  }
};

export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data: ", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document.");
    return null;
  }
};

export const getPost = async (id) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Post data: ", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document.");
    return null;
  }
};

export const getDocument = async (docId, collectionName) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateUserInFirestore = async (uid, data) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
    console.log("User data updated to Firestore: ", uid);
  } catch (e) {
    console.log("Error uploadig image: ", e);
  }
};

export const uploadImage = async (location, userId, file, fileName) => {
  try {
    const imageRef = ref(storage, `${location}/${userId}/${fileName}`);
    const result = await uploadBytes(imageRef, file);
    const imageUrl = await getImageUrl(imageRef);

    return imageUrl;
  } catch (e) {
    console.log("Error uploading image: ", e);
  }
};

const getImageUrl = async (imageRef) => {
  const url = await getDownloadURL(imageRef);

  return url;
};

export const fetchAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return posts;
  } catch (e) {
    console.log("Error fetching posts: ", e);
    return [];
  }
};

export const addCommentToDB = async (postId, comment) => {
  try {
    await updateDoc(doc(db, "posts", postId), {
      comments: arrayUnion(comment),
    });
  } catch (e) {
    console.log("Error addding comment: ", e);
  }
};
