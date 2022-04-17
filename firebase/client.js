import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { firebaseConfig } from "./firebaseConfig";


// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

// mapeamos/transformamos los datos que queremos
const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL } = user;
  return {
    name: displayName,
    email,
    avatar: photoURL,
  };
};

// atrapamos el error si ocurre en un objeto
const catchErrorsFromFirebaseAuth = (error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.email;
  const credential = GoogleAuthProvider.credentialFromError(error);
  return { errorCode, errorMessage, email, credential };
};

export const authStateChanged = async (onChange) => {
  return await onAuthStateChanged(auth, (user) => {
    // si el usuario existe transformamos la data a lo que nos interesa
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => result.user)
    .then(mapUserFromFirebaseAuth)
    .catch(catchErrorsFromFirebaseAuth);
};

export const firebaseLogout = () => {
  return signOut(auth)
    .then(console.log("logout"))
    .catch((error) => {
      console.error(error);
    });
};
