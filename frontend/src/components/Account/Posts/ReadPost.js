import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faEllipsis,
  faFileImage,
  faMessage,
  faPaperPlane,
  faPen,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const ReadPost = () => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [updateContent, setUpdateContent] = useState("");
  const [imagePut, setImagePut] = useState();
  const [post, setPost] = useState([]);
  const [put, setPut] = useState([]);
  const modifybtn = document.querySelector("#modify");
  const [content, setContent] = useState("");
  const [imgComment, setImgComment] = useState();
  const [sendComment, setSendComment] = useState(false);
  const [comment, setComment] = useState([]);
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
        // if (error.response.status !== 401) {
        //   modifybtn.innerHTML = `
        //   <button onClick={() => updatePost(post.id)} id="modify">
        //   <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
        //   </button>`;
        // }
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
    });
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

  const createComment = (id) => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/posts/${id}/comment`,
      headers: {
        Authorization: token,
      },
      data: {
        content: content,
        image: imgComment,
      },
    })
      .then((res) => setSendComment(res.data))
      .catch((error) => console.log(error));
  };

  const readComment = (id) => {
    axios({
      method: "get",
      url: `http://localhost:3000/api/posts/${id}/comment`,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setComment(res.data);
        console.log(res.data);
      })
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
            <div className="post" key={post.id}>
              <div className="post-profil">
                <img
                  src={
                    post.user.image ? post.user.image : "./image/anonyme.png"
                  }
                  alt="photo profil"
                  className="post-profil-img"
                />
                <h3>
                  {post.user.firstName} {post.user.lastName}
                </h3>
              </div>
              <div className="updatePost">
                <button onClick={() => updatePost(post.id)} id="modify">
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </button>
              </div>

              {/* <div className="deletePost">
                    <button onSubmit={deletePost(post.id)}>
                      <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon>
                      Supprimer
                    </button>
                  </div> */}
              <textarea
                defaultValue={post.content}
                id="post"
                onChange={
                  updateContent != null
                    ? (e) => setUpdateContent(e.target.value)
                    : ""
                }
              ></textarea>

              <img
                src={post.image_url ? post.image_url : ""}
                className="post-img"
              />
              {post.image_url ? (
                <input type="file" name="file" onChange={() => setImagePut()} />
              ) : (
                ""
              )}
              <ul>
                <li className="post-barre" onClick={() => likePost(post.id)}>
                  <p>{post.likes == 0 ? "" : post.likes}</p>
                  <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                </li>
                <li
                  className="post-barre"
                  id="readComment"
                  onClick={() => readComment(post.id)}
                >
                  <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                </li>
              </ul>
              <div className="comment">
                <ul>
                  <li>
                    <textarea
                      defaultValue="commenter..."
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <FontAwesomeIcon
                      icon={faFileImage}
                      className="comment-icons"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="comment-icons"
                      onClick={() => createComment(post.id)}
                    ></FontAwesomeIcon>
                  </li>
                  {comment == null
                    ? ""
                    : comment.map((comment) => (
                        <li key={comment.id}>
                          <textarea defaultValue={setContent()}></textarea>
                          <img src={setImgComment ? setImgComment() : ""} />
                          <FontAwesomeIcon
                            icon={faEllipsis}
                            className="comment-icons"
                          ></FontAwesomeIcon>
                          <FontAwesomeIcon
                            icon={faFileImage}
                            className="comment-icons"
                          ></FontAwesomeIcon>
                          <FontAwesomeIcon
                            icon={faPen}
                            className="comment-icons"
                          ></FontAwesomeIcon>
                          <FontAwesomeIcon
                            icon={faDeleteLeft}
                            className="comment-icons"
                          ></FontAwesomeIcon>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ReadPost;
