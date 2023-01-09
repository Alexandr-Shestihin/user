import { API, API_ROUTER } from "../../api";

const getCommunityDetailsHelper = (communityId) => {
  const params = {
    ...API_ROUTER.community.getCommunityDetails,
    pathKeys: {
      communityId,
    },
  };
  return API.request(params);
};

export default getCommunityDetailsHelper;
