import { ADD_TOURNAMENT, LOAD_TOURNAMENTS } from "../../types"

const rd = (state = {
    tournaments: []
}, action) => {
    switch(action.type) {
        case LOAD_TOURNAMENTS:
            return {...state, tournaments: action.payload}
        case ADD_TOURNAMENT: 
            return {...state, tournaments: [...state.tournaments, action.payload]}
        default:
            return state
    }
}

export default rd;