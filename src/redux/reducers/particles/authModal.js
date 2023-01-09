import {SHOW_AUTH_MODAL, HIDE_AUTH_MODAL} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case SHOW_AUTH_MODAL:
            return true;
        case HIDE_AUTH_MODAL:
            return false;
        default:
            return state
    }
}

export default rd