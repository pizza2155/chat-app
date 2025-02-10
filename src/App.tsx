import './App.css'
import Login from './Login.tsx'
import Chat from './Chat.tsx'
import { useAuth } from './firebase/auth.ts'

function App() {
  const { user } = useAuth();
  return (
    <>
      <h1>fucking chat app</h1>
      <Login></Login>
      {user ? (
        <Chat></Chat>
      ) : (
        null
      )}
    </>
  )
}

export default App
