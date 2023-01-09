import { ADD_GAME, LOAD_GAMES, GET_USER_GAMES } from "../../types";

const rd = (state = {
    games: [],
}, action) => {
    switch(action.type) {
        case GET_USER_GAMES:
            return {...state, games: state.games}
        case LOAD_GAMES:
            return {...state, games: action.payload}
        case ADD_GAME: 
            return {...state, games: [...state.games, action.payload]}
        default:
            return state
    }
}

export default rd