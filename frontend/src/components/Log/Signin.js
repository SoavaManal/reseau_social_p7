import React from "react";
import { useState } from "react";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");

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
        console.log(res.data);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((error) => console.log(error));
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
      <div className=".email.error"></div>
      <div className=".password.error"></div>
    </form>
  );
};

export default Signin;
