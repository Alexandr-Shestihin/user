import { API, API_ROUTER } from "../../api";

const getPublicUserProfile = (userId) => {
  const params = {
    ...API_ROUTER.user.getPublicUserInfo,
    pathKeys: {
      userId,
    },
  };
  return API.request(params);
};

export default getPublicUserProfile;
