import React from "react";
import Logout from "../components/Log/Logout";

const NavigationBarre = () => {
  return (
    <>
      <div className="navigation account">
        <img
          alt="logo groupomania"
          src="/images/logo2.png"
          className="logo-acceuil"
        />
        <Logout />
      </div>
    </>
  );
};

export default NavigationBarre;
