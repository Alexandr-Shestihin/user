import { API, API_ROUTER } from "../../api";

const getCommunityTournaments = (communityId) => {
  const params = {
    ...API_ROUTER.community.getCommunityTournaments,
    pathKeys: {
      communityId,
    },
  };
  return API.request(params);
};

export default getCommunityTournaments;
