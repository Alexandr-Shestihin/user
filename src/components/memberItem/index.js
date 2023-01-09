import React, { useState } from "react";
import { API, API_ROUTER } from "../../api";
import s from './memberItem.module.scss';
import defaultAvatar from '../../assets/avatars/avatar.jpg';
import loupe from '../../assets/icons/search.svg';
import deleteIcon from '../../assets/icons/delete.png';
import { useHistory } from "react-router-dom";

const MemberItem = (props) => {

   const history = useHistory();

   const [activeMenu, setActiveMenu] = useState(false);


   const changePage = () => {
      history.push(`/id/${props.id}`)
   }

   const deleteTeamMember = (teamId, userId) => {
      API.request({
         ...API_ROUTER.teams.delUser,
         pathKeys: {
            teamId: teamId,
            userId: userId,
         },
      })
         .then((res) => {
            props.getMembers(props.teamId)
         })
         .catch((err) => console.log(err));
   }

   return (
      <>
         <div className={s.playerContainer}>
            {activeMenu && <div className={s.contextMenuContainer}>
               <div className={s.imgContainer} onClick={changePage}>
                  <img src={loupe} alt="loupe" />
               </div>
               {props.ownerTeam && <div className={s.imgContainer} onClick={() => deleteTeamMember(props.teamId, props.id)} >
                  <img src={deleteIcon} alt="loupe" />
               </div>}
            </div>}
            <div className={s.userContainer} onClick={() => setActiveMenu(!activeMenu)}>
               <div className={s.imgContainer}>
                  <img src={props.avatar || defaultAvatar} alt="avatar" />
               </div>
               <div className={s.titleName}>{props.nickname}</div>
            </div>
         </div>
      </>
   )
}
export default MemberItem;