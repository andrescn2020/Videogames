import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME';
export const GET_VIDEOGAME_DETAIL = 'GET_ALL_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_ALL_GENRES = 'GET_ALL_GENRES';

export const getAllVideogames = () => {
    return async (dispatch) => {
        try {
            return axios.get(`http://localhost:3001/api/videogames/`)
                .then(res => dispatch({ type: GET_ALL_VIDEOGAMES, payload: res.data }))

        } catch (err) {
            console.error(err)
        }
    };
};

export const getAllGenres = () => {
    return async function (dispatch) {
        try {
            return axios.get('http://localhost:3001/api/genres/')
                .then(res => dispatch({ type: GET_ALL_GENRES, payload: res.data }))

        } catch (err) {
            console.error(err);
        }
    };
};