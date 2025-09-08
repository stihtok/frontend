import "./YearStihList.css";
function Year(props) {
  const prevYear = parseInt(props.year) - 1;
  const nextYear = parseInt(props.year) + 1;

  return (
    <div className="year">
      <p><a href={"/year/" + prevYear} className="anotherYears">{"<"}</a>{props.year}<a href={"/year/" + nextYear} className="anotherYears">{">"}</a></p>
    </div>
  );
}

export default Year;
