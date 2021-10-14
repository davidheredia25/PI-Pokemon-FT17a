import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './NavBar.module.css'


const NavBar = () => {
    return (
        <div className={styles.navBar}>
            <nav>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <NavLink exact to="/main" >Home</NavLink>
                        <NavLink exact to="/main/create_poke" >Create Pokemon</NavLink>
                    </li>
                </ul>
            </nav>
            <div>
                <SearchBar />
            </div>
        </div>
    )
}

export default NavBar;