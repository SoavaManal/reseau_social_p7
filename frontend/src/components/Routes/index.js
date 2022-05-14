import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "../../pages/Account";
import Home from "../../pages/Home";
import Acceuil from "../Account/Acceuil";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/account/me" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
