import './Navigation.css';
import Filter from './Filter';


function Navigation(props) {
    return (
        <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" autoComplete='off'/>
            
            <span></span>
            <span></span>
            <span></span>
            
            <ul id="menu">
            <li style={{marginBottom: "40px"}}><Filter /></li>
            <a href="/"><li>Главная</li></a>
            <a href="/authors"><li>Авторы</li></a>

            </ul>
        </div>
        </nav>
    )
}

export default Navigation;