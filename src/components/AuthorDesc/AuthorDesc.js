import "./AuthorDesc.css";
function AuthorDesc(props) {

  function linkOrNot(id) {
    if (id) {
      return (
        <div className="authorDesc">
          <a href={"/author/" + props.id }>
          <img
            className="authorDescImg"
            src={"" + props.photo}
            alt={props.name}
          /></a>
          <p><a href={"/author/" + props.id }>{props.name}</a></p>
          <p className="descText">{props.description}</p>
        </div>
      )
    } else {
      return (
        <div className="authorDesc">
          <img
            className="authorDescImg"
            src={"" + props.photo}
            alt={props.name}
          />
          <p>{props.name}</p>
          <p className="descText">{props.description}</p>
        </div>
      )
    }
  }

  return (
    linkOrNot(props.id)
  );
}

export default AuthorDesc;
