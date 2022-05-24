import { GET_ALL_VIDEOGAMES, GET_VIDEOGAME_BY_NAME, GET_VIDEOGAME_DETAIL, CREATE_VIDEOGAME, GET_ALL_GENRES } from "../actions/actions";

const initialState = {

    videogames: [],
    genres: []

};

const rootReducer = ( state = initialState, { type, payload } ) => {

    switch (type) {

        case GET_ALL_VIDEOGAMES:

            return {
                ...state,
                videogames: payload,

            };

        case GET_ALL_GENRES:

            return {
                ...state,
                genres: payload,

            };

        case GET_VIDEOGAME_BY_NAME:

            return {
                ...state,
                videogames: payload,

            };

        case GET_VIDEOGAME_DETAIL:

            return {
                ...state,
                videogames: payload,

            };

        case CREATE_VIDEOGAME:

            return {
                ...state,
                videogames: payload,

            };

        default:

            return state;

    }

};

export default rootReducer;