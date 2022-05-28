import {

    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_NAME,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME,
    GET_ALL_GENRES,
    SORT_ASC,
    SORT_DESC,
    SORT_MORE_RATING,
    SORT_LESS_RATING,
    SORT_BY_GENRE

} from "../actions/actions";

const initialState = {

    videogames: [],
    genres: []

};

const rootReducer = (state = initialState, { type, payload }) => {

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

        case SORT_ASC:

            let sortAsc = state.videogames

            sortAsc.sort(function (a, b) { return a.name.localeCompare(b.name) })

            return {

                ...state,
                videogames: sortAsc

            };

        case SORT_DESC:

            let sortDesc = state.videogames

            sortDesc.sort(function (a, b) { return a.name.localeCompare(b.name) })

            sortDesc.reverse();

            return {

                ...state,
                videogames: sortDesc

            };

        case SORT_MORE_RATING:

            let sortMoreRating = state.videogames

            sortMoreRating.sort(function (a, b) { return a.rating - b.rating });

            sortMoreRating.reverse();

            return {

                ...state,
                videogames: sortMoreRating

            };

        case SORT_LESS_RATING:

            let sortLessRating = state.videogames

            sortLessRating.sort(function (a, b) { return a.rating - b.rating });

            return {

                ...state,
                videogames: sortLessRating

            };

        case SORT_BY_GENRE:

            let sortByGenre = state.genres;

            sortByGenre = sortByGenre.filter((genre) => genre.name === payload);

            return {

                ...state,
                videogames: sortByGenre[0].videogames

            };

        default:

            return state;

    }

};

export default rootReducer;