/** @format */

import React, { useState } from "react";
import { useAuth } from "../user/AuthContext";
import { Link, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/signup");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="account-card-container">
      <div className="acoount-card">
        <h2 className="">Profile</h2>
        {error && <div className="alert">{error}</div>}
        <p className="account-email">{currentUser.email}</p>
        <Link to="/update-profile" className="account-btn-link">
          Update Profile
        </Link>
      </div>
      <div className="">
        <button className="account-btn-link" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
