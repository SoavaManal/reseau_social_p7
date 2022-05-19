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
    <FontAwesomeIcon
      icon={faRightFromBracket}
      onClick={logout}
      className="logout"
    ></FontAwesomeIcon>
  );
};

export default Logout;
