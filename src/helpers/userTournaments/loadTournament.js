import { API, API_ROUTER } from "../../api";

const loadTournament = (tournamentId) => {
  const params = {
    ...API_ROUTER.tournaments.getCurrentTournament,
    pathKeys: {
      tournamentId,
    },
  };

  return API.request(params, true);
};

export default loadTournament;
