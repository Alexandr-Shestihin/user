import {SET_STEAM_DATA} from "../../types";

const rd = (state = null, action) => {
    switch (action.type) {
        case SET_STEAM_DATA:
            return state = action.payload;
        default:
            return state
    }
}

export default rd