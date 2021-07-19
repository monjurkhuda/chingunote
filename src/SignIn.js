import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebaseApp from "./firebase.js";
import { AuthContext } from "./Auth.js";
import "./SignIn.css";

const SignIn = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebaseApp
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
    [history]
  );

  async function demoLogin() {
    try {
      await firebaseApp
        .auth()
        .signInWithEmailAndPassword("demouser@demomail.com", "demodemo");
      history.push("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signin__container">
      <div className="auth__title">Monjur Pingu Journal</div>

      <form onSubmit={handleSignIn}>
        <label className="auth__subtitle">Sign In</label>
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
            Sign In
          </button>
          <button className="demo__button" onClick={demoLogin}>
            Demo Sign In
          </button>
        </div>
      </form>
      <div hidden={!errorMessage} className="auth__errormessage">
        {errorMessage}
      </div>
      <Link className="auth__link" to="/signup">
        Don't have an account? Sign Up!
      </Link>
      <Link className="auth__link" to="/passwordreset">
        Forgot Your Password?
      </Link>
    </div>
  );
};

export default withRouter(SignIn);
