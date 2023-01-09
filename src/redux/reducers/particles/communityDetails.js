import { ADD_COMMUNITY_DETAILS, GET_COMMUNITY_DETAILS } from "../../types";


const rd = (state = {
    details: []
}, action) => {
    switch(action.type) {
        case ADD_COMMUNITY_DETAILS:
            return {...state, details: action.payload}
        case GET_COMMUNITY_DETAILS:
            return {...state, details: action.payload}
        default:
            return state   
    }
}


export default rd