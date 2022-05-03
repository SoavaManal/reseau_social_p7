import React from "react";
import Log from "../components/Log";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="home">
      <Logo />
      <Log signup={false} signin={true} />
    </div>
  );
};

export default Home;
