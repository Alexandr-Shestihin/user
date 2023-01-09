import {SET_STEAM_DATA} from "../../types";

export function setSteamData(data) {
    return {
        type: SET_STEAM_DATA,
        payload: data
    }
}