import {SET_ACTIVE_CHAT, PRESET_CHAT_MESSAGE} from "../../types";

export function setActiveChat(chat_id) {
    return {
        type: SET_ACTIVE_CHAT,
        payload: chat_id
    }
}

export function presetChatMessage(shouldPreset) {
    return {
        type: PRESET_CHAT_MESSAGE,
        payload: shouldPreset
    }
}