import {SHOW_MENU, HIDE_MENU} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case SHOW_MENU:
            return true;
        case HIDE_MENU:
            return false;
        default:
            return state
    }
}

export default rd