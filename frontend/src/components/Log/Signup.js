import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nameError = document.querySelector(".name.error");
  const emailError = document.querySelector(".email.error");
  const passwordError = document.querySelector(".password.error");

  const handelRegister = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/api/auth/signup",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          nameError.innerHTML = res.data.errors.lastName;
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((errors) => {
        throw new Error({ errors });
      });
  };
  return (
    <form action="" onSubmit={handelRegister}>
      <label htmlFor="prenom">Prénom</label>
      <br />
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
      />
      <br />
      <label htmlFor="nom">Nom</label>
      <br />
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
      />
      <br />
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
      <label htmlFor="password">password</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <input value="S'inscrire" type="submit" />
      <div className="name error"></div>
      <div className="email error"></div>
      <div className="password error"></div>
    </form>
  );
};

export default Signup;
