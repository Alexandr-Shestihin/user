import { API, API_ROUTER } from "../../api";

const getEventsTournaments = (eventId) => {
  const params = {
    ...API_ROUTER.events.getEventTournaments,
    pathKeys: {
      eventId,
    },
  };
  return API.request(params);
};

export default getEventsTournaments;
