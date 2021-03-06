import React, { useState } from "react";
import NavigationBarre from "../NavigationBarre";
import Acceuil from "./Acceuil";
import Profil from "./Profil";
import Users from "./Users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  const [acceuil, setAcceuil] = useState(props.acceuil);
  const [profil, setProfil] = useState(props.profil);
  const [users, setUsers] = useState(props.users);

  const handelModals = (e) => {
    if (e.target.id === "acceuil") {
      setAcceuil(true);
      setProfil(false);
      setUsers(false);
    } else if (e.target.id === "profil") {
      setAcceuil(false);
      setProfil(true);
      setUsers(false);
    } else if (e.target.id === "users") {
      setAcceuil(false);
      setProfil(false);
      setUsers(true);
    }
  };
  return (
    <>
      <NavigationBarre />
      <div className="account">
        <div className="account-icons" id="acceuil" onClick={handelModals}>
          <FontAwesomeIcon
            icon={faHouse}
            className={acceuil ? "navigation-active" : ""}
          ></FontAwesomeIcon>
        </div>
        <div className="account-icons" id="profil" onClick={handelModals}>
          <FontAwesomeIcon
            icon={faUser}
            className={profil ? "navigation-active" : ""}
          ></FontAwesomeIcon>
        </div>
        <div className="account-icons" id="users" onClick={handelModals}>
          <FontAwesomeIcon
            icon={faUserGroup}
            className={users ? "navigation-active" : ""}
          ></FontAwesomeIcon>
        </div>
      </div>
      {acceuil && <Acceuil />}
      {profil && <Profil />}
      {users && <Users />}
    </>
  );
};

export default Navigation;
