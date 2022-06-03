import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const getToken = localStorage.getItem("jwt");
  const token = "Bearer " + getToken;
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState();

  const getUsers = () => {
    return axios({
      method: "GET",
      url: "http://localhost:3000/api/auth/",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
    if (window.confirm("Voulez-vous supprimer ce compte ?")) {
      axios({
        method: "delete",
        url: `http://localhost:3000/api/auth/${id}`,
        headers: {
          Authorization: token,
        },
      })
        .then(() => {
          console.log("compte supprimer");
          getUsers();
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getUsers();
    isAdmin();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="right-container">
        <h1>COMMUNAUTEE</h1>
        <div className="flex-wrap">
          {users
            ? users.map((user) => (
                <ul className="card" key={user.id}>
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
                      <li>
                        <button onClick={() => deleteAccont(user.id)}>
                          Supprimer ce compte
                        </button>
                      </li>
                    ) : (
                      ""
                    )}
                  </div>
                </ul>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};
export default Users;
