import {API, API_ROUTER} from "../../api";

const markSingleNotificationAsViewed = notificationUuid => {
    const params = {
        ...API_ROUTER.notifications.markSingleAsViewed,
        pathKeys: {
            notificationUuid
        }
    };

    return API.request(params)
};

export default markSingleNotificationAsViewed;