
import { GET_USER_COMMUNITIES, ADD_COMMUNITY } from "../../types"

const rd = (state = {
    communities: []
}, action) => {
    switch(action.type) {
        case GET_USER_COMMUNITIES:
            return {...state, communities: state.communities}
        case ADD_COMMUNITY:
            return {...state, communities: [...state.communities, action.payload]}
        default:
            return state
    }
}

export default rd