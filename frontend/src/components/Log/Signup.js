import axios from "axios";
import React, { useState } from "react";
import Signin from "./Signin";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = document.querySelector(".error");
  const [submitFrom, setSubmitForm] = useState(false);

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
        {
          console.log(res.data);
          setSubmitForm(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          if (error.response.data) {
            errorMessage.innerHTML = error.response.data.errors;
          }
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  return (
    <>
      {submitFrom ? (
        <>
          <Signin />
          <h4 className="success">
            Bienvenue parmi nous, Veuillez vous connecter
          </h4>
        </>
      ) : (
        <>
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

            <div className="error"></div>
          </form>
        </>
      )}
    </>
  );
};

export default Signup;
