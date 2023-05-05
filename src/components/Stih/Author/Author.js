import "./Author.css";
import { NavLink } from "react-router-dom";

function Author(props) {
  return (
    <div className="author">
      <NavLink to={"/author/" + props.id}>
        <img
          className="authorImg"
          src={"http://192.168.1.201:8000" + props.authorImg}
        />
        <p>{props.author}</p>
      </NavLink>
    </div>
  );
}

export default Author;
