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
    if (e.target.id == "acceuil") {
      setAcceuil(true);
      setProfil(false);
      setUsers(false);
    } else if (e.target.id == "profil") {
      setAcceuil(false);
      setProfil(true);
      setUsers(false);
    } else if (e.target.id == "users") {
      setAcceuil(false);
      setProfil(false);
      setUsers(true);
    }
  };
  return (
    <div className="account">
      <NavigationBarre />
      <ul className="account-icons">
        <li
          onClick={handelModals}
          className={acceuil ? "navigation-active" : ""}
          id="acceuil"
        >
          <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
        </li>
        <li
          onClick={handelModals}
          className={profil ? "navigation-active" : ""}
          id="profil"
        >
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </li>
        <li
          onClick={handelModals}
          className={users ? "navigation-active" : ""}
          id="users"
        >
          <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
        </li>
      </ul>
      {acceuil && <Acceuil />}
      {profil && <Profil />}
      {users && <Users />}
    </div>
  );
};

export default Navigation;
