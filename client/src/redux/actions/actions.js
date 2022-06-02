import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
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
export const QUERY_SEARCH = "QUERY_SEARCH";
 
export const getAllVideogames = () => {

    return async (dispatch) => {

        try {

            return axios.get(`http://localhost:3001/api/videogames/`)
                .then(res => dispatch({ type: GET_ALL_VIDEOGAMES, payload: res.data }))
                

        } catch (err) {

            console.error(err);

        }
    };
};

export const getVideogameById = (id) => {

    return async (dispatch) => {

        try {

            return axios.get(`http://localhost:3001/api/videogame/${id}`)
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

    return { 
        
        type: SORT_ASC,
        payload: payload
    
    }

};

export const sortByDesc = (payload) => {

    return { 
        
        type: SORT_DESC,
        payload: payload
        
    }

};

export const sortByMoreRating = (payload) => {

    return { 

        type: SORT_MORE_RATING,
        payload: payload 

    }

};


export const sortByLessRating = (payload) => {

    return { 

        type: SORT_LESS_RATING, 
        payload: payload
        
     }

};

export const sortByGenre = (payload) => {

    return {

        type: SORT_BY_GENRE, 
        payload: payload 

    }
    
};

export const resetFilter = () => {

    return async (dispatch) => {

        try {

            return axios.get(`http://localhost:3001/api/videogames/`)
                .then(res => dispatch({ type: RESET_FILTER, payload: res.data }))

        } catch (err) {

            console.error(err);

        }
    };

};

export const sortByDb = (payload) => {

    return { 

        type: SORT_BY_DB, 
        payload: payload

    };

};

export const cleanUp = () => {

    return { 

        type: CLEAN_UP, payload: {} 

    }

}

export const searchBarTerm = (term) => {

    return async (dispatch) => {

        try {

            return axios.get(`http://localhost:3001/api/videogames/?name=${term}`)
                .then(res => dispatch({ type: QUERY_SEARCH, payload: res.data }))
                

        } catch (err) {

            console.error(err);

        }
    };
};

