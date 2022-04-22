import { useState, useEffect, createContext, useContext } from "react";
import { loginWithGoogle, authStateChanged } from "../firebase/client";

const USER_STATES = {
  NOT_LOGGED: null,
};

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(USER_STATES.NOT_LOGGED);

  useEffect(() => {
    authStateChanged(setUser);
  }, []);

  /*   useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/Login");
  }, [user]); */

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(setUser)
      .catch((error) => console.error(error));
  };

  const value = {
    user,
    handleGoogleLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// hook para usar el contexto en cualquier component de la app
export const useUser = () => {
  return useContext(AuthContext);
};
