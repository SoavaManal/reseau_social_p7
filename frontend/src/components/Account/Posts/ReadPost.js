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
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const ReadPost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [user, setUser] = useState();
  const [updateContent, setUpdateContent] = useState("");
  const [imagePut, setImagePut] = useState("");
  const [post, setPost] = useState([]);
  const [put, setPut] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [content, setContent] = useState("");
  const [imagePost, setImagePost] = useState();
  const [submitPost, setSubmitPost] = useState();

  //Get All Posts
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
  const handlePostContent = (e) => {
    setContent(e.target.value);
  };

  //create Post
  const createPost = () => {
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
          setContent("");
          setImagePost("");
        })
        .catch((error) => console.log(error));
    } else {
      alert("Veuillez entrer un message");
    }
  };

  //update post
  const updatePost = (id) => {
    if (updateContent || imagePut) {
      let formData = new FormData();
      if (updateContent) {
        formData.append("content", updateContent);
      }
      if (imagePut) {
        formData.append("image", imagePut);
      }
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
    } else {
      alert("Aucun modification apporter!");
    }
  };

  //get Profil user
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

  //delete post
  const deletePost = (postId) => {
    if (window.confirm("Voulez-vous supprimer ce Post?")) {
      axios({
        method: "delete",
        url: `http://localhost:3000/api/posts/${postId}`,
        headers: {
          Authorization: token,
        },
      })
        .then(() => {
          console.log("post Supprimé");
          allPosts();
        })
        .catch((error) => console.log(error));
    }
  };

  //like or dislike
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
      <div className="card-post">
        {user && post ? (
          <>
            <div className="flex">
              <img src={user.image} alt="user-pic" />
              <textarea
                placeholder="Quoi de neuf ?"
                id="post"
                onChange={handlePostContent}
                value={content}
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
                  createPost();
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
      {post === null
        ? "loading"
        : post.map((post) => (
            <li className="card-post" key={post.id}>
              <div className="flex">
                <div className="flex">
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
                <div>
                  <p className="date-post">{post.createdAt.split("T")[0]}</p>
                </div>
              </div>
              <div className="right">
                {user && user.id === post.userId ? (
                  <button onClick={() => updatePost(post.id)} id="modify">
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </button>
                ) : (
                  ""
                )}

                {user && (user.id === post.userId || user.isAdmin === true) ? (
                  <button onClick={() => deletePost(post.id)}>
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div>
                {user && user.id !== post.userId ? (
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
              </div>
              <div>
                {post.image_url ? (
                  <img src={post.image_url} id="post-img" alt="post" />
                ) : (
                  ""
                )}
              </div>
              <ul>
                <li
                  className="post-barre "
                  onClick={() => {
                    likePost(post.id);
                  }}
                >
                  <div className="flex">
                    <p>{post.likes === 0 ? "" : post.likes}</p>
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className={
                        post.userslikeds.find((like) => like.userId === user.id)
                          ? "like"
                          : "dislike"
                      }
                    ></FontAwesomeIcon>
                  </div>
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
            </li>
          ))}
    </div>
  );
};

export default ReadPost;
