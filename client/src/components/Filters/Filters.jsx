import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCreated, orderName, filterType, getTypes } from '../../redux/actions'
import styles from './Filters.module.css';

const Filters = () => {
    const dispatch = useDispatch()
    const { types } = useSelector((state) => state);


    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderName(e.target.value))

    }

    const handleFilterType = (e) => {
        e.preventDefault();
        dispatch(filterType(e.target.value))

    }

    return (

        <div className={styles.cont}>
            <div>
                <h4 className={styles.title}>Order</h4>
                <label className={styles.label} htmlFor="">Alphabetically  </label>
                <select className={styles.select} onChange={e => handleSort(e)} >
                    <option >-</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div>
                <h4 className={styles.title}>Filters</h4>
                <label className={styles.label} htmlFor=""> Created - Api  </label>
                <select className={styles.select} onChange={e => handleFilterCreated(e)} >
                    <option >-</option>
                    <option value="all">All Pokemons </option>
                    <option value="created">Data Base</option>
                    <option value="api">All Api</option>
                </select>



                <label className={styles.label} htmlFor=""> Types  </label>
                <select className={styles.select} onChange={e => handleFilterType(e)} >
                    {
                        types.map((t, k) => (
                            <option value={t.name} key={k}  >
                                {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                            </option>
                        ))
                    }
                </select>
            </div>

        </div >


    );
}



export default Filters;