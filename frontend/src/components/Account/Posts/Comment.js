import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPaperPlane,
  faPen,
  faFileImage,
} from "@fortawesome/free-solid-svg-icons";

const Comment = ({ post }) => {
  const token = "Bearer " + localStorage.getItem("jwt");
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [sendComment, setSendComment] = useState(false);
  const [contentUp, setContenteUp] = useState("");
  const [imageUp, setImageUp] = useState();
  const [update, setUpdate] = useState();
  const [user, setUser] = useState();

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

  const createComment = (id) => {
    if (content || image) {
      let formData = new FormData();
      formData.append("content", content);
      formData.append("image", image);
      axios({
        method: "post",
        url: `http://localhost:3000/api/posts/${id}/comment`,
        headers: {
          Authorization: token,
        },
        data: formData,
      })
        .then(() => {
          setSendComment(true);
          readComment();
          setContent("");
          console.log(sendComment);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Entrer un commentaire!");
    }
  };

  const updateComment = (postId, commentId) => {
    if (contentUp || imageUp) {
      if (contentUp) {
        let formData = new FormData();
        formData.append("content", contentUp);
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${postId}/comment/${commentId}`,
          headers: {
            Authorization: token,
          },
          data: formData,
        })
          .then((res) => {
            setUpdate(res.data);
            readComment();
          })
          .catch((error) => console.log(error));
      }
      if (imageUp) {
        let formData = new FormData();
        formData.append("image", imageUp);
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${postId}/comment/${commentId}`,
          headers: {
            Authorization: token,
          },
          data: formData,
        })
          .then((res) => {
            setUpdate(res.data);
            readComment();
            console.log(update);
          })
          .catch((error) => console.log(error));
      }
      if (contentUp && imageUp) {
        let formData = new FormData();
        formData.append("content", contentUp);
        formData.append("image", imageUp);
        axios({
          method: "put",
          url: `http://localhost:3000/api/posts/${postId}/comment/${commentId}`,
          headers: {
            Authorization: token,
          },
          data: formData,
        })
          .then((res) => {
            setUpdate(res.data);
            readComment();
          })
          .catch((error) => console.log(error));
      }
    } else {
      alert("Aucun modification apporter!");
    }
  };

  const deleteComment = (postId, commentId) => {
    if (window.confirm("voulez vous supprimer votre commentaire?")) {
      axios({
        method: "delete",
        url: `http://localhost:3000/api/posts/${postId}/comment/${commentId}`,
        headers: {
          Authorization: token,
        },
      })
        .then(() => {
          console.log("commentaire supprimer");
          readComment();
        })
        .catch((error) => console.log(error));
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
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getProfil();
    readComment(post.id);
    // eslint-disable-next-line
  }, [post.id]);

  return (
    <div>
      <div className="comment">
        <div className="flex">
          {user ? (
            <>
              <div className="flex">
                <img src={user.image} alt="profil-pic" className="profil-pic" />
                <h4>{user.firstName}</h4>
              </div>
              <textarea
                className="comment-txt"
                placeholder="Ajouter un commentaire..."
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div>
                <label htmlFor="file" className="label-file">
                  <FontAwesomeIcon icon={faFileImage}></FontAwesomeIcon>
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="comment-icons"
                onClick={() => {
                  createComment(post.id);
                }}
              ></FontAwesomeIcon>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="comment">
        {comment
          ? comment.map((comment) => (
              <div key={comment.id}>
                {post && post.id === comment.postId ? (
                  <>
                    <div className="flex">
                      <div className="flex">
                        <img
                          src={comment.user.image}
                          alt="profil-pic"
                          className="profil-pic"
                        />
                        <h4>{comment.user.firstName}</h4>
                      </div>
                      <div className="flex">
                        {user && user.id === comment.userId ? (
                          <button
                            onClick={() => updateComment(post.id, comment.id)}
                          >
                            <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                          </button>
                        ) : (
                          ""
                        )}
                        {(user && user.id === comment.userId) ||
                        (user && user.isAdmin === true) ? (
                          <button
                            onClick={() => deleteComment(post.id, comment.id)}
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                            ></FontAwesomeIcon>
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      {user && user.id === comment.userId ? (
                        <>
                          <input
                            type="text"
                            defaultValue={comment.content}
                            onChange={(e) => setContenteUp(e.target.value)}
                          />
                          <label htmlFor="file" className="label-file">
                            <FontAwesomeIcon
                              icon={faFileImage}
                            ></FontAwesomeIcon>
                          </label>
                          <input
                            type="file"
                            if="file"
                            onChange={(e) => setImageUp(e.target.files[0])}
                          />
                        </>
                      ) : (
                        <p>{comment.content}</p>
                      )}
                      <p className="date-comment">
                        {comment.createdAt.split("T")[0]}
                      </p>
                    </div>
                    {comment.image_url ? (
                      <img
                        src={comment.image_url}
                        alt="commentaire-pic"
                        className="comment-img"
                      />
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Comment;
