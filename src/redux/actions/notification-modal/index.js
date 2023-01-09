import {SHOW_NOTIFICATION_MODAL, HIDE_NOTIFICATION_MODAL} from "../../types";

export function showNotificationModal(data) {
    return {
        type: SHOW_NOTIFICATION_MODAL,
        payload: data
    }
}

export function hideNotificationModal() {
    return {
        type: HIDE_NOTIFICATION_MODAL
    }
}