import './Navigation.css';
import Search from './Search';
import { NavLink } from 'react-router-dom';


function Navigation(props) {
    return (
        <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" autoComplete='off'/>
            
            <span></span>
            <span></span>
            <span></span>
            
            <ul id="menu">
            <li style={{marginBottom: "40px"}}><Search /></li>
            <NavLink to="/"><li>Главная</li></NavLink>
            <NavLink to="/authors"><li>Авторы</li></NavLink>
            <NavLink to="/favorites"><li>Уголки</li></NavLink>

            </ul>
        </div>
        </nav>
    )
}

export default Navigation;