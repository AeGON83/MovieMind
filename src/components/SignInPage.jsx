import React from "react";

export default function SignInPage() {
  const [isSwitched, setIsSwitched] = React.useState(true);

  const handleButtonClick = (e) => {
    setIsSwitched((old) => !old);
  };

  return (
    <div className="signin-page-container">
      <div className="signin-page-main">
        <div
          className={`signin-container a-container ${
            isSwitched ? "is-txl" : ""
          }`}
          id="a-condtainer"
        >
          <form action="" id="a-form" className="signin-form">
            <h2 className="form_title title">Create Account</h2>
            <span className="form__span">use email for registration</span>
            <lable className="lable-text">Name</lable>

            <input type="text" className="form__input" placeholder="abc" />
            <lable className="lable-text">Email</lable>
            <input
              type="text"
              className="form__input"
              placeholder="abc@gmail.com"
            />
            <lable className="lable-text">Password</lable>
            <input
              type="text"
              className="form__input Password"
              placeholder="******"
            />
            <button
              className="form__button signin-button submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div
          className={`signin-container b-container ${
            isSwitched ? "is-txl is-z200" : ""
          }`}
          id="b-container"
        >
          <form action="" className="signin-form" id="b-form">
            <h2 className="form_title title">Sign in to MovieMind</h2>
            <lable className="lable-text">Email</lable>
            <input type="text" className="form__input" placeholder="Email" />
            <lable className="lable-text">Password</lable>
            <input
              type="text"
              className="form__input Password"
              placeholder="Password"
            />
            <a href="" className="form__link">
              Forgot your password?
            </a>
            <button
              className="form__button signin-button submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Sign In
            </button>
          </form>
        </div>

        <div
          className={`signin-switch ${isSwitched ? "is-txr" : ""}`}
          id="switch-cnt"
        >
          <div
            className={`switch-container ${isSwitched ? "is-hidden" : ""}`}
            id="switch-c1"
          >
            <h2 className="switch__title title">Welcome Back!</h2>
            <p className="switch__description description">
              To keep connected with us please LogIn with your personal info
            </p>
            <button
              className="form__button signin-button"
              onClick={handleButtonClick}
            >
              Sign In
            </button>
          </div>

          <div
            className={`switch-container ${!isSwitched ? "is-hidden" : ""}`}
            id="switch-c2"
          >
            <h2 className="switch__title title">Hello Friends!</h2>
            <p className="switch__description description">
              In order to stay connected with us, please log in using your
              personal information.
            </p>
            <button
              className="form__button signin-button"
              onClick={handleButtonClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
