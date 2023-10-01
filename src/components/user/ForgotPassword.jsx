import React, { useRef, useState } from "react";
import { useAuth } from "../user/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (erorr) {
      console.error(erorr);
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="signin-page-container">
        <div className="signin-page-main">
          <h2 className="form_title title">Password Reset</h2>
          <div className="signin-form-link">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
          <div className="signin-form-link">
            <Link to="/signup">Login</Link>
          </div>

          <div
            className={`error-alert ${error == "" ? "" : "show-erorr-alert"}`}
          >
            {error}
          </div>

          {message && <div className="alert alert-success">{message}</div>}
          <form className="signin-form" onSubmit={handleSubmit}>
            <label className="label-text">Email</label>
            <input
              type="email"
              ref={emailRef}
              required
              className="form__input"
            />

            <button
              disabled={loading}
              className="form__button signin-button submit"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
