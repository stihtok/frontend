import { useState, useRef } from 'react';
import './Search.css';

function Search(props) {
    let ref = useRef(null);
    let [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(prevState => !prevState);
        ref.current.focus();
    }

    return (
        <form action="/search" method="GET">
            <input type='button' className='searchButton' onClick={handleClick}/>
            <input ref={ref} name="q" type="search" className={isActive ? "searchInputActive" : "searchInputInactive"} placeholder='Поиск'/>
        </form>
    )
}

export default Search;