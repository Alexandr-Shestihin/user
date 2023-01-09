import {SCROLL_TO} from "../../types";

const rd = (state = null, action) => {
    switch (action.type) {
        case SCROLL_TO:
            return state = action.payload;
        default:
            return state
    }
}

export default rd