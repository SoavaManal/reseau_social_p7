import axios from "axios";
import React, { useEffect, useState } from "react";

const UserCard = ({ user }) => {
  const getToken = localStorage.getItem("jwt");
  const token = "Bearer " + getToken;
  const [admin, setAdmin] = useState();
  const isAdmin = () => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
      data: {
        setAdmin,
      },
    })
      .then((res) => {
        setAdmin(res.data.isAdmin);
      })
      .catch((error) => console.log(error));
  };
  const deleteAccont = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:3000/api/auth/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => console.log("compte supprimer"))
      .catch((error) => console.log(error));
  };

  const handelsDelete = () => {
    if (window.confirm("Voulez-vous supprimer ce compte ?")) {
      deleteAccont(user.id);
    }
  };

  useEffect(() => {
    isAdmin();
    // eslint-disable-next-line
  }, []);
  return (
    <ul className="card">
      <li>
        <img
          src={user.image ? user.image : "/images/anonyme.png"}
          alt="profil"
        />
      </li>
      <div className="infos">
        <li>
          {user.firstName} {user.lastName}
        </li>
        <li>{user.email}</li>
        {user.bio ? <li>{user.bio}</li> : ""}
        {admin ? (
          <button onClick={() => handelsDelete()}>Supprimer ce compte</button>
        ) : (
          ""
        )}
      </div>
    </ul>
  );
};

export default UserCard;
