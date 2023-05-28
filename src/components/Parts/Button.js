import './Button.css';

function Button(props) {
    return (
        <a className='button' href={props.href} type='button'>{props.text}</a>
    )
}

export default Button; 