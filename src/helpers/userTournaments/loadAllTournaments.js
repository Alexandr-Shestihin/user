import { API, API_ROUTER } from "../../api";

const loadAllTournaments = (gameId) => {
  const params = {
    ...API_ROUTER.tournaments.getTournaments,
    pathKeys: {
      gameId,
    },
  };

  return API.request(params, true);
};

export default loadAllTournaments;
