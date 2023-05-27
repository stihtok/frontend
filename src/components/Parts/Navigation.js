import './Navigation.css';


function Navigation(props) {
    return (
        <nav role="navigation">
        <div id="menuToggle">
            <input type="checkbox" autocomplete='off'/>
            
            <span></span>
            <span></span>
            <span></span>
            
            <ul id="menu">
            <a href="/"><li>Главная</li></a>
            <a href="/authors"><li>Авторы</li></a>

            </ul>
        </div>
        </nav>
    )
}

export default Navigation;