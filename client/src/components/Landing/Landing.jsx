import React from 'react';
import styles from './Landing.module.css';
import { useHistory } from 'react-router-dom';

const Landing = () => {
    const history = useHistory();
    const handleOnClick = () => history.push('/main');
    return (
        <div className={styles.ctn}>
            <h1 className={styles.tittle}>WELCOME TO POKEAPI</h1>

            <button className={styles.btn} onClick={handleOnClick}>
                ENTRA
            </button>
        </div>
    )
};

export default Landing;