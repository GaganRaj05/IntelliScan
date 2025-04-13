import "./Button.css";

const Button = ({children,onClick, classname}) => {
    return (
        <button className={classname} onClick={onClick}>
            {children}
        </button>
    )
}
export default Button;