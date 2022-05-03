import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const getToken = localStorage.getItem("jwt");
  const token = "Bearer " + getToken;
  const [user, setUser] = useState([]);
  //evite de rappeller axios a l'infinit
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/api/auth/",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1>COMMUNAUTEE</h1>
      <div>
        {user.map((user) => (
          <ul>
            <li>{user.firstName}</li>
            <li>{user.lastName}</li>
            <li>
              <img src={user.image} />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Users;
