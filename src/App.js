import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./SignIn";
import PasswordReset from "./PasswordReset";
import SignUp from "./SignUp";
import Notes from "./Notes";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/passwordreset" component={PasswordReset} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Notes} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
