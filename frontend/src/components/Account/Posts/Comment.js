// import axios from "axios";
// import React, { useState } from "react";
// import {
//   faEllipsis,
//   faFileImage,
//   faPaperPlane,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Comment = ({ post }) => {
//   const [content, setContent] = useState("");

//   return (
//     <div>
//       {post.comment.map((comment) => (
//         <ul>
//           <li>
//             <textarea
//               defaultValue="commenter..."
//               onChange={(e) => setContent(e.target.value)}
//             ></textarea>
//             <FontAwesomeIcon
//               icon={faFileImage}
//               className="comment-icons"
//             ></FontAwesomeIcon>
//             <FontAwesomeIcon
//               icon={faPaperPlane}
//               className="comment-icons"
//               //onClick={() => createComment(post.id)}
//             ></FontAwesomeIcon>
//           </li>
//                 <li key={comment.id}>
//                     <h4>{comment.user.firstName} {comment.user.lastName}</h4>
//                   <textarea defaultValue={comment.content}></textarea>
//                   <FontAwesomeIcon
//                     icon={faEllipsis}
//                     className="comment-icons"
//                   ></FontAwesomeIcon>
//                   <FontAwesomeIcon
//                     icon={faFileImage}
//                     className="comment-icons"
//                   ></FontAwesomeIcon>
//                   <FontAwesomeIcon
//                     icon={faPaperPlane}
//                     className="comment-icons"
//                     //onClick={() => createComment(post.id)}
//                   ></FontAwesomeIcon>
//                 </li>

//         </ul>
//       ))}
//     </div>
//   );
// };

// export default Comment;
