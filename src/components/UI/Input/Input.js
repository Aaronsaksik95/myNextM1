import React from 'react';
import styles from "./Input.module.scss";

const Input = (props) => {
    
    return (
        <div className={styles.form__group}>
            <label>{props.label}</label>
            <input 
                type={props.type} 
                placeholder={props.placeholder} 
                name={props.name}
                id={props.id}
                value={props.value}
                required={props.required}
                onChange={props.onChange}
            />
        </div>
    );
};

export default Input;