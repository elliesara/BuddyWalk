import "./button.css";

function Button({ text, color, callback }) {
    // used for both the offer a walk and accept/decline buttons
    // need to implement onclick with backend
    
    return (
        <button style={{backgroundColor: color}} onClick={callback} className="buttonComponent">{text}</button>
    )
}

export default Button;
