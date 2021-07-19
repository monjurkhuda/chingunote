import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import firebaseApp from "./firebase";
import "./SignIn.css";

const SignUp = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    [history]
  );

  return (
    <div className="signin__container">
      <div className="auth__title">Monjur Chingu Journal</div>

      <form onSubmit={handleSignUp}>
        <label className="auth__subtitle">Sign Up</label>
        <div className="auth__container">
          <input
            className="auth__input"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="auth__input"
            name="password"
            type="password"
            placeholder="Password"
          />
          <button className="auth__button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      <div hidden={!errorMessage} className="auth__errormessage">
        {errorMessage}
      </div>
      <Link className="auth__link" to="/signin">
        Already have an account? Sign In!
      </Link>
    </div>
  );
};

export default withRouter(SignUp);
