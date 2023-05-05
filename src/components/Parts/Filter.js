import './Filter.css';


function Filter(props) {
    return (
        <input className='filter' placeholder='Поиск' onChange={props.onChangeFunc}/>
    )
}

export default Filter;