import { useNavigate } from "react-router-dom";
import './MainApp.css';
import back from './img/back.png';


function BackButton() {
    let navigate = useNavigate();
    return (
        <img src={back} className="backButton" onClick={() => navigate(-1)} />
    )
}

export default BackButton;