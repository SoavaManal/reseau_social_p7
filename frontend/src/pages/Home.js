import React from "react";
import Log from "../components/Log";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <main className="home">
      <Logo />
      <Log signup={false} signin={true} />
    </main>
  );
};

export default Home;
