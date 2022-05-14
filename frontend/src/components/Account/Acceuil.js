import CreatePost from "./Posts/CreatePost";
import ReadPost from "./Posts/ReadPost";

const Acceuil = () => {
  return (
    <>
      <h1>Acceuil</h1>
      <h2>Publier un post</h2>
      <CreatePost />
      <h2>voir les posts publier</h2>
      <ReadPost />
    </>
  );
};

export default Acceuil;
