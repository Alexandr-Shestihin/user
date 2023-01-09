import { API, API_ROUTER } from "../../api";

const getUserCommunities = () => {
    const params = {
        ...API_ROUTER.community.getList
    }

    return API.request(params, true)
}

export default getUserCommunities