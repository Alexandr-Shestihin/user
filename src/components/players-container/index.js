import React, { useState } from "react";
import defaultLogo from '../../assets/avatars/avatar.jpg';
import s from './playersContainer.module.scss';

const PlayersContainer = (props) => {
   const [btnCheck, setBtnCheck] = useState(false);

   const changeCountPlayers = (boolean, id, name, role) => {

      setBtnCheck(!boolean);
      if (btnCheck) {
         props.setCountPlayers(props.countPlayers - 1);
         const newArray = props.teamRosterMembers.filter(el => el.userId !== id);
         console.log(newArray);
         props.setTeamRosterMembers(newArray);
      } else {
         props.setCountPlayers(props.countPlayers + 1);
         const newObj = {};
         newObj.userId = id;
         newObj.nickname = name;
         newObj.role = role;

         const newArray = JSON.parse(JSON.stringify(props.teamRosterMembers));
         newArray.push(newObj);
         props.setTeamRosterMembers(newArray);

      }
   }

   return (
      <div className={s.playersContainer}>
         <div className={s.playerCard}>

            <div className={s.leftContainer}>
               <div className={s.imgContainer}>
                  <img src={props.logo || defaultLogo} alt="logo" />
               </div>
               <div className={s.textContainer}>
                  <div className={s.teamName}>{props.name}</div>
                  <div className={s.subtitle}>{props.title}</div>
               </div>
            </div>

            {props.btn ? <div
               className={btnCheck ? `${s.checkMark} ${s.btn}` : `${s.plus} ${s.btn}`}
               onClick={() => changeCountPlayers(btnCheck, props.id, props.name, props.role)}
            ></div> : <div className={s.plusMini}>+</div>}

         </div>
      </div>
   )
}
export default PlayersContainer;