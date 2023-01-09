import axios from "axios";
import {API_URL} from "../config";
import store from '../redux/store';
import { addSpinner, removeSpinner, userOffline } from '../redux/actions';

class Api {

    constructor(baseURL) {
        this.adapter = axios.create({
            baseURL
        });
    }

    request = async ({url, method, data, externalRequest = false, pathKeys = {}, urlParams = {}, headers = {}}, showSpinner) => {
        const sessionToken = sessionStorage.getItem('token');
        const storageToken = localStorage.getItem('token');
        const hasPathKeys = Object.keys(pathKeys).length;

        // add url params
        let addParams = '';
        if (Object.keys(urlParams).length) {
            const keys = Object.keys(urlParams);
            const values = Object.values(urlParams);

            addParams = keys.map((item, index) => {
                const startSymbol = index === 0 ? '?' : '&';
                return `${startSymbol}${keys[index]}=${values[index]}`;
            }).join('');
        }

        // add path keys
        if (hasPathKeys) {
            const items = Object.entries(pathKeys);
            items.forEach(item => {
                const [key, value] = item;
                url = url.replace(`{${key}}`, value);
            });
        }

        // create request
        const request = {
            url: url + addParams,
            method,
            data,
            headers: {
                ...headers
            }
        };

        // add token
        if (!externalRequest) {
            if (sessionToken) {
                request.headers.Authorization = `Bearer ${sessionToken}`;
            } else if (storageToken) {
                request.headers.Authorization = `Bearer ${storageToken}`;
            }
        }

        // show spinner
        if (showSpinner) store.dispatch(addSpinner());

        // send request
        const response = await this.adapter
            .request(request)
            .catch(err => this.handleError(err, request, showSpinner));

        // hide spinner on success
        if (showSpinner) store.dispatch(removeSpinner());

        // return result
        return Promise.resolve(response.data);
    };

    handleError = async (err, request, showSpinner) => {
        // hide spinner on error
        if (showSpinner) store.dispatch(removeSpinner());

        if (!err.response) {
            console.error('No server response...')
        }

        // if bad token
        const data = err?.response?.data || null;

        if (data && data.code === 403) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            store.dispatch(userOffline())
            window.location = '/'
        }

        // return error
        return Promise.reject(err.response);
    };
}

const API = new Api(API_URL);
export default API;
