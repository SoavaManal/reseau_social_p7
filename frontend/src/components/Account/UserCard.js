import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <li>
        <img
          src={user.image ? user.image : "/images/anonyme.png"}
          alt="profil"
        />
      </li>
      <div className="infos">
        <li>Prénom :{user.firstName}</li>
        <li>Nom :{user.lastName}</li>
        <li>Email :{user.email}</li>
        {user.bio ? <li>Bio :{user.bio}</li> : ""}
      </div>
    </div>
  );
};

export default UserCard;
