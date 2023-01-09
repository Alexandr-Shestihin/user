import {SHOW_NOTIFICATION_MODAL, HIDE_NOTIFICATION_MODAL} from "../../types";

const rd = (state = {
    state: false,
    message: ''
}, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION_MODAL:
            return state = {
                state: true,
                message: action.payload
            };
        case HIDE_NOTIFICATION_MODAL:
            return state = {
                state: false,
                message: ''
            };
        default:
            return state
    }
}

export default rd