import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebaseApp from "./firebase.js";
import "./SignIn.css";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function resetPassword() {
    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  return (
    <div className="signin__container">
      <div className="auth__title">Monjur Chingu Journal</div>
      <label className="auth__subtitle">Forgot password?</label>
      <input
        className="auth__input"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <button className="auth__button" onClick={resetPassword}>
        Send Password Reset Email
      </button>
      <div hidden={!errorMessage} className="auth__errormessage">
        {errorMessage}
      </div>
      <Link className="auth__link" to="/signup">
        Don't have an account? Sign Up!
      </Link>
      <Link className="auth__link" to="/signin">
        Remeber your password? Sign In!
      </Link>
    </div>
  );
}

export default PasswordReset;
