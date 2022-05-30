import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CreatePost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [user, setUser] = useState();
  const [content, setContent] = useState("");
  const [imagePost, setImagePost] = useState();
  const [post, setPost] = useState([]);

  const [submitPost, setSubmitPost] = useState();

  const allPosts = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/api/posts`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getProfil = () => {
    axios({
      method: "GET",
      url: `http://localhost:3000/api/auth/me`,
      headers: {
        Authorization: token,
      },
      data: {
        setUser,
      },
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  const userPost = () => {
    if (content) {
      let formData = new FormData();
      formData.append("content", content);
      if (imagePost) {
        formData.append("image", imagePost);
      }
      axios({
        method: "post",
        url: `http://localhost:3000/api/posts/`,
        headers: {
          Authorization: token,
        },
        data: formData,
      })
        .then((res) => {
          setSubmitPost(res.data);
          allPosts();
        })
        .catch((error) => console.log(error));
    } else {
      alert("Veuillez entrer un message");
    }
  };

  // const cancelPost = () => {
  //   setContent("");
  //   setImagePost("");
  // };

  // const handelPost = async () => {
  //   userPost();
  //   allPosts();
  //   cancelPost();
  // };

  useEffect(() => {
    getProfil();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card-post">
      {user && post ? (
        <>
          <div className="flex">
            <img src={user.image} alt="user-pic" />
            <textarea
              placeholder="Quoi de neuf ?"
              id="post"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div>
              <label htmlFor="file" className="label-file">
                <FontAwesomeIcon
                  className="icons"
                  icon={faFileImage}
                ></FontAwesomeIcon>
              </label>
              <input
                type="file"
                name="file"
                id="file"
                title=" "
                onChange={(e) => setImagePost(e.target.files[0])}
              />
            </div>
            <button
              onClick={() => {
                userPost();
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CreatePost;
