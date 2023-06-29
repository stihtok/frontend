import "./AuthorStihList.css";
import { NavLink } from "react-router-dom";

function AuthorStihTitle(props) {
  return (
    <div className="authorStihTitle">
      <h2><NavLink to={"/stih/"+props.id}>{props.title}</NavLink></h2>
    </div>
  );
}

export default AuthorStihTitle;
