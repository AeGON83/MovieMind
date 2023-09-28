/** @format */

import "./styles/App.css";
import SignInPage from "./components/user/SignInPage";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/user/AuthContext";
// import PrivateRoute from "./components/user/PrivateRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import ForgotPassword from "./components/user/ForgotPassword";
import Account from "./components/user/Account";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
