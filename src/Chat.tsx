import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./firebase/auth"


const Chat = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; senderId: string, timestamp: Timestamp, displayName: string }[]>([]);

  useEffect(() => {

    const chatCollection = collection(db, "chats")

    const unsubscribe = onSnapshot(chatCollection, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        senderId: doc.data().senderId,
        timestamp: doc.data().timestamp,
        displayName: doc.data().displayName,
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
      displayName: user.displayName,
      timestamp: serverTimestamp(),
    })

    setMessage("")
  }

  const formatDate = (dateInfo: Timestamp) => {
    if (!dateInfo) return;
    const timestamp = dateInfo.toDate();
    return `${timestamp.getMonth()+1}/${timestamp.getDay()} ${timestamp.getUTCHours()+8}:${timestamp.getMinutes()}`;
  }

  return (
    <div className="chat-containner">
      <h2>チャット</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.senderId === user?.uid ? "sent" : "received"}`}>
            <p className="sender-name">{msg.displayName || "匿名"}</p>
            <p className="text"> {msg.text}</p>
            {formatDate(msg.timestamp)}
          </div>
        ))}
      </div>
      <div className="input-area">
      <input type="text" 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="メッセージを入力"/>
      <button onClick={sendMessage}>送信</button>
      </div>
    </div>
  )
}

export default Chat;