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
import MediaPage from "./components/MediaPage";
import DiscoverPage from "./components/DiscoverPage";
import MovieSection from "./components/MovieSection";
import TvSection from "./components/TvSection";
import CommunityPage from "./components/CommunityPage";
import CommunityGroup from "./components/CommunityGroup";
import Player from "./components/Player";
import CollectionPage from "./components/CollectionPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/MovieSection" element={<MovieSection />} />
          <Route path="/TvSection" element={<TvSection />} />
          <Route path="/DiscoverPage/:id" element={<DiscoverPage />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/signup" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/account" element={<Account />} />
          <Route path="/:type/:id" element={<MediaPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/play/:id" element={<Player />} />
          <Route path="/Collection/:id" element={<CollectionPage />} />
          <Route
            path="/community/:communityName"
            element={<CommunityGroup />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
