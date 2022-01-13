import React from 'react';
// import styles from "./Button.module.scss";

function Button(props) {
    return (
        <div className='text-center'>
            <button className={props.className}>{props.title}</button>
        </div>
    );
}

export default Button;