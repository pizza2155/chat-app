import { db } from "../../firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";


const chatCollection = collection(db, "chats");


// メッセージを追加する関数
export const addMessage = async (userId: string, text: string) => {
  try {
    await addDoc(chatCollection, {
      senderId: userId,
      text: text,
      timestamp: new Date(),
    });
    console.log("メッセージ追加成功");    
  } catch (err) {
    console.log("メッセージ追加エラー：", err);
    
  }
}

// メッセージを取得する関数
export const getMessage = async () => {
  try {
    const querySnapshot = await getDocs(chatCollection);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (err) {
    console.log("メッセージ取得エラー：", err);
    return [];
  }
}