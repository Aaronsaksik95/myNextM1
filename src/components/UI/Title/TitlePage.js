import React from 'react';
import styles from "./Title.module.scss";

function TitlePage(props) {
    return (
        <div className={styles.title__page}>
            <h1>{props.title}</h1>
        </div>
    );
}

export default TitlePage;