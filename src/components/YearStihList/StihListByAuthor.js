import "./YearStihList.css";
import Author from "../Stih/Author/Author";
import YearStihTitle from "./YearStihTitle";

function StihListByAuthor(props) {
  return (
    <div>
      <div className="yearAuthor">
          <Author
            author={props.authorName}
            id={props.authorId}
            authorImg={props.authorImg}
          />
      </div>
      <div>
      {props.stihs.map((stih) => {
        return (
          <YearStihTitle id={stih.id} title={stih.title} />
        )
      })
    }
      </div>
    </div>
  );
}

export default StihListByAuthor;
