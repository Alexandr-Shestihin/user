import {API, API_ROUTER} from "../../api";

const addFriend = userUuid => {
    const params = {
        ...API_ROUTER.friendship.addFriend,
        pathKeys: {
            userUuid: userUuid
        }
    };

    return API.request(params, true)
};

export default addFriend;