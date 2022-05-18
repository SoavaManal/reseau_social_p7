import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPaperPlane,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const Comment = ({ post }) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [sendComment, setSendComment] = useState();
  const [contentUp, setContenteUp] = useState("");
  const [imageUp, setImageUp] = useState();
  const [update, setUpdate] = useState();
  const [user, setUser] = useState();

  const createComment = (id) => {
    axios({
      method: "post",
      url: `http://localhost:3000/api/posts/${id}/comment`,
      headers: {
        Authorization: token,
      },
      data: {
        content: content,
        image: image,
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
      })
      .catch((error) => console.log(error));
  };

  const updateComment = (postId, commentId) => {
    axios({
      method: "put",
      url: `http://localhost:3000/api/posts/${postId}/comment/${commentId}`,
      headers: {
        Authorization: token,
      },
      data: {
        content: contentUp,
        image: imageUp,
      },
    })
      .then((res) => {
        setUpdate(res.data);
        console.log("commentaire modifié", res.data);
      })
      .catch((error) => console.log(error));
  };

  const deleteComment = (postId, commentId) => {
    axios({
      method: "delete",
      url: `http://localhost:3000/api/posts/${postId}/comment/${commentId}`,
      headers: {
        Authorization: token,
      },
    })
      .then(() => console.log("commentaire supprimer"))
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
        //console.log("le user qui comment", res.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProfil();
    readComment(post.id);
  });

  return (
    <div>
      <div className="comment-owner">
        <div className="flex">
          <h4>
            {post.user.firstName} {post.user.lastName}
          </h4>
          <input
            type="text"
            defaultValue="Ajouter un commentaire..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <input type="file" onChange={(e) => setImage(e.target.value)} />
        {sendComment === null ? (
          ""
        ) : (
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="comment-icons"
            onClick={() => createComment(post.id)}
          ></FontAwesomeIcon>
        )}
      </div>
      {comment == null
        ? ""
        : comment.map((comment) => (
            <div
              key={comment.id}
              className={
                comment.userId === post.userId ? "comment-owner" : "comment"
              }
            >
              <div className="flex">
                <h4>
                  {comment.user.firstName} {comment.user.lastName}
                </h4>
                <input
                  type="text"
                  defaultValue={comment.content}
                  onChange={(e) => setContenteUp(e.target.value)}
                />
                <p>{comment.createdAt.split("T")[0]}</p>
              </div>
              {comment.image_url ? (
                <img src={comment.image_url} alt="commentaire" />
              ) : (
                ""
              )}
              {update === null ? (
                ""
              ) : (
                <button onClick={() => updateComment(post.id, comment.id)}>
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </button>
              )}

              <button onClick={() => deleteComment(post.id, comment.id)}>
                <FontAwesomeIcon icon={faDeleteLeft}></FontAwesomeIcon>
              </button>
            </div>
          ))}
    </div>
  );
};

export default Comment;
