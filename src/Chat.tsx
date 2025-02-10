import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./firebase/auth"


const Chat = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; senderId: string, timestamp: Timestamp }[]>([]);

  useEffect(() => {

    const chatCollection = collection(db, "chats")

    const unsubscribe = onSnapshot(chatCollection, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        senderId: doc.data().senderId,
        timestamp: doc.data().timestamp
      }))
      const sortedMessages = messageData.sort((a,b) => a.timestamp - b.timestamp)
      setMessages(sortedMessages)
    })

    return () => unsubscribe();
  }, [])

  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim() === "" || !user) return;

    await addDoc(collection(db, "chats"), {
      text: message,
      senderId: user.uid,
      timestamp: serverTimestamp(),
    })

    setMessage("")
  }

  return (
    <div>
      <h2>チャット</h2>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.senderId} : </strong>{msg.text} 時間：{msg.timestamp?.toDate()?.toDateString()}
          </li>
        ))}
      </ul>
      <input type="text" 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="メッセージを入力"/>
      <button onClick={sendMessage}>送信</button>
    </div>
  )
}

export default Chat;