import {SHOW_REGISTER_MODAL, HIDE_REGISTER_MODAL} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case SHOW_REGISTER_MODAL:
            return true;
        case HIDE_REGISTER_MODAL:
            return false;
        default:
            return state
    }
}

export default rd