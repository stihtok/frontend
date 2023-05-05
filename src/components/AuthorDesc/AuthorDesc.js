import "./AuthorDesc.css";
function AuthorDesc(props) {

  return (
    <div className="authorDesc">
      <img
        className="authorDescImg"
        src={"" + props.photo}
      />
      <p>{props.name}</p>
    </div>
  );
}

export default AuthorDesc;
