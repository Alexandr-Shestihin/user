import { API, API_ROUTER } from "../../api";

const getUserCommunities = (uuid) => {
  const params = {
    ...API_ROUTER.teams.getMyTeams,
    pathKeys: {
      userUuid: uuid,
    },
  };

  return API.request(params, true);
};

export default getUserCommunities;
