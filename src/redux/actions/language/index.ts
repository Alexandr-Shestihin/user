import {SET_INTERFACE_LANGUAGE} from "../../types";

export function setInterfaceLang(lang: string) {
    return {
        type: SET_INTERFACE_LANGUAGE,
        payload: lang
    }
}