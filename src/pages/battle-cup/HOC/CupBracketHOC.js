import React, { useEffect, useState } from "react";
import { API, API_ROUTER } from "../../../api";
import { useParams } from "react-router-dom";
import CupBracket from "../../../components/brackets";
import CupTop from "../../../components/cup-top";
import GlobalStyles from "../../../assets/styles/global";

export default function CupBracketHOC({ ...props }) {
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
            /* console.log(res); */
         })
         .catch((err) => console.log(err));
   }, []);
   return (
      <>
         <GlobalStyles />
         <CupTop tournament={tournaments} {...props} />
         <CupBracket tournament={tournaments} {...props} />
      </>
   );
}
