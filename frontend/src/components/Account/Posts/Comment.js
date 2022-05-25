import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPaperPlane,
  faPen,
  faImage,
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
            console.log("commentaire modifié", update);
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
            console.log("commentaire modifié");
            readComment();
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
            console.log("commentaire modifié");
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
  }, []);

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
              <input
                type="text"
                placeholder="Ajouter un commentaire..."
                onChange={(e) => setContent(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="comment-icons"
                onClick={() => {
                  console.log(sendComment);
                  createComment(post.id);
                }}
              ></FontAwesomeIcon>
            </>
          ) : (
            ""
          )}
        </div>
        <div>
          <label htmlFor="file" className="label-file">
            <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>
      <div className="comment" key={comment.id}>
        {comment
          ? comment.map((comment) => (
              <>
                {post && post.id === comment.postId ? (
                  <>
                    <div className="flex">
                      <img
                        src={comment.user.image}
                        alt="profil-pic"
                        className="profil-pic"
                      />
                      <h4>{comment.user.firstName}</h4>
                      {user && user.id === comment.userId ? (
                        <input type="text" defaultValue={comment.content} />
                      ) : (
                        <p>{comment.content}</p>
                      )}
                      <p className="date">{comment.createdAt.split("T")[0]}</p>
                    </div>
                    <img
                      src={comment.image_url ? comment.image_url : ""}
                      alt={comment.image_url ? "commentaire-pic" : ""}
                    />
                  </>
                ) : (
                  ""
                )}
              </>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Comment;
