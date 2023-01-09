import React, { useEffect, useState } from "react";
import { API, API_ROUTER } from "../../../api";
import { useParams } from "react-router-dom";
import CupParticipants from "../CupParticipants";
import CupTop from "../../../components/cup-top";
import GlobalStyles from "../../../assets/styles/global";

export default function CupParticipantsHOC({ ...props }) {
  const [tournaments, setTournaments] = useState();
  let { id } = useParams();
  useEffect(() => {
    API.request({
      ...API_ROUTER.tournaments.getCurrentTournament,
      pathKeys: {
        tournamentId: id,
      },
    })
      .then((res) => {
        setTournaments(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <GlobalStyles />
      <CupTop tournament={tournaments} {...props} />
      <CupParticipants tournament={tournaments} {...props} />
    </>
  );
}
