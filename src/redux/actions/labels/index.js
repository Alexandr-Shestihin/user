import {API, API_ROUTER} from "../../../api";
import {toast} from "react-toastify";
import {SET_COUNTRIES, SET_PLATFORMS, SET_DEVICES} from "../../types";

export function getDevices() {
    return dispatch => {
        API.request({...API_ROUTER.public.getDevices}, true)
            .then(res => {
                const platforms = res.map(item => ({
                    label: item.name,
                    value: item.uuid
                }))

                dispatch(setDevices(platforms));
            })
            .catch(err => toast.error(err?.data && err?.data?.message || "Get Devices Error"))
    }
}

export function getPlatforms() {
    return dispatch => {
        API.request({...API_ROUTER.public.getPlatforms}, true)
            .then(res => {
                const platforms = res.map(item => ({
                    label: item.title,
                    value: item.uuid
                }))

                dispatch(setPlatforms(platforms));
            })
            .catch(err => toast.error(err?.data && err?.data?.message || "Get Platforms Error"))
    }
}

export function getCountries() {
    return dispatch => {
        API.request({...API_ROUTER.public.getCountriesList}, true)
            .then(res => {
                const keys = Object.keys(res);
                const values = Object.values(res);
                const list = [];
                keys.forEach((key, index) => {
                    list.push({
                        value: key,
                        label: values[index]
                    })
                });

                dispatch(setCountries(list));
            })
            .catch(err => toast.error(err?.data && err?.data?.message || "Get Countries Error"))
    }
}

export function setCountries(data) {
    return {
        type: SET_COUNTRIES,
        payload: data
    }
}

export function setPlatforms(data) {
    return {
        type: SET_PLATFORMS,
        payload: data
    }
}

export function setDevices(data) {
    return {
        type: SET_DEVICES,
        payload: data
    }
}