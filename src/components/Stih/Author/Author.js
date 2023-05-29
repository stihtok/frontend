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
        </NavLink>
        <p><NavLink to={"/author/" + props.id}>{props.author}</NavLink></p>
    </div>
  );
}

export default Author;
