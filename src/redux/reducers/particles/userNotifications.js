import {SET_USER_NOTIFICATIONS} from "../../types";

const rd = (state = null, action) => {
    switch (action.type) {
        case SET_USER_NOTIFICATIONS:
            const data = action.payload;
            return state = {
                info: data.items
            };
        default:
            return state
    }
}

export default rd