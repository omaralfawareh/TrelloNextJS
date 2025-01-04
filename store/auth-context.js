import { createContext, useState, useEffect } from "react";
import { loginWithGoogle, logout } from "@/auth-util";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useCookies } from "react-cookie";
const AuthContext = createContext();

export function AuthContextProvider({ initialUser, children }) {
  const [user, setUser] = useState(initialUser);
  const [, setCookie, removeCookie] = useCookies();
  const googleLogin = loginWithGoogle;
  const signOut = logout;
  console.log("auth initial user", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (user && !initialUser) {
        // Set the token cookie on login
        (async () => {
          const token = await user.getIdToken();
          setCookie("token", token, {
            path: "/",
            secure: true,
            sameSite: "Strict",
          });
        })();
      } else if (user === null) {
        // Remove the token cookie on logout
        removeCookie("token", { path: "/" });
      }
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
