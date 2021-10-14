import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokeDetail, unmountGetPoke } from '../../redux/actions'
import styles from './PokeDetail.module.css';


const PokeDetail = () => {
    const dispatch = useDispatch();
    const { poke } = useSelector((state) => state);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPokeDetail(id));
        return () => {
            dispatch(unmountGetPoke());
        };
    }, [dispatch, id]);


    if (poke.name) {
        return (
            <div className={styles.ctn} key={poke.id}>


                <div>
                    <img className={styles.img} src={poke.img} alt={poke.name} />
                </div>

                <div className={styles.detail} >
                    <h2>{poke.name.toUpperCase()}</h2>
                    <p>Id: {poke.id}</p>
                    <p>hp: {poke.hp}</p>
                    <p>attack: {poke.attack}</p>
                    <p>defense: {poke.defense}</p>
                    <p>speed: {poke.speed}</p>
                    <p>height: {poke.height} kg</p>
                    <p>weight: {poke.weight} m</p>


                    <div className={styles.types}>
                        {
                            poke.types && poke.types.map((t, k) => {
                                return (
                                    <div key={k}>
                                        <img className={styles.typesImg} src={t.img} alt={t.name} />
                                        <p> {t.name.charAt(0).toUpperCase() + t.name.slice(1)} </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >

        )
    } else {
        return null;
    }
}

export default PokeDetail