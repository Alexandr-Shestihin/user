import { API, API_ROUTER } from "../../api";


const getUserCommunityList = () => {
    const params = {
        ...API_ROUTER.community.getList
    }

    return API.request(params, true)
}


export default getUserCommunityList