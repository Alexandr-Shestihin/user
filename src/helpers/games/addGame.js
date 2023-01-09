import { API, API_ROUTER } from "../../api"

const addGame = (gameId, nickname="unknown") => {
    const params = {
        ...API_ROUTER.games.addGameToUserGames,
        data: {
            gameId,
            nickname
        }
    }

    return API.request(params, true)
}

export default addGame
