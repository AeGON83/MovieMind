/** @format */

import "./styles/App.css";
import SignInPage from "./components/user/SignInPage";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/user/AuthContext";
import PrivateRoute from "./components/user/PrivateRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgotPassword from "./components/user/ForgotPassword";

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route
						path='/'
						element={
							<PrivateRoute>
								<Homepage />
							</PrivateRoute>
						}
					/>
					<Route
						path='/update-profile'
						element={
							<PrivateRoute>
								<UpdateProfile />
							</PrivateRoute>
						}
					/>
					<Route
						path='/signup'
						element={<SignInPage />}
					/>
					<Route
						path='/forgot-password'
						element={<ForgotPassword />}
					/>
				</Routes>
			</AuthProvider>
		</Router>
	);
}


export default App;
