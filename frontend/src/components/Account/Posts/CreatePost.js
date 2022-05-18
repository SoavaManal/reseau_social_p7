import axios from "axios";
import React, { useState } from "react";

const CreatePost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [content, setContent] = useState("");
  const [imagePost, setImagePost] = useState();
  const [submitPost, setSubmitPost] = useState(false);

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
    })
      .then(() => {
        setSubmitPost(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card-post">
      <textarea
        defaultValue="Quoi de neuf ?"
        id="post"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <input
        type="file"
        name="file"
        id="file"
        title=" "
        onChange={(e) => setImagePost(e.target.value)}
      />
      <br />
      {submitPost == null ? (
        ""
      ) : (
        <input type="submit" value="Publier" onClick={userPost} />
      )}
    </div>
  );
};

export default CreatePost;
