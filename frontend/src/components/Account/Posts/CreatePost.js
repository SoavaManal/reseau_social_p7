import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [content, setContent] = useState("");
  const [imagePost, setImagePost] = useState();
  const [submitPost, setSubmitPost] = useState(false);

  const userPost = () => {
    let formData = new FormData();
    formData.append("content", content);
    formData.append("image", imagePost);
    axios({
      method: "post",
      url: `http://localhost:3000/api/posts/`,
      headers: {
        Authorization: token,
      },
      data: formData,
    })
      .then(() => {
        setSubmitPost(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="card-post">
      <textarea
        placeholder="Quoi de neuf ?"
        id="post"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <label htmlFor="file" className="label-file">
        <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
      </label>
      <input
        type="file"
        name="file"
        id="file"
        title=" "
        onChange={(e) => setImagePost(e.target.files[0])}
      />
      <br />
      {submitPost == null ? (
        "alert('!!')"
      ) : (
        <input type="submit" value="Publier" onClick={() => userPost()} />
      )}
    </div>
  );
};

export default CreatePost;
