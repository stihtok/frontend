import './Filter.css';


function Filter(props) {
    if (props.onChangeFunc) {
        return (
            <input name="q" type="text" className='filter' placeholder='Поиск' onChange={props.onChangeFunc}/>
        )
    }
    return (
        <form action="/search" method="GET">
            <input name="q" type="text" className='filter' placeholder='Поиск' onChange={props.onChangeFunc}/>
        </form>
    )
}

export default Filter;