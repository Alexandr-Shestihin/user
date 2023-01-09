import React, { useState, useEffect } from "react";
import s from './inviteTeam.module.scss';
import { API, API_ROUTER } from "../../api";
import defaultAvatar from '../../assets/avatars/avatar.jpg';
import MemberItem from '../../components/memberItem'

const InviteTeam = () => {
   const teamId = window.location.href.split('/teams/team/')[1].split('/invite')[0];

   const initialMembers = [
      { id: 1, nickname: 'Laoding...', avatar: null },
   ]
   const [members, setMembers] = useState(initialMembers);
   const [inputText, setInputText] = useState('');
   const [err, setErrt] = useState(false);
   const [errText, setTextErr] = useState('');
   const [team, setTeam] = useState(null);
   const [answerFromServer, setAnswerFromServer] = useState(null);

   const getMembers = (id) => {
      API.request({
         ...API_ROUTER.teams.getMembers,
         pathKeys: {
            teamId: id,
         },
      })
         .then((res) => {
            setMembers(res.members);
         })
         .catch((err) => console.log(err));
   }

   useEffect(() => {
      getMembers(teamId);
      API.request(
         {
            ...API_ROUTER.teams.getTeamDetails,
            pathKeys: {
               teamId: teamId,
            },
         },
         true
      )
         .then((data) => {
            setTeam(data);
         })
         .catch((err) => { console.log(err) });
   }, [])

   const changeErrText = (text) => {
      setTextErr('User not found');
      setErrt(true);
      setTimeout(() => setErrt(false), 2000);
   }

   const submitIdUserInvite = (id) => {
      API.request({
         ...API_ROUTER.teams.setIdUserInvite,
         pathKeys: {
            teamId: teamId,
         },
         data: {
            inviteeId: id,
         }
      })
         .then((res) => {
            setAnswerFromServer('You have successfully added');
            console.log(res);
         })
         .catch((err) => {
            if (err.data.message.includes('No transport supports')) {
               setAnswerFromServer('You have successfully added');
               setTimeout(() => setAnswerFromServer(''), 2000);
            } else if (err.data.message.includes('User not found')) {
               changeErrText('User not found');
            } else {
               changeErrText('unknown error');
            }
         });

   }
   const checkDataUserInvite = (text) => {
      if (/[a-zA-Z]/.test(text) && text.length > 3) {

         /* if (text.includes("@") && text.includes(".")) {
            submitEmailUserInvite(text);
            setErrt(false);
         } else */
         // if (!text.includes("@") && !text.includes(".")) {
         submitIdUserInvite(text);
         setInputText('');
         setErrt(false);
         setTextErr('');
         // } else setErrt(true);

      } else {
         setErrt(true);
         setTextErr('Incorrect data');
      };
   }

   return (
      <div className={s.containerInviteTeam}>
         <div className={s.contantContainer}>

            {team?.hasAccessEdit && <div className={s.inputContainer}>
               <input
                  className={err && s.err}
                  type="text"
                  placeholder={`Add member ID (Email)`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.trim())}
               />
               <button onClick={() => checkDataUserInvite(inputText)}>Add</button>
            </div>}
            <div className={s.messageContainer}>
               {err && <div className={s.err}>{errText}</div>}
               {answerFromServer && <div >{answerFromServer}</div>}
            </div>


            <div className={s.teamMembersContainer}>
               <div className={s.titleMembers}>Team Members</div>
               <div className={s.playerContainers}>

                  {members?.map(el => <MemberItem
                     key={el.id}
                     id={el.id}
                     avatar={el.avatar}
                     nickname={el.nickname}
                     teamId={teamId}
                     ownerTeam={team?.hasAccessEdit}
                     getMembers={getMembers}
                  />)}

               </div>
            </div>

         </div>
      </div>
   )
}
export default InviteTeam;