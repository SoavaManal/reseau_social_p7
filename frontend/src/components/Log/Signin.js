import React from "react";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorsMessage = document.querySelector(".error");

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/api/auth/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token);
        window.location = "/Account";
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          errorsMessage.innerHTML = error.response.data.errors;
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  return (
    <form action="" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input value="Se connecter" type="submit" />
      <br />
      <div className="error"></div>
    </form>
  );
};
export default Signin;
