import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Account from "../../pages/Account";
import Home from "../../pages/Home";
import Error from "../../pages/Error";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="/account/me" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
