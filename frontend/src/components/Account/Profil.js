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
  const [file, setFile] = useState();

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
    axios({
      method: "PUT",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
      data: {
        image: file,
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
        <div className="profil">
          {file === null ? (
            ""
          ) : (
            <div>
              <img
                src={user.image ? user.image : "/images/anonyme.PNG"}
                alt="profil"
              />

              <br />
              <label for="file" class="label-file">
                Changer la photo de profil
              </label>

              <input
                id="file"
                class="input-file"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files)}
              />
              <br />
              <input
                type="submit"
                value="Modifier"
                onClick={() => updateProfil()}
              />
            </div>
          )}
          <div>
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <h3>{user.email}</h3>
          </div>
        </div>
        <ul className="profil">
          <li>
            <label for="prenom">Prénom :</label>

            <input
              defaultValue={user.firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </li>
          <li>
            <label for="nom">Nom :</label>
            <input
              defaultValue={user.lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </li>
          <li>
            <label for="email">Email :</label>
            <input
              defaultValue={user.email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label for="bio">Bio :</label>
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
