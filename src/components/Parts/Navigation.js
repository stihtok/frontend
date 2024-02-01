import { useState } from 'react';
import './Navigation.css';
import Search from './Search';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navigation(props) {
    let [menu, setMenu] = useState(false);
    let navigate = useNavigate();

    function openClose() {
        setMenu(current => !current);
    }

    async function navClick(url) {
        setMenu(current => !current);
        await new Promise(r => setTimeout(r, 250));
        navigate(url);
    }

    return (
        <nav role="navigation">
        <div id="menuToggle">
            <input checked={menu} type="checkbox" autoComplete='off' onChange={e => openClose()}/>
            
            <span></span>
            <span></span>
            <span></span>
            
            <ul id="menu">
            <li style={{marginBottom: "40px"}}><Search /></li>
            <NavLink onClick={e => navClick("/")}><li>Главная</li></NavLink>
            <NavLink onClick={e => navClick("/authors")}><li>Авторы</li></NavLink>
            <NavLink onClick={e => navClick("/favorites")}><li>Уголки</li></NavLink>
            <hr className='navHr'/>
            <a className='installLink' href="/install"><li>Приложение</li></a>

            </ul>
        </div>

        </nav>
    )
}

export default Navigation;