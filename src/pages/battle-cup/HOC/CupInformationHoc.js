import React, { useEffect, useState } from "react";
import { API, API_ROUTER } from "../../../api";
import { useParams } from "react-router-dom";
import CupInformation from "../CupInformation";
import CupTop from "../../../components/cup-top";
import GlobalStyles from "../../../assets/styles/global";

export default function CupHoc({ ...props }) {
   const [tournaments, setTournaments] = useState();
   const [participationTypeData, setParticipationTypeData] = useState(null);

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

      API.request({
         ...API_ROUTER.tournaments.getCurrentTournament,
         pathKeys: {
            tournamentId: id,
         },
      })
         .then((res) => {
            setParticipationTypeData(res.participationType);
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <>
         <GlobalStyles />
         <CupTop tournament={tournaments} {...props} />
         <CupInformation
            participationTypeData={participationTypeData}
            tournament={tournaments}
            {...props}
         />
      </>
   );
}
