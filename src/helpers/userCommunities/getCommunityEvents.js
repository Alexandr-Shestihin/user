import { API, API_ROUTER } from "../../api";

const getCommunityEvents = (communityId) => {
  const params = {
    ...API_ROUTER.community.getCommunityEvent,
    pathKeys: {
      communityId,
    },
  };
  return API.request(params);
};

export default getCommunityEvents;
