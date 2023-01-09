import {API, API_ROUTER} from "../../api";

const markArrayNotificationsAsViewed = notifications => {
    const params = {
        ...API_ROUTER.notifications.markArrayAsViewed,
        data: {
            all: true,
            notifications
        }
    };

    return API.request(params)
};

export default markArrayNotificationsAsViewed;