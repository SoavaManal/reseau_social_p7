import CreatePost from "./Posts/CreatePost";
import ReadPost from "./Posts/ReadPost";

const Acceuil = () => {
  return (
    <div className="right-container">
      <CreatePost />
      <ReadPost />
    </div>
  );
};

export default Acceuil;
