import {PRESET_CHAT_MESSAGE} from "../../types";

const rd = (state = false, action) => {
    switch (action.type) {
        case PRESET_CHAT_MESSAGE:
            return state = action.payload;
        default:
            return state
    }
}

export default rd