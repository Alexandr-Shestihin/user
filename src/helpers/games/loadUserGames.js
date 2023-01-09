import { API, API_ROUTER } from "../../api";


const loadUserGames = () => {
    const params = {
        ...API_ROUTER.games.getUserGames,
    }

    return API.request(params)
}

export default loadUserGames
