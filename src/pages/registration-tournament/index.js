import React, { useState, useEffect } from "react";
import { ROUTER } from "../../config";
import PlayersContainer from '../../components/players-container';
import { API, API_ROUTER } from "../../api";
import { Link, useParams } from "react-router-dom";
import s from './registrationTournament.module.scss';

const RegistrationTournament = (props) => {
   const [countPlayers, setCountPlayers] = useState(0);
   const [membersRoster, setMembersRoster] = useState(null);
   const [teamRosterMembers, setTeamRosterMembers] = useState([]);
   const [data, setData] = useState(null);
   const [sizeTeam, setSizeTeam] = useState(0);
   let { id } = useParams();

   useEffect(() => {
      API.request({
         ...API_ROUTER.tournaments.getCurrentTournament,
         pathKeys: {
            tournamentId: id,
         },
      })
         .then((res) => {
            setData(res);
            setSizeTeam(+res.size.split('x')[0]);
            /* console.log(res); */
         })
         .catch((err) => console.log(err));

      API.request({
         ...API_ROUTER.tournaments.getPrimaryMembers,
      })
         .then((res) => {
            setMembersRoster(res);
            /* console.log(res); */
         })
         .catch((err) => console.log(err));
   }, []);

   const submitTeamRoster = (tournamentId, membersRoster) => {
      console.log(membersRoster)
      API.request({
         ...API_ROUTER.tournaments.postTeamRoster,
         pathKeys: {
            tournamentId: tournamentId,
         },
         data: {
            team: {
               id: membersRoster.team.id,
               name: membersRoster.team.name,
               members: [...teamRosterMembers]
            },
            user: null,
         }
      })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => console.log(err));

   }

   return (
      <div className={s.registrationContainer}>
         <div className={s.contentContainer}>
            <div className={s.title}>Registration Form</div>

            <div className={s.teamInfo}>
               <div className={s.teamTitle}>{data?.name}</div>
               <div className={s.buttomContainerInfo}>
                  <div className={s.name}>{data?.game.title}</div>
                  <div className={s.vs}>{sizeTeam} vs {sizeTeam}</div>
               </div>
            </div>

            <div className={s.addContainer}>
               <div className={s.rosterContainer}>
                  <div className={s.rosterTitle}>Main Roster</div>
                  <div className={s.rosterSubtitle}>Roster {sizeTeam}\{countPlayers}</div>
               </div>
               {/* <div className={s.addPlayer}>Add Player</div> */}
            </div>

            <div className={s.playerRow}>
               <div className={s.rowTitle}>Player</div>
            </div>

            {membersRoster?.members?.map(el => <PlayersContainer
               key={el.id}
               id={el.id}
               name={el.name}
               role={el.role}
               title={el.title}
               logo={el.logo}
               btn={true}
               setCountPlayers={setCountPlayers}
               countPlayers={countPlayers}
               setTeamRosterMembers={setTeamRosterMembers}
               teamRosterMembers={teamRosterMembers}
            />)}

            {countPlayers === sizeTeam ? <Link
               to={`/battleCup/${id}/information`}
               className={s.btnDone}
               style={{ textDecoration: 'none' }}
               onClick={() => submitTeamRoster(id, membersRoster)}
            >Registration </Link> : false}
         </div>
      </div>
   )
}
export default RegistrationTournament;