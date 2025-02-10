import { useState } from "react";
import { signInWithGoogle, logout } from "./firebase/auth";
import { useAuth } from "./firebase/auth";

const Login = () => {

  const { user } = useAuth();

  const [userProfile, setUser] = useState<any>(null);

  const handleLogin = async () => {
    const loggedInUser:any = await signInWithGoogle();
    if (loggedInUser) setUser(loggedInUser);
  }

  const handleLogout = async () => {
    await logout();
    setUser(null);
  }

  return (
    <div>
      {user ? (
        <div>
          <p>こんにちは、{userProfile?.displayName} さん</p>
          <img src={userProfile?.photoURL} alt="profile" width={50} height={50} />
          <div>
            </div><button onClick={handleLogout}>ログアウト</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Googleでログイン</button>
      )}
    </div>
  )
}

export default Login;