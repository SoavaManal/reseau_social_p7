import axios from "axios";
import React, { useEffect, useState } from "react";

const Profil = () => {
  const getToken = localStorage.getItem("jwt");
  const token = "Bearer " + getToken;
  const [user, setUser] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState();

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
  const updateProfil = () => {
    //e.preventDefault();
    axios({
      method: "PUT",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
      data: {
        image: image,
        firstName: firstName,
        lastName: lastName,
        email: email,
        bio: bio,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };
  const deleteUser = () => {
    axios({
      method: "delete",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        window.location = "/";
        localStorage.removeItem("jwt");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProfil();
  }, []);

  return user == null ? (
    "loading"
  ) : (
    <>
      <div id="profil" className="right-container card-post">
        <div className="flex">
          <div>
            <img
              src={user.image ? user.image : "/images/anonyme.PNG"}
              alt="profil"
            />
            <br />
            <label htmlFor="changer photo de profil">
              Changer la photo de profil
            </label>
            <br />
            {image === null ? (
              ""
            ) : (
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setImage(e.target.files[0])}
              />
            )}
          </div>
          <div>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <h3>{user.email}</h3>
          </div>
        </div>
        <ul className="profil">
          <li>
            Prénom :
            <input
              defaultValue={user.firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </li>
          <li>
            Nom :
            <input
              defaultValue={user.lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </li>
          <li>
            Email :
            <input
              defaultValue={user.email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            Bio:
            <textarea
              defaultValue={user.bio ? user.bio : "Parlez-nous un peu de vous"}
              type="text"
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </li>
        </ul>
      </div>
      <button onClick={() => updateProfil()}>Modifier mon Profil</button>
      <button onClick={() => deleteUser()}>Supprimer mon compte</button>
    </>
  );
};

export default Profil;
