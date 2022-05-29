import axios from "axios";
import React, { useEffect, useState } from "react";

const Profil = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [user, setUser] = useState();
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
    let formData = new FormData();
    formData.append("image", image);
    formData.append("bio", bio);
    axios({
      method: "PUT",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
      data: formData,
    })
      .then((res) => {
        setUser(res.data);
        getProfil();
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
  const HandelDelete = () => {
    if (
      window.confirm(
        "Voulez-vous bien supprimer votre compte chez Groupomania?"
      )
    ) {
      deleteUser();
    }
  };

  useEffect(() => {
    getProfil();
    // eslint-disable-next-line
  }, []);

  return user == null ? (
    "loading"
  ) : (
    <>
      <div id="profil" className="right-container profil-container">
        <div className="profil">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <h2>{user.email}</h2>
          <button onClick={() => HandelDelete()}>Supprimer mon compte</button>
        </div>
        <div className="update-container">
          <div className="left-part">
            <div>
              <img
                src={user.image ? user.image : "/images/anonyme.PNG"}
                alt="profil"
              />

              <br />
              <label htmlFor="file" className="label-file">
                Changer la photo de profil
              </label>

              <input
                id="file"
                className="input-file"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <br />
              {image == null ? (
                ""
              ) : (
                <input
                  type="submit"
                  value="Modifier"
                  onClick={() => {
                    updateProfil();
                  }}
                />
              )}
            </div>
          </div>
          <div className="right-part">
            <label htmlFor="bio">Bio :</label>
            <textarea
              placeholder={user.bio ? user.bio : "Présentez-vous!"}
              type="text"
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
            <br />
            <button onClick={() => updateProfil()}>Modifier</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profil;
