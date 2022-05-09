import React from "react";
import Logout from "../components/Log/Logout";

const NavigationBarre = () => {
  return (
    <>
      <div className="navigation account">
        <div>
          <img alt="logo groupomania" src="./image/logo2.png" />
        </div>
        <div>
          <ul>
            <li className="navigation-header">Bienvenue</li>
            <Logout />
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavigationBarre;
