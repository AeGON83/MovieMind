/** @format */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyATO7KSDFZjZbTc8u9JsXC-_1tEFrpeYq8",
	authDomain: "moviemind-ad492.firebaseapp.com",
	projectId: "moviemind-ad492",
	storageBucket: "moviemind-ad492.appspot.com",
	messagingSenderId: "509326735055",
	appId: "1:509326735055:web:c754b55c6f3d75d63d29ba",
	measurementId: "G-L9ZWZGT8QS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export default app;
