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
        <h2><NavLink to={"/author/" + props.id}>{props.author}</NavLink></h2>
    </div>
  );
}

export default Author;
