import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./user/AuthContext";

export default function Navbar({ style }) {
  const navigate = useNavigate();
  const navigateToHomepage = () => {
    navigate("/");
  };

  let { currentUser } = useAuth();
  return (
    <div className="navbar-container" style={style}>
      <div className="navbar-wrapper">
        <div className="navbar-title">
          <div className="navbar-title-logo" onClick={navigateToHomepage}></div>
          <p onClick={navigateToHomepage}>MovieMind</p>
        </div>

        <ul className="navbar-items">
          <li>Moveis</li>
          <li>Web Series</li>
          <li>Community</li>
          <li>Favorites</li>
        </ul>
        <div className="navbar-buttons-wrapper">
          <button className="normal-button" id="signin-button">
            {currentUser ? (
              <Link to="/account">Account</Link>
            ) : (
              <Link to="/signup">Sign In</Link>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
