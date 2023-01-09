import {USER_ONLINE, USER_OFFLINE} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case USER_ONLINE:
            return true;
        case USER_OFFLINE:
            return false;
        default:
            return state
    }
}

export default rd