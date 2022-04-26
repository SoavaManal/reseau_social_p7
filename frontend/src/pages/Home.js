import React from "react";
import Log from "../components/Log";
import Logo from "../components/Logo";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-container-image">
        {/* <img
          alt="une photo exprime la solidarité entre collégue"
          src="./image/solidarite.jpg"
          className="home-container-image"
        /> */}
      </div>
      <div>
        <Logo />
        <Log signup={false} signin={true} />
      </div>
    </div>
  );
};

export default Home;
