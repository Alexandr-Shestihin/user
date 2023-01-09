import {SHOW_QR_MODAL, HIDE_QR_MODAL} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case SHOW_QR_MODAL:
            return true;
        case HIDE_QR_MODAL:
            return false;
        default:
            return state
    }
}

export default rd