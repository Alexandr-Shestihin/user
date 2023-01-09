import {SET_COUNTRIES} from "../../types";

const rd = (state = [], action) => {
    switch (action.type) {
        case SET_COUNTRIES:
            return state = action.payload;
        default:
            return state
    }
}

export default rd