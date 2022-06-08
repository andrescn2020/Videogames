import {

    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_DETAIL,
    CREATE_VIDEOGAME,
    GET_ALL_GENRES,
    SORT_ASC,
    SORT_DESC,
    SORT_MORE_RATING,
    SORT_LESS_RATING,
    SORT_BY_GENRE,
    RESET_FILTER,
    SORT_BY_DB_OR_API,
    QUERY_SEARCH,

} from "../actions/actions";

const initialState = {

    videogames: [],
    notFound: "",
    videogameDetail: {},
    genres: []

};

const rootReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case GET_ALL_VIDEOGAMES:

            return {

                ...state,
                videogames: payload

            };

        case GET_VIDEOGAME_DETAIL:

            payload.description = payload.description.split("<p>").join("");

            payload.description = payload.description.split("</p>").join("");

            payload.description = payload.description.split("<br />").join("");

            payload.description = payload.description.split("\n").join("");

            return {

                ...state,
                videogameDetail: payload

            };

        case RESET_FILTER:

            return {

                ...state,
                videogames: payload

            };

        case GET_ALL_GENRES:

            return {

                ...state,
                genres: payload

            };

        case QUERY_SEARCH:

            let queryVideogames = payload;

            console.log(payload);

            if (payload === "Doesnt exist a game with this name") {

                queryVideogames = [];

            }

            return {

                ...state,
                notFound: payload,
                videogames: queryVideogames

            };


        case CREATE_VIDEOGAME:

            return {

                ...state,
                videogames: payload

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

            let sortByGenre = state.videogames;

            let filteredVideogamesByGenre = [];

            let pushElem = [];

            let error = "";

            for (let i = 0; i < sortByGenre.length; i++) {

                pushElem = sortByGenre[i].genres.filter(genre => genre.name === payload)

                if (pushElem.length > 0) {

                    filteredVideogamesByGenre.push(sortByGenre[i]);

                }

            }

            if (filteredVideogamesByGenre.length === 0) {

                error = "Doesnt exist a game with this name";

            }

            return {

                ...state,
                notFound: error,
                videogames: filteredVideogamesByGenre

            };

        case SORT_BY_DB_OR_API:

            let videogamesFilter = state.videogames;

            let errorData = "";

            if (payload === "Games created in form") {

                videogamesFilter = videogamesFilter.filter(videogame => videogame.description.includes("</p>") === false);

            } else if (payload === "Games from api") {

                videogamesFilter = videogamesFilter.filter(videogame => videogame.description.includes("</p>") === true);

            } else if (payload === "All") {

                videogamesFilter = state.videogames;

            }

            if (videogamesFilter.length === 0) {

                errorData = "Doesnt exist a game with this name";

            }

            return {

                ...state,
                notFound: errorData,
                videogames: videogamesFilter

            };

        default:

            return state;

    }

};

export default rootReducer;