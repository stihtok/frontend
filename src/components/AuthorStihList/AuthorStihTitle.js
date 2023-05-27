import "./AuthorStihList.css";
import { NavLink } from "react-router-dom";

function AuthorStihTitle(props) {
  return (
    <div className="authorStihTitle">
      <NavLink to={"/stih/"+props.id}><p>{props.title}</p></NavLink>
    </div>
  );
}

export default AuthorStihTitle;
