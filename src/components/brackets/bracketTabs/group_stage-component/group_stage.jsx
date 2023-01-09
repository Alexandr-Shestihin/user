import React, { useState, useEffect } from "react";
import s from "./group_stage.module.css";
import { API, API_ROUTER } from "../../../../api";
import NoImage from "../../../../assets/no-image.png";

import { groups, newGroups } from "./const";

export default function GroupStage(props) {
   let stageId = props.tournament?.stages[0].id;

   const [koza, setKoza] = useState(newGroups.data);

   useEffect(() => {
      API.request({
         ...API_ROUTER.Koza.getKoza,
         pathKeys: {
            stageId: stageId,
         },
      })
         .then((res) => {
            res.basket[0].cols.length == 0 ? setKoza(newGroups.data) : setKoza(res);
            console.log(res)
         })
         .catch((err) => console.log(err));
   }, [stageId]);
   /* console.log(koza);
   console.log(props.tournament?.participationType); */
   const mapMembers = new Map();
   if (koza !== undefined && koza.tournamentMember !== undefined) {
      koza.tournamentMember.forEach((value) => {
         mapMembers.set(value.id, value.user ? value.user : value.team);
      });
   }

   const getAvatar = (member) => {
      const mappedMember = mapMembers.get(member.tournamentMemberId);
      // Должно работать и для team.logo
      // mappedMember.avatar === undefined ? team.logo
      if (props.tournament?.participationType === "team") {
         return (
            <div className={s.teamImage}>
               <img
                  className={s.image}
                  src={mappedMember.logo ? mappedMember.logo : NoImage}
               />
            </div>
         );
      } else if (props.tournament?.participationType === "user") {
         return (
            <div className={s.teamImage}>
               <img
                  className={s.image}
                  src={mappedMember.avatar ? mappedMember.avatar : NoImage}
               />
            </div>
         );
      }
   };

   const getName = (member) => {
      const mappedMember = mapMembers.get(member.tournamentMemberId);
      // Должно работать и для team.name
      // mappedMember.nickname === undefined ? team.name
      // props.tournament.participationType
      if (props.tournament?.participationType === "team") {
         return <div>{mappedMember.name ? mappedMember.name : ""}</div>;
      } else if (props.tournament?.participationType === "user") {
         return <div>{mappedMember.nickname ? mappedMember.nickname : ""}</div>;
      }
   };
   const getScore = (member) => {
      const mappedMember = mapMembers.get(member.tournamentMemberId);
      // Должно работать и для team.name
      // mappedMember.nickname === undefined ? team.name
      // props.tournament.participationType
      if (props.tournament?.participationType === "team") {
         return <div>{mappedMember.name ? mappedMember.nickname : ""}</div>;
      } else if (props.tournament?.participationType === "user") {
         return <div>{mappedMember.nickname ? mappedMember.nickname : ""}</div>;
      }
   };

   return (
      <div className={s.flexContainer}>
         {koza.basket.map((data, basketIndex) => (
            <div className={s.flex} key={basketIndex}>
               {data.cols.map((round, index) => (
                  <div key={index} className={s.groupBlock}>
                     <div className={s.title}>{round.name}</div>
                     <div className={s.tHeaderContainer}>
                        <div className={s.tHeaderRowContainer}>
                           <div className={`${s.number} ${s.itemHeader}`}>№</div>
                           {props.tournament?.participationType === "team" ? (
                              <div className={`${s.team} ${s.itemHeader}`}>TEAM </div>
                           ) : (
                              <div className={`${s.team} ${s.itemHeader}`}>USER </div>
                           )}

                           <div className={`${s.status} ${s.itemHeader}`}></div>
                           {/*  <div className={`${s.matches} ${s.itemHeader}`}>CM</div> */}
                           <div className={`${s.points} ${s.itemHeader}`}>POINTS</div>
                        </div>
                     </div>
                     {round.rows.map((member, memberIndex) => (
                        <div key={member.position} className={s.tBodyContainer}>
                           <div className={s.tBodyRowContainer}>
                              <div className={`${s.number} ${s.itemBody}`}>
                                 {memberIndex + 1}
                              </div>
                              <div className={`${s.team} ${s.itemBody}`}>
                                 {getAvatar(member)}
                              </div>
                              <div
                                 className={`${s.status} ${s.itemBody}`}
                                 style={{ fontSize: "12px" }}
                              >
                                 {getName(member)}
                              </div>
                              {/* <div className={`${s.matches} ${s.itemBody}`}>{e.matches}</div> */}
                              <div className={`${s.points} ${s.itemBody}`}>
                                 {member.score ? member.score : "-"}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         ))}
      </div>
   );
}
