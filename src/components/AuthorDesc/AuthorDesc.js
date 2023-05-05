import "./AuthorDesc.css";
function AuthorDesc(props) {

  return (
    <div className="authorDesc">
      <img
        className="authorDescImg"
        src={"http://192.168.1.201:8000" + props.photo}
      />
      <p>{props.name}</p>
    </div>
  );
}

export default AuthorDesc;
