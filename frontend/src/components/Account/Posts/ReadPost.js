import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./Comment";
import {
  faDeleteLeft,
  faMessage,
  faPen,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const ReadPost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [updateContent, setUpdateContent] = useState("");
  const [imagePut, setImagePut] = useState();
  const [post, setPost] = useState([]);
  const [put, setPut] = useState([]);
  const [showComment, setShowComment] = useState(false);
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
      })
      .catch((error) => console.log(error));
  };
  const updatePost = (id) => {
    axios({
      method: "put",
      url: `http://localhost:3000/api/posts/${id}`,
      headers: {
        Authorization: token,
      },
      data: {
        content: updateContent,
        image: imagePut,
      },
    })
      .then((res) => {
        setPut(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:3000/api/posts/${id}`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => console.log("post supprimé"))
      .catch((error) => console.log(error));
  };
  const likePost = (id) => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/posts/${id}/likes`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => console.log("liké"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    allPosts();
  }, []);
  return (
    <div>
      {post == null
        ? "loading"
        : post.map((post) => (
            <div className="card-post" key={post.id}>
              <div className="post-profil">
                <img
                  src={
                    post.user.image ? post.user.image : "/images/anonyme.png"
                  }
                  alt="profil"
                  className="post-profil-img"
                />
                <h3>
                  {post.user.firstName} {post.user.lastName}
                </h3>
              </div>
              {put === null ? (
                ""
              ) : (
                <div className="updatePost">
                  <button onClick={() => updatePost(post.id)} id="modify">
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </button>
                </div>
              )}
              <div className="deletePost">
                <button onClick={() => deletePost(post.id)}>
                  <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon>
                  Supprimer
                </button>
              </div>
              <input
                type="text"
                defaultValue={post.content}
                id="post"
                onChange={
                  updateContent != null
                    ? (e) => setUpdateContent(e.target.value)
                    : ""
                }
              />
              {post.image_url ? (
                <img src={post.image_url} className="post-img" alt="post" />
              ) : (
                ""
              )}
              {post.image_url ? (
                <input type="file" name="file" onChange={() => setImagePut()} />
              ) : (
                ""
              )}
              <ul>
                <li className="post-barre" onClick={() => likePost(post.id)}>
                  <p>{post.likes === 0 ? "" : post.likes}</p>
                  <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                </li>
                <li
                  className="post-barre"
                  id="readComment"
                  onClick={() => setShowComment(!showComment)}
                >
                  <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                </li>
              </ul>
              {showComment && <Comment post={post} />}
            </div>
          ))}
    </div>
  );
};

export default ReadPost;
