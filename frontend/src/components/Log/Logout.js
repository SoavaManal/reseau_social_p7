import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const removeJwt = () => {
  localStorage.removeItem("jwt");
};
const Logout = () => {
  const logout = () => {
    removeJwt();
    window.location = "/";
  };
  return (
    <div>
      <li onClick={logout}>
        <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
      </li>
    </div>
  );
};

export default Logout;
