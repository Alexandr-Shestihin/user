import {
    SHOW_AUTH_MODAL,
    SHOW_QR_MODAL,
    HIDE_AUTH_MODAL,
    HIDE_QR_MODAL,
    SHOW_REGISTER_MODAL,
    HIDE_REGISTER_MODAL,
    USER_ONLINE,
    USER_OFFLINE,
    SHOW_AUTH_BLOCKED,
    HIDE_AUTH_BLOCKED
} from "../../types";

export function showAuthBlockedModal() {
    return {
        type: SHOW_AUTH_BLOCKED
    }
}

export function hideAuthBlockedModal() {
    return {
        type: HIDE_AUTH_BLOCKED
    }
}

export function showAuthModal() {
    return {
        type: SHOW_AUTH_MODAL
    }
}

export function showQrModal() {
    return {
        type: SHOW_QR_MODAL
    }
}

export function hideAuthModal() {
    return {
        type: HIDE_AUTH_MODAL
    }
}

export function hideQrModal() {
    return {
        type: HIDE_QR_MODAL
    }
}

export function showRegisterModal() {
    return {
        type: SHOW_REGISTER_MODAL
    }
}

export function hideRegisterModal() {
    return {
        type: HIDE_REGISTER_MODAL
    }
}

export function userOnline() {
    return {
        type: USER_ONLINE
    }
}

export function userOffline() {
    return {
        type: USER_OFFLINE
    }
}