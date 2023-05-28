import "./AuthorDesc.css";
function AuthorDesc(props) {

  return (
    <div className="authorDesc">
      <a href={"/author/" + props.id }>
      <img
        className="authorDescImg"
        src={"" + props.photo}
      />
      <p>{props.name}</p>
      </a>
      <p className="descText">{props.description}</p>
    </div>
  );
}

export default AuthorDesc;
