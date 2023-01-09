import {SHOW_AUTH_BLOCKED, HIDE_AUTH_BLOCKED} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case SHOW_AUTH_BLOCKED:
            return true;
        case HIDE_AUTH_BLOCKED:
            return false;
        default:
            return state
    }
}

export default rd