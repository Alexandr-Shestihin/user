import React, { useState } from "react";
import defaultLogo from '../../assets/avatars/avatar.jpg';
import { API, API_ROUTER } from "../../api";

import s from './invitMessage.module.scss'

const InvitMessage = (props) => {
   const [activeInvit, setActiveInvit] = useState(true);

   const answerInvite = (answer) => {
      setActiveInvit(false);
      API.request({
         ...API_ROUTER.teams.setAnswerInvites,
         pathKeys: {
            teamId: props.id,
         },
         data: {
            status: answer,
         }
      })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => console.log(err));
   }

   return (
      <>
         {activeInvit && <div className={s.invitContainer}>
            <p>You are invited to the team {props.name}</p>
            <div className={s.teamInfoContainer}>
               <div className={s.imgContainer}>
                  <img src={props.logo || defaultLogo} alt="" />
               </div>
               <button onClick={() => answerInvite("accepted")} className={`${s.agreeBtn} ${s.invitBtn}`}>Agree</button>
               <button onClick={() => answerInvite("rejected")} className={`${s.refuseBtn} ${s.invitBtn}`}>Refuse</button>
            </div>

         </div>}
      </>
   )
}
export default InvitMessage;