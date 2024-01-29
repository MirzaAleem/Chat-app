import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJ62QbFN4weRA9IA-noZrokW0_CJUAdFA",
  authDomain: "chat-ac48f.firebaseapp.com",
  projectId: "chat-ac48f",
  storageBucket: "chat-ac48f.appspot.com",
  messagingSenderId: "706778058158",
  appId: "1:706778058158:web:b89a21c1d3f1ccb4bb0c3f"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);
