import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { API, API_ROUTER } from "../../../api";

import Row from "../../../components/profile-bricks/Row";
import pubgImg from "../../../assets/images/img-login_register_profile_rodster/pubg.png";
import firefareImg from "../../../assets/images/img-login_register_profile_rodster/firefare.png";

export default function Bottom({ team, history, teamId }) {
   const [teamGames, setTeamGames] = useState([]);
   const [checkTeamId, setCheckTeamId] = useState([]);

   useEffect(() => {
      API.request({
         ...API_ROUTER.teams.getTeamGames,
         pathKeys: {
            teamId: teamId,
         },
      })
         .then((res) => {
            setTeamGames(res.games);
         })
         .catch((err) => console.log(err));
   }, []);
   useEffect(() => {
      API.request({
         ...API_ROUTER.teams?.getMyTeams,
      })
         .then((res) => {
            setCheckTeamId(res?.teams);
         })
         .catch((err) => console.log(err));
   }, []);
   console.log(checkTeamId);
   checkTeamId?.map((el) => console.log(el.id));

   function getGameCards(history, teamId, teamGames) {
      let checkid = [];
      checkTeamId.map((el) => checkid.push(el.id));
      console.log(checkid);
      let answer = checkid.includes(teamId);
      let gameCard;
      if (answer)
         return (gameCard = [
            ...teamGames,
            {
               id: uuidv4(),
               add: true,
               title: "Add Roster",
               action: () => {
                  history.push(`/teams/team/${teamId}/roster/discipline`);
               },
               img: "",
            },
         ]);

      if (!answer) {
         return (gameCard = [...teamGames]);
      }
      return gameCard;
   }

   return (
      <div>
         <Row title="Tean members" history={history} teamId={teamId} cards={getRosterCards(team)} />
         <Row title="Tournaments" cards={getTournamentCards(team)} />
         <Row
            title="Games and Rosters"
            cards={getGameCards(history, teamId, teamGames)}
         />
      </div>
   );
}

function getTournamentCards(user) {
   const tournamentCard = [
      {
         id: uuidv4(),
         add: false,
         title: "Finished",
         img: "",
         icon: "rank",
         isComing: true,
      },
      {
         id: uuidv4(),
         add: false,
         title: "In progress",
         img: "",
         icon: "timer",
         isComing: true,
      },
      {
         id: uuidv4(),
         add: false,
         title: "Coming Soon",
         img: "",
         icon: "clock",
         isComing: true,
      },
      {
         id: uuidv4(),
         add: true,
         title: "Add To",
         img: "",
         isComing: true,
      },
   ];

   return tournamentCard;
}

function getRosterCards(user) {
   const statisticCard1 = [
      {
         id: uuidv4(),
         add: false,
         title: "Member list",
         img: "",
         icon: "user-group",
      },
      {
         id: uuidv4(),
         add: false,
         title: "All",
         img: "",
         icon: "graphic",
         isComing: true,
      },
   ];

   return statisticCard1;
}
