import React from "react";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const Log = (props) => {
  const [SignupModal, setSignupModal] = useState(props.signup);
  const [SigninModal, setSigninModal] = useState(props.signin);

  const handelModals = (e) => {
    if (e.target.id === "register") {
      setSigninModal(false);
      setSignupModal(true);
    } else if (e.target.id === "login") {
      setSigninModal(true);
      setSignupModal(false);
    }
  };

  return (
    <div className="connection-container">
      <ul>
        <li
          onClick={handelModals}
          id="register"
          className={SignupModal ? "active-btn" : ""}
        >
          S'inscrire
        </li>
        <li
          onClick={handelModals}
          id="login"
          className={SigninModal ? "active-btn" : ""}
        >
          Se connecter
        </li>
      </ul>
      {SignupModal && <Signup />}
      {SigninModal && <Signin />}
    </div>
  );
};

export default Log;
