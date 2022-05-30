import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME';
export const GET_VIDEOGAME_DETAIL = 'GET_ALL_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SORT_ASC = "SORT_ASC";
export const SORT_DESC = "SORT_DESC";
export const SORT_MORE_RATING = "SORT_MORE_RATING";
export const SORT_LESS_RATING = "SORT_LESS_RATING";
export const SORT_BY_GENRE = "SORT_BY_GENRE";
export const RESET_FILTER = 'RESET_FILTER';
export const SORT_BY_DB = "SORT_BY_DB";
export const CLEAN_UP = "CLEAN_UP";


export const getAllVideogames = () => {

    return async (dispatch) => {

        try {

            return axios.get(`https://api.rawg.io/api/games?key=b3b60d6dd3b44a0f9da23679368988e0`)
                .then(res => dispatch({ type: GET_ALL_VIDEOGAMES, payload: res.data.results }))
                

        } catch (err) {

            console.error(err);

        }
    };
};

export const getVideogameById = (id) => {

    return async (dispatch) => {

        try {

            console.log(id);

            return axios.get(`https://api.rawg.io/api/games/${id}?key=b3b60d6dd3b44a0f9da23679368988e0`)
                .then(res => dispatch({ type: GET_VIDEOGAME_DETAIL, payload: res.data}))

        } catch (err) {

            console.error(err);

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

export const sortByAsc = (payload) => {

    return (dispatch) => {
        
        dispatch({ type: SORT_ASC, payload: payload });

    };
};

export const sortByDesc = (payload) => {

    return (dispatch) => {
        
        dispatch({ type: SORT_DESC, payload: payload });

    };
};

export const sortByMoreRating = (payload) => {

    return (dispatch) => {
        
        dispatch({ type: SORT_MORE_RATING, payload: payload });

    };
};


export const sortByLessRating = (payload) => {

    return (dispatch) => {
        
        dispatch({ type: SORT_LESS_RATING, payload: payload });

    };
};

export const sortByGenre = (payload) => {

    return (dispatch) => {
        
        dispatch({ type: SORT_BY_GENRE, payload: payload });

    };
};

export const resetFilter = () => {

    return async (dispatch) => {

        try {

            return axios.get(`https://api.rawg.io/api/games?key=b3b60d6dd3b44a0f9da23679368988e0`)
                .then(res => dispatch({ type: RESET_FILTER, payload: res.data.results }))

        } catch (err) {

            console.error(err);

        }
    };

};

export const sortByDb = () => {

    return async (dispatch) => {

        try {

            return axios.get(`http://localhost:3001/api/videogames/`)
                .then(res => dispatch({ type: SORT_BY_DB, payload: res.data }))

        } catch (err) {

            console.error(err);

        }
    };

};

export const cleanUp = () => {

    return (dispatch) => {
        
        dispatch({ type: CLEAN_UP, payload: {} });

    };

}

