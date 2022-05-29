import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comment from "./Comment";
import {
  faFileImage,
  faMessage,
  faPen,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

const ReadPost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [user, setUser] = useState();
  const [updateContent, setUpdateContent] = useState("");
  const [imagePut, setImagePut] = useState("");
  const [post, setPost] = useState([]);
  const [put, setPut] = useState(false);
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
    if (updateContent || imagePut) {
      if (updateContent) {
        let formData = new FormData();
        formData.append("content", updateContent);
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${id}`,
          headers: {
            Authorization: token,
          },
          data: formData,
        })
          .then((res) => {
            setPut(res.data);
            allPosts();
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (imagePut) {
        let formData = new FormData();
        formData.append("image", imagePut);
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${id}`,
          headers: {
            Authorization: token,
          },
          data: formData,
        })
          .then((res) => {
            setPut(res.data);
            allPosts();
            console.log(put);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (updateContent && imagePut) {
        let formData = new FormData();
        formData.append("content", updateContent);
        formData.append("image", imagePut);
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${id}`,
          headers: {
            Authorization: token,
          },
          data: formData,
        })
          .then((res) => {
            setPut(res.data);
            allPosts();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      alert("Aucun modification apporter!");
    }
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
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const deletePost = (id) => {
    if (window.confirm("Voulez-Vous supprimer le Post?")) {
      axios({
        method: "delete",
        url: `http://localhost:3000/api/posts/${id}`,
        headers: {
          Authorization: token,
        },
      })
        .then(() => {
          console.log("post supprimé");
          allPosts();
        })
        .catch((error) => console.log(error));
    }
  };
  const likePost = (id) => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/posts/${id}/likes`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        console.log("liké");
        allPosts();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfil();
    allPosts();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {post === null
        ? "loading"
        : post.map((post) => (
            <div className="card-post">
              <div className="flex-space">
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
                <div className="flex">
                  <div>
                    {user && user.id === post.userId ? (
                      <button onClick={() => updatePost(post.id)} id="modify">
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {(user && user.id === post.userId) ||
                    (user && user.isAdmin === true) ? (
                      <button onClick={() => deletePost(post.id)}>
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              {user.id !== post.userId ? (
                <p>{post.content}</p>
              ) : (
                <>
                  <textarea
                    defaultValue={post.content}
                    onChange={(e) => {
                      setUpdateContent(e.target.value);
                      console.log(e.target.value);
                    }}
                  ></textarea>
                  <label htmlFor="file" className="label-file">
                    <FontAwesomeIcon
                      className="icons"
                      icon={faFileImage}
                    ></FontAwesomeIcon>
                  </label>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    title=" "
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => setImagePut(e.target.files[0])}
                  />
                </>
              )}

              {post.image_url ? (
                <img src={post.image_url} id="post-img" alt="post" />
              ) : (
                ""
              )}

              <ul>
                <li
                  className="post-barre "
                  onClick={() => {
                    likePost(post.id);
                  }}
                >
                  <p>{post.likes === 0 ? "" : post.likes}</p>
                  <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                </li>
                <li
                  className="post-barre"
                  id="readComment"
                  onClick={() => setShowComment(!showComment)}
                >
                  <FontAwesomeIcon
                    icon={faMessage}
                    className={showComment ? "like" : "dislike"}
                  ></FontAwesomeIcon>
                </li>
              </ul>
              {showComment && <Comment post={post} key={post.id} />}
            </div>
          ))}
    </div>
  );
};

export default ReadPost;
