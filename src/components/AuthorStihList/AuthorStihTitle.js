import "./AuthorStihList.css";

function AuthorStihTitle(props) {
  return (
    <div className="authorStihTitle">
      <h2><a href="#" onClick={(e) => { e.preventDefault(); props.onClick(); }} className={props.isExpanded ? 'expanded' : ''}>{props.title}</a></h2>
    </div>
  );
}

export default AuthorStihTitle;
