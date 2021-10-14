import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKE_DETAIL = "GET_POKE_DETAIL";
export const UNMOUNT_GET_POKE = "UNMOUNT_GET_POKE";
export const CREATE_POKE = "CREATE_POKE";
export const GET_TYPES = "GET_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const FILTER_TYPE = "FILTER_TYPE";



export const getPokemons = (name) => async (dispatch) => {
    try {
        if (name) {
            const res = await axios.get(`/pokemons?name=${name}`);
            dispatch({
                type: GET_POKEMONS,
                payload: res.data
            });
        }
        const res = await axios.get("/pokemons");
        dispatch({
            type: GET_POKEMONS,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getPokeDetail = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/pokemons/${id}`);
        dispatch({
            type: GET_POKE_DETAIL,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getTypes = () => async (dispatch) => {
    try {
        const res = await axios.get("/types");
        dispatch({
            type: GET_TYPES,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};


export const unmountGetPoke = () => ({ type: UNMOUNT_GET_POKE });

export const createPoke = (values) => async (dispatch) => {
    try {
        const res = await axios.post("/pokemons", { ...values });
        dispatch({
            type: CREATE_POKE,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const filterCreated = (payload) => (dispatch) => {
    dispatch({
        type: FILTER_CREATED,
        payload
    });
};

export const orderName = (payload) => (dispatch) => {
    dispatch({
        type: ORDER_NAME, payload
    });
};

export const filterType = (payload) => (dispatch) => {
    dispatch({
        type: FILTER_TYPE,
        payload
    });
};
