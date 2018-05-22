import { firebase, googleAuthProvider } from "../secrets/firebase";
import { LOGIN, LOGOUT } from "./constants";

export const login = uid => ({
  type: LOGIN,
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: LOGOUT
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
