import { API, API_ROUTER } from "../../api";

const getPublicGames = (userId) => {
  const params = {
    ...API_ROUTER.games.getConnectedGames,
    pathKeys: {
      userId,
    },
  };
  return API.request(params);
};

export default getPublicGames;
