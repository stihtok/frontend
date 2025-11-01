import "../AuthorStihList/AuthorStihList.css";

function YearStihTitle(props) {
  return (
    <div className="authorStihTitle">
      <h2><a href={"/stih/"+props.id}>{props.title}</a></h2>
    </div>
  );
}

export default YearStihTitle;
