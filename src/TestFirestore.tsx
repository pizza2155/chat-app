import { useState } from "react";
import { addMessage, getMessage } from "./firebase/firestore";
import { auth } from "./firebase/auth"


const TestFirestore = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const user = auth.currentUser;

  const handleSend = async () => {
    if (!user) return;
    await addMessage(user.uid, "テストメッセージ")
  }
  
  const handleFetch = async () => {
    const msgs = await getMessage();
    setMessages(msgs.reverse());
  }

  return (
    <div>
      <h2>Firestoreテスト</h2>
      <button onClick={handleSend} disabled={!user}>
        FIrestoreに書き込む
      </button>
      <button onClick={handleFetch}>メッセージを取得</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text} (送信者： {msg.senderId} 時間：{msg.timestamp.toDate().toString()})</li>
        ))}
      </ul>
    </div>
  );
}

export default TestFirestore