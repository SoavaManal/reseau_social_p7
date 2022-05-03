import axios from "axios";
import React, { useEffect, useState } from "react";

const Profil = () => {
  const getToken = localStorage.getItem("jwt");
  const token = "Bearer " + getToken;
  const [user, setUser] = useState();
  //   const url = new URLSearchParams(document.location.search);
  //   const id = url.get("id");
  //   console.log(url);
  //   console.log(id);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/auth/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>Profil</h1>
      {/* <ul>
        <li>
          <img src={user.image} />
        </li>
        <li>Prénom :{user.firstName}</li>
        <li>Nom :{user.lastName}</li>
        <li>Email :{user.email}</li>
        <li>Bio :{user.bio}</li>
      </ul> */}
    </div>
  );
};

export default Profil;
