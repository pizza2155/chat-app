import { signInWithGoogle, logout } from "./firebase/auth";
import { useAuth } from "./firebase/auth";

const Login = () => {
  const { user } = useAuth();

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>こんにちは、{user?.displayName} さん</p>
          <img src={user?.photoURL ?? undefined} alt="profile" width={50} height={50} />
          <div>
          </div><button onClick={handleLogout}>ログアウト</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Googleでログイン</button>
      )}
    </div>
  );
};

export default Login;