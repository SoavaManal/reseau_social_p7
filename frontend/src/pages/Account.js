import React from "react";
import Navigation from "../components/Account";

const Account = () => {
  return (
    <>
      <Navigation acceuil={true} profil={false} users={false} />
    </>
  );
};

export default Account;
