import { API, API_ROUTER } from "../../api"

const getAllEvents = () => {
    const params = {
        ...API_ROUTER.events.getEvents
    }

    return API.request(params)
}

export default getAllEvents