import axios from "axios";
import React, { useEffect, useState } from "react";
import Logout from "../components/Log/Logout";

const NavigationBarre = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [user, setUser] = useState();
  const getProfil = () => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
      data: {
        setUser,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProfil();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {user != null ? (
        <div className="navigation account">
          <img
            alt="logo groupomania"
            src="/images/logo2.png"
            className="logo-acceuil"
          />
          <div className="navigation">
            <h3>Bienvenue {user && user.firstName}</h3>
          </div>
          <Logout />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavigationBarre;
