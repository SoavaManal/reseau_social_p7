import React from "react";
import Logout from "./Log/Logout";

const Navlink = () => {
  return (
    <>
      <div className="navigation">
        <div>
          <img
            href="logo groupomania"
            src="./image/logo2.png"
            className="logo-image"
          />
        </div>
        <div>
          <ul>
            <li className="navigation-link">Acceuil</li>
            <li className="navigation-link">Profile</li>
            <li className="navigation-link">Communautés</li>
            <Logout />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navlink;
