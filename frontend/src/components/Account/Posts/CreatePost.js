import axios from "axios";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [content, setContent] = useState("");
  const [imagePost, setImagePost] = useState();
  //const [post, setPost] = useState([]);
  const [submitPost, setSubmitPost] = useState(false);

  // const allPosts = () => {
  //   axios({
  //     method: "get",
  //     url: `http://localhost:3000/api/posts`,
  //     headers: {
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => {
  //       setPost(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const userPost = () => {
    if (content || imagePost) {
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
    } else {
      alert("Veuillez entrer un message");
    }
  };

  return (
    <div className="card-post">
      <textarea
        placeholder="Quoi de neuf ?"
        id="post"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <label htmlFor="file" className="label-file">
        <FontAwesomeIcon className="icons" icon={faFileImage}></FontAwesomeIcon>
      </label>
      <input
        type="file"
        name="file"
        id="file"
        title=" "
        onChange={(e) => setImagePost(e.target.files[0])}
      />

      <input
        type="submit"
        value="Publier"
        onClick={() => {
          userPost();
          //allPosts();
        }}
      />
    </div>
  );
};

export default CreatePost;
