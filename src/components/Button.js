import React from "react";

const Button = (props) => {
    return (
        <button
            className={`btn btn-${props.color} btn-${props.size} ${props.outline ? `btn-outline-${props.outline}` : ""} ${props.className}`}
            style={{ borderRadius: props.rounded ? "30px" : "5px", padding: "10px 20px", ...props.style }} onClick={props.onClick}>
            {props.icon && <span className="me-2">{props.icon}</span>}
            {props.btnName}
        </button>
    );
};

export default Button;
