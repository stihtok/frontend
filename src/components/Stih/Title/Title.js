import './Title.css'
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';

function Title(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/stih/"+props.id);
  }

  return (
    <div className="title">
        <NavLink to={"/stih/"+props.id}>{props.title}</NavLink>
    </div>
  );
}

export default Title;
