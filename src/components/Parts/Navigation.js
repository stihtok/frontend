import { useState, useEffect, useRef } from 'react';
import './Navigation.css';
import Search from './Search';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from "react-router-dom";

function Navigation(props) {
    let [menu, setMenu] = useState(false);
    let navigate = useNavigate();
    let location = useLocation();
    let overlayRef = useRef(null);

    function openClose() {
        setMenu(current => !current);
    }

    async function navClick(url) {
        setMenu(current => !current);
        await new Promise(r => setTimeout(r, 250));
        navigate(url);
    }

   useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    if (menu && overlayRef.current) {
      // Добавляем класс "active" с небольшой задержкой, чтобы transition сработал
      requestAnimationFrame(() => {
        if (overlayRef.current) {
          overlayRef.current.classList.add('active');
        }
      });
    } else if (overlayRef.current) {
      overlayRef.current.classList.remove('active');
    }
  }, [menu]);

    return (
        <nav role="navigation">
        <div id="menuToggle">
            <input checked={menu} type="checkbox" autoComplete='off' onChange={e => openClose()}/>
            <div ref={overlayRef} className="menuOverlay" onClick={() => setMenu(false)}></div>

            <span></span>
            <span></span>
            <span></span>
            

            <ul id="menu">
            <li style={{marginBottom: "40px"}}><Search /></li>
            <NavLink onClick={e => navClick("/")}><li>Главная</li></NavLink>
            <NavLink onClick={e => navClick("/authors")}><li>Авторы</li></NavLink>
            <NavLink onClick={e => navClick("/favorites")}><li>Уголки</li></NavLink>
            <NavLink onClick={e => navClick("/vibes#start")}><li>Настроения</li></NavLink>
            <hr className='navHr'/>
            <a className='installLink' href="/install"><li>Приложение</li></a>

            </ul>
        </div>

        </nav>
    )
}

export default Navigation;