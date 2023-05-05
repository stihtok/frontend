import "./Author.css";
import { NavLink } from "react-router-dom";

function Author(props) {
  return (
    <div className="author">
      <NavLink to={"/author/" + props.id}>
        <img
          className="authorImg"
          src={"" + props.authorImg}
        />
        <p>{props.author}</p>
      </NavLink>
    </div>
  );
}

export default Author;
