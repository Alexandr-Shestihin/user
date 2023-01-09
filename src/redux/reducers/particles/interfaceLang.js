import {SET_INTERFACE_LANGUAGE} from "../../types";

const rd = (state = localStorage.getItem('interfaceLang') || 'en', action) => {
    switch (action.type) {
        case SET_INTERFACE_LANGUAGE:
            return state = action.payload;
        default:
            return state
    }
}

export default rd