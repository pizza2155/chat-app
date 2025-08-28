import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDy4ACpSpaykbz9zP9zVMHQ1r-jASN7hMs",
  authDomain: "chat-app-d4aea.firebaseapp.com",
  projectId: "chat-app-d4aea",
  storageBucket: "chat-app-d4aea.firebasestorage.app",
  messagingSenderId: "1033938101724",
  appId: "1:1033938101724:web:9790b298efe26313819b19"
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);