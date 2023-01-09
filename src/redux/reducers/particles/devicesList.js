import {SET_DEVICES} from "../../types";

const rd = (state = [], action) => {
    switch (action.type) {
        case SET_DEVICES:
            return state = action.payload;
        default:
            return state
    }
}

export default rd