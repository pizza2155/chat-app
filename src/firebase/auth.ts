import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from "firebase/auth";
import { firebaseConfig } from "../../firebaseConfig"
import { useEffect, useState } from "react";

// Firebaseの設定
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe();
  })
  return { user };
}

// googleログイン処理
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user; // ユーザー情報
  } catch (err) {
    console.error("Googleログインエラー", err);
    return null;
  }
}

// ログアウト処理
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("ログアウトエラー", err);
  }
}