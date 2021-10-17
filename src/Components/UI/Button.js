import React from 'react';

import classes from './Button.module.css';

// Re-usable button component
const Button = (props) => {
    return <button className={`${classes.button} ${props.className}`} onClick={props.onClick}>{props.children}</button>
}

export default Button;