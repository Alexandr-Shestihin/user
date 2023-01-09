import {SCROLL_TO} from "../../types";

export function scrollTo(ref) {
    return {
        type: SCROLL_TO,
        payload: ref
    }
}