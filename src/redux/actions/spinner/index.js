import {ADD_SPINNER, REMOVE_SPINNER} from "../../types";

export function addSpinner() {
    return {
        type: ADD_SPINNER
    }
}

export function removeSpinner() {
    return {
        type: REMOVE_SPINNER
    }
}