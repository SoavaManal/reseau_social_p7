import CreatePost from "./Posts/CreatePost";
import ReadPost from "./Posts/ReadPost";

const Acceuil = () => {
  return (
    <div className="right-container">
      <CreatePost />
      <h2>voir les posts publier</h2>
      <ReadPost />
    </div>
  );
};

export default Acceuil;
