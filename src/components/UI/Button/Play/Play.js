import React from 'react';
import styles from "./Play.module.scss";
import Link from 'next/link';

function Play() {
    return (
        <div className={styles.play}>
            <Link href='/watch' >
                <a className="btn btn-white"><span className={styles.icon}>▶&nbsp;&nbsp;</span>Lecture</a>
            </Link>
        </div>

    );
}

export default Play;