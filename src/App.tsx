import './App.css'
import './Chat.css'
import Login from './Login.tsx'
import Chat from './Chat.tsx'
import Page from './pages/saizeriya/index.tsx'
import { useAuth } from './firebase/auth.ts'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const { user } = useAuth();
  return (
    <>
    <header style={{position: 'fixed', top:0, width: '100%', left: 0}}>
      {/* <h1>fucking chat app</h1> */}
    </header>
      <BrowserRouter>
        <nav>
          <ul style={{position: 'absolute', top: '3%', left: '1%'}}>
            <li>
              <Link to='/page'>test page</Link>
            </li>
            <li>
              <Link to='/chat'>go to chat</Link>
            </li>
            <li>
              <Link to='/login'>log in</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/page' element={<Page></Page>} />
          <Route path='/login' element={
            <Login></Login>
          }></Route>
          <Route path='/chat' element={user ? (
            <Chat></Chat>
          ) : (
            null
          )}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
