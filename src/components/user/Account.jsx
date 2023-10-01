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
    <div className="signin-page-container">
      <div className="signin-page-main">
        <h2 className="form_title title">Profile</h2>
        {error && <div className="alert">{error}</div>}
        <p className="account-email">{currentUser.email}</p>
        <Link
          to="/update-profile"
          className="form__button signin-button submit"
        >
          Update Profile
        </Link>

        <button
          className="form__button signin-button submit"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
