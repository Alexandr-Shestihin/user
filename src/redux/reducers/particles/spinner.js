import {ADD_SPINNER, REMOVE_SPINNER} from "../../types";

const rd = (state = 0, action) => {
    switch (action.type) {
        case ADD_SPINNER:
            return state + 1;
        case REMOVE_SPINNER:
            return state - 1;
        default:
            return state
    }
}

export default rd