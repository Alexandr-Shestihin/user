import { API, API_ROUTER } from "../../api";

const getAllMatches = () => {
  const params = {
    ...API_ROUTER.watch.getAllMatches,
  };

  return API.request(params, true);
};

export default getAllMatches;
