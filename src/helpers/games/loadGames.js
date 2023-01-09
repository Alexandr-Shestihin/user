import {API, API_ROUTER} from "../../api";

const loadGames = () => {
    const params = {
        ...API_ROUTER.games.getGames,
    };

    return API.request(params, true)
};
 
export default loadGames;