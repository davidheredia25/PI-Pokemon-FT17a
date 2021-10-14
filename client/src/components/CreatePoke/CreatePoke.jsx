import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPoke, getTypes } from '../../redux/actions';
import styles from './CreatePoke.module.css';
import swal from 'sweetalert';

const CreatePoke = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const { types } = useSelector((state) => state);
  const [errors, setErrors] = useState({});


  const [values, setValues] = useState({
    name: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  })

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const stateReset = () => {
    setValues({
      name: '',
      img: '',
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      height: '',
      weight: '',
      types: [],
    });
  }

  let validateNum = /^([0-9])*$/;
  let validateUrl = /^https?:\/\/(?!\/)/i;

  const validate = () => {
    let errors = {};
    if (!values.name) {
      errors.name = "name es requerido";
    }
    if (!validateUrl.test(values.img)) {
      errors.img = "Deber ser una URL válida";
    }
    if (!validateNum.test(values.hp)) {
      errors.hp = "Debe ser un numero";
    }
    if (!validateNum.test(values.attack)) {
      errors.attack = "Debe ser un numero";
    }
    if (!validateNum.test(values.defense)) {
      errors.defense = "Debe ser un numero";
    }
    if (!validateNum.test(values.speed)) {
      errors.speed = "Debe ser un numero";
    }
    if (!validateNum.test(values.height)) {
      errors.peso = "Debe ser un numero";
    }
    if (!validateNum.test(values.weight)) {
      errors.height = "Debe ser un numero";
    }
    return errors;
  };

  const handleOnChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...values,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleOnSumit = e => {
    e.preventDefault();
    if (
      !errors.name & !errors.img &&
      !errors.hp &&
      !errors.attack &&
      !errors.defense &&
      !errors.speed &&
      !errors.height &&
      !errors.weight &&
      !errors.types
    ) {
      swal("Good job!", "You created a new pokemon!", "success")
      dispatch(createPoke(values));
      stateReset();
      history.push('/main')

    } else {
      alert("The form is required");
    }

  }

  const handleType = (e) => {
    setValues(() => {
      return {
        ...values,
        types: values.types.concat(e.target.value),

      };
    });
  };

  return (
    <div className={styles.cntSuperior}  >
      <h2 className={styles.title} > CREATE POKEMON</h2>
      <form  onSubmit={handleOnSumit}>
        <div >
          <label className={styles.label} htmlFor=""> Name:</label>
          <input
            className={styles.input}
            value={values.name}
            name='name'
            onChange={handleOnChange}
            type="text"
            placeholder='Name'>
          </input>
          {errors.name && <p className="warning">{errors.name}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Img:</label>
          <input
            className={styles.input}
            value={values.img}
            name='img'
            onChange={handleOnChange}
            type="text"
            placeholder='Img'>
          </input>
          {errors.name && <p className="warning">{errors.img}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Hp:</label>
          <input
            className={styles.input}
            value={values.hp}
            name='hp'
            onChange={handleOnChange}
            type="text"
            placeholder='Hp'>
          </input>
          {errors.hp && <p className="warning">{errors.hp}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Attack:</label>
          <input
            className={styles.input}
            value={values.attack}
            name='attack'
            onChange={handleOnChange}
            type="text"
            placeholder='Attack'>
          </input>
          {errors.attack && <p className="warning">{errors.attack}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Defense:</label>
          <input
            className={styles.input}
            value={values.defense}
            name='defense'
            onChange={handleOnChange}
            type="text"
            placeholder='Defense'>
          </input>
          {errors.defensa && <p className="warning">{errors.defensa}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Speed:</label>
          <input
            className={styles.input}
            value={values.speed}
            name='speed'
            onChange={handleOnChange}
            type="text"
            placeholder='Speed'>
          </input>
          {errors.speed && <p className="warning">{errors.speed}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Height:</label>
          <input
            className={styles.input}
            value={values.height}
            name='height'
            onChange={handleOnChange}
            type="text"
            placeholder='Height'>
          </input>
          {errors.height && <p className="warning">{errors.height}</p>}
        </div>

        <div>
          <label className={styles.label} htmlFor=""> Weight:</label>
          <input
            className={styles.input}
            value={values.weight}
            name='weight'
            onChange={handleOnChange}
            type="text"
            placeholder='Weight'>
          </input>
          {errors.weight && <p className="warning">{errors.weight}</p>}
        </div>


        <div >
          <h4 className={styles.titletypes} >Select the types</h4>
          <div className={styles.carTypes} onChange={handleType} value={values.types}>
            {
              types.map((t, k) => (
                <div className={styles.types} key={k}>
                  <input value={t.id} type="checkbox" />
                  {t.name}
                </div>
              ))
            }
          </div>
        </div>

        <button className={styles.btn}> Create</button>

      </form>
    </div>
  );
}

export default CreatePoke

