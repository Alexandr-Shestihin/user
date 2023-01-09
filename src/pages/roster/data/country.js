import { API, API_ROUTER } from "../../../api";

const loadCountry = () => {
  const params = {
    ...API_ROUTER.public.getCountriesList,
  };

  return API.request(params, true);
};

export default loadCountry;
