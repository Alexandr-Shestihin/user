import {API, API_ROUTER} from "../../api";

const offerToPlay = userUuid => {
    const params = {
        ...API_ROUTER.chat.createNewChat,
        data: {
            user: userUuid
        }
    };

    return API.request(params, true)
};

export default offerToPlay;