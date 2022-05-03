import React from "react";
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
        <img
          alt="icons pour se déconnecter"
          src="./image/icons/logout.svg"
          className="navigation-logout"
        />
      </li>
    </div>
  );
};

export default Logout;
