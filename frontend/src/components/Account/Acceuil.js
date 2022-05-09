import axios from "axios";
import React, { useState, useEffect } from "react";

const Acceuil = () => {
  const [content, setContent] = useState("");
  const [imagePost, setImagePost] = useState();
  const [submitPost, setSubmitPost] = useState(false);
  const token = "Bearer " + localStorage.getItem("jwt");
  console.log(token);

  const userPost = () => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/posts/`,
      headers: {
        Authorization: token,
      },
      data: {
        content: content,
        image: imagePost,
      },
    });
  };

  useEffect(() => {
    userPost();
  }, []);

  return (
    <div>
      <h1>Acceuil</h1>
      <div className="post">
        <textarea
          defaultValue="Quoi de neuf ?"
          id="post"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <label htmlFor="ajouter une image">Ajouter une image</label>
        <br />
        <input
          type="file"
          name="file"
          id="file"
          title=" "
          onChange={(e) => setImagePost(e.target.value)}
        />
        <br />
        <input type="submit" value="Publier" onClick={userPost} />
      </div>
    </div>
  );
};

export default Acceuil;
