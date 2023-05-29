import "./AuthorStihList.css";
import { NavLink } from "react-router-dom";

function AuthorStihTitle(props) {
  return (
    <div className="authorStihTitle">
      <NavLink to={"/stih/"+props.id}>{props.title}</NavLink>
    </div>
  );
}

export default AuthorStihTitle;
