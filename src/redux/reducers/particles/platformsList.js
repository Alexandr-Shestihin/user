import {SET_PLATFORMS} from "../../types";

const rd = (state = [], action) => {
    switch (action.type) {
        case SET_PLATFORMS:
            return state = action.payload;
        default:
            return state
    }
}

export default rd