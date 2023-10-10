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
        <h2 className="form_title title">User Profile</h2>
        {error && <div className="alert">{error}</div>}
        <p style={{ fontFamily: "Oswald , sans-serif", fontSize: "18px" }}>
          Email
        </p>
        <p className="account-email" style={{ fontSize: "15px" }}>
          {currentUser.email}
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "20%",
            height: "100%",
            alignItems: "flex-end",
            position: "absolute",
            top: "-10%",
          }}
        >
          <Link to="/update-profile">
            <button className="form__button signin-button">
              Update Profile
            </button>
          </Link>

          <button
            className="form__button signin-button submit"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
