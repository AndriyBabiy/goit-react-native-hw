import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGodlArl1LPDVJURsRUR90iQt55_1tlZA",
  authDomain: "goit-reactnative-hw-1f0f8.firebaseapp.com",
  projectId: "goit-reactnative-hw-1f0f8",
  storageBucket: "gs://goit-reactnative-hw-1f0f8.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
