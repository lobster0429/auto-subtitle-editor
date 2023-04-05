import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5VjdbqpggE_5jcTaUrn907Cl5jOwpdyI",
  authDomain: "affable-heading-372502.firebaseapp.com",
  projectId: "affable-heading-372502",
  storageBucket: "affable-heading-372502.appspot.com",
  messagingSenderId: "16902429127",
  appId: "1:16902429127:web:16299be0a2aa5854fa61e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


