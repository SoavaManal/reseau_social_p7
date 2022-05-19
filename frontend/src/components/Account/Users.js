import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Users = () => {
  const getToken = localStorage.getItem("jwt");
  const token = "Bearer " + getToken;
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="right-container">
      <h1>COMMUNAUTEE</h1>
      <div>
        <ul>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
