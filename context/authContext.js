import { useState, useEffect, createContext } from "react";
import { loginWithGoogle, authStateChanged } from "../firebase/client";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authStateChanged(setUser);
  }, []);

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(setUser)
      .catch((error) => console.error(error));
  };

  return (
    <AuthContext.Provider value={{ user, handleGoogleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
