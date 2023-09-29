import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./user/AuthContext";

export default function Navbar() {
  let { currentUser } = useAuth();
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-title">
          <div className="navbar-title-logo"></div>
          <p>MOVIEMIND</p>
        </div>

        <ul className="navbar-items">
          <li>Community</li>
          <li>Categories</li>
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
