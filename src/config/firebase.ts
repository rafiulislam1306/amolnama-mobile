import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4YyIOi1xSddHCeLMdBN5mwrjQbJPn_Iw",
    authDomain: "amolnama-cc2bf.firebaseapp.com",
    projectId: "amolnama-cc2bf",
    storageBucket: "amolnama-cc2bf.firebasestorage.app",
    messagingSenderId: "283254200113",
    appId: "1:283254200113:web:248a3bff50f167568ec210"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Simplified for mobile initial test
const auth = getAuth(app);

export { auth, db };
