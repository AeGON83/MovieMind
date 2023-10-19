import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  let firstTime = true;
  let msgUserRef = {};

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider);
  };

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return updateEmail(auth, currentUser, email);
  }

  function updatePassword(currentPassword, newPassword) {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return reauthenticateWithCredential(user, credential).then(() => {
      return updatePassword(user, newPassword);
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        if (
          firstTime &&
          user.metadata.creationTime === user.metadata.lastSignInTime
        ) {
          firstTime = false;
          msgUserRef = {
            email: user.email,
            uid: user.uid,
            name: "user",
          };

          axios
            .post("http://localhost:5000/createUser", msgUserRef)
            .then((response) => {
              console.log("Response:", response.data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          msgUserRef = {};
          msgUserRef = {
            email: user.email,
            uid: user.uid,
            name: "user",
          };
          console.log(msgUserRef);
          // user.state = "LoggedIn";
          // console.log(user);
        }
      } else {
        // console.log("Logged out user");
        user = { loginState: "loggedOut" };
        console.log(user);
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
