import './Navigation.css';
import Search from './Search';


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
            <a href="/"><li>Главная</li></a>
            <a href="/authors"><li>Авторы</li></a>

            </ul>
        </div>
        </nav>
    )
}

export default Navigation;