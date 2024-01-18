import { useNavigate } from "react-router-dom";
import './BackButton.css';
import back from '../img/back.png';


function BackButton() {
    let navigate = useNavigate();
    return (
        <div className="backArea" onClick={() => navigate(-1, { replace: true })}>
            <img src={back} className="backButton" />
        </div>
    )
}

export default BackButton;