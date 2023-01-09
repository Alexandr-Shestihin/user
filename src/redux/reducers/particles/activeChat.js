import {SET_ACTIVE_CHAT} from "../../types";

const rd = (state = null, action) => {
    switch (action.type) {
        case SET_ACTIVE_CHAT:
            return state = action.payload;
        default:
            return state
    }
}

export default rd