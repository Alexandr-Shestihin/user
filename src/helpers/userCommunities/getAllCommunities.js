import { API, API_ROUTER } from "../../api"


const getAllCommunities = () => {
    const params = {
        ...API_ROUTER.community.getCommunityList
    }

    return API.request(params, true)
}

export default getAllCommunities