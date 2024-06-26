import { createContext, useState, useEffect } from "react";
import { loginWithGoogle, logout } from "@/auth-util";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(auth?.currentUser);
  const googleLogin = loginWithGoogle;
  const signOut = logout;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, googleLogin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
