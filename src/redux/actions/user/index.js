import { toast } from "react-toastify";
import { API, API_ROUTER } from "../../../api";
import { SET_USER_DATA, SET_USER_NOTIFICATIONS } from "../../types";
import { setInterfaceLang } from "../language";

export function getUserData() {
   console.log('getUserData')
   return (dispatch) => {
      API.request({ ...API_ROUTER.user.getMyData }, true)
         .then((res) => {
            const { language } = res;

            if (language) {
               dispatch(setInterfaceLang(language.toLowerCase()));
            }
            console.log('res')
            console.log(res)
            dispatch(setUserData(res));
         })
         .catch((err) => {
            console.error(err);
            toast.error(err?.data?.message);
         });
   };
}

export function setUserData(data) {
   return {
      type: SET_USER_DATA,
      payload: data,
   };
}

export function logOut() {
   return (dispatch) => { };
}

export function getUserNotifications() {
   return (dispatch) => {
      API.request({ ...API_ROUTER.notifications.getUserNotifications })
         .then((res) => dispatch(setUserNotifications(res)))
         .catch((err) => console.log(err));
   };
}

export function setUserNotifications(data) {
   return {
      type: SET_USER_NOTIFICATIONS,
      payload: data,
   };
}
