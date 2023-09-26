/** @format */

import React, { useContext, useState, useEffect } from "react";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,

} from "firebase/auth";

import { auth } from "../../firebase.js";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {


	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	 const googleSignIn = () => {
			const provider = new GoogleAuthProvider();
			// signInWithPopup(auth, provider);
			signInWithRedirect(auth, provider);
		};


	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
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
