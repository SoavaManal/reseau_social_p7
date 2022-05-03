import React from "react";
import Navigation from "../components/Account";
import NavigationBarre from "../components/NavigationBarre";

const Account = () => {
  return (
    <>
      <Navigation acceuil={true} profil={false} users={false} />
    </>
  );
};

export default Account;
