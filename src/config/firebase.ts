import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
// Change getAuth to initializeAuth and add getReactNativePersistence
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA4YyIOi1xSddHCeLMdBN5mwrjQbJPn_Iw",
    authDomain: "amolnama-cc2bf.firebaseapp.com",
    projectId: "amolnama-cc2bf",
    storageBucket: "amolnama-cc2bf.firebasestorage.app",
    messagingSenderId: "283254200113",
    appId: "1:283254200113:web:248a3bff50f167568ec210"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with Persistence (Memory for the phone)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = initializeFirestore(app, {});

export { app, auth, db };
