import "./YearStihList.css";
import { NavLink } from "react-router-dom";
import Author from "../Stih/Author/Author";
import AuthorStihTitle from "../AuthorStihList/AuthorStihTitle";

function StihListByAuthor(props) {
  return (
    <div>
      <div className="yearAuthor">
        <NavLink to={"/author/" + props.authorId}>
          <Author
            author={props.authorName}
            id={props.authorId}
            authorImg={props.authorImg}
          />
        </NavLink>
      </div>
      <div>
      {props.stihs.map((stih) => {
        return (
          <AuthorStihTitle id={stih.id} title={stih.title} />
        )
      })
    }
      </div>
    </div>
  );
}

export default StihListByAuthor;
