import React, { useState, useEffect, useRef } from "react";
import s from "./play_off.module.css";

import dataRL from "./data.json";
import dataEmpty from "./data_empty.json";
import dataTaken from "./data_teken.json";
import { useParams } from "react-router-dom";

export default function Play_off(props) {
   let { id } = useParams();
   let data = dataEmpty;
   if (id === '01G3K8V10Y6JDRATQQCVD4QQV1') { // TODO koza
      data = dataRL;
   } else if (id === '01G3K9CM1KKTFTXPVB4F48VYAV') {
      data = dataTaken;
   } else data = dataEmpty;

   const roundsInfoWinner = props.getData(
      data.data.basket[0],
      data.data.tournamentMember
   );
   console.log(roundsInfoWinner.data);
   const roundsInfoLoser = props.getData(
      data.data.basket[1],
      data.data.tournamentMember
   );
   console.log(roundsInfoWinner.data);
   const getData2 = (data) => {
      const copyData = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < copyData.data.basket[2].cols.length; i++) {
         copyData.data.basket[2].cols[i].newRols = [];
         //Создаём новый массив раундов

         copyData.data.basket[2].cols[i].newRols.push(
            ...props.getGroupStageData(
               copyData.data.basket[2].cols[i],
               copyData.data.tournamentMember
            )
         );
         //Формируем новый массив из данных rows и tournamentMember
      }
      return copyData;
   };
   const groupFinal = getData2(data);
   //console.log(groupFinal.data.basket[2].cols[0].newRols);
   console.log(groupFinal.data.basket);

   const getMaxMin = (array, scores) => {
      const value = [];
      array.map((u) => {
         if (u.user) {
            value.push(+u.user.score);
         } else {
            value.push(+u.team.score);
         }
      });
      return scores === Math.max(...value) ? (
         <div className={`${s.playerPont} ${s.playerPont_orange}`}>{+scores}</div>
      ) : (
         <div className={s.playerPont}>{+scores}</div>
      );
   };

   return (
      <div className={s.play_offContainer}>
         <div>
            <div className={s.play_offFlexContainer}>
               {roundsInfoWinner.cols.map((r) => (
                  <div className={s.play_offRoundRow}>
                     <div className={s.roundTitle}>{`${r.name}`}</div>
                     {r.newRols.map((g) =>
                        g.group.length >= 2 ? (
                           <div
                              key={g.id}
                              className={s.teamsBlock}
                              style={r.teamsBlockStyle}
                           >
                              {g.group.map((t) => (
                                 <div key={t.id} className={s.teamBlock}>
                                    <div className={s.matchNumber}>{/* {t.id} */}</div>
                                    {t.turnament.map((u) => (
                                       <div className={s.player}>
                                          <span className={s.playerTitle}>
                                             {u.user?.nickname || u.team?.name}
                                          </span>
                                          {getMaxMin(
                                             t.turnament,
                                             +(String(u.user?.score) || String(u.team?.score))
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div key={g.id} className={s.teamsBlock_forOne}>
                              {g.group.map((t) => (
                                 <div
                                    key={t.id}
                                    className={
                                       t.turnament.length === 1
                                          ? s.teamBlock_forOne
                                          : s.teamBlock
                                    }
                                 >
                                    {t.turnament.length < 2 ? (
                                       false
                                    ) : (
                                       <div className={s.matchNumber}>{/* {t.id} */}</div>
                                    )}
                                    {t.turnament.map((u) => (
                                       <div className={s.player}>
                                          <span className={s.playerTitle}>
                                             {u.user?.nickname || u.team?.name}
                                          </span>
                                          {getMaxMin(
                                             t.turnament,
                                             +(String(u.user?.score) || String(u.team?.score))
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              ))}
                           </div>
                        )
                     )}
                  </div>
               ))}
            </div>

            {data.data.type === "Double" ? (
               <div className={s.play_offFlexContainer}>
                  {roundsInfoLoser.cols.map((r) => (
                     <div className={s.play_offRoundRow}>
                        <div className={s.roundTitle}>{`${r.name}`}</div>
                        {r.newRols.map((g) =>
                           g.group.length >= 2 ? (
                              <div
                                 key={g.id}
                                 className={s.teamsBlock}
                              /* style={r.teamsBlockStyle} */
                              >
                                 {g.group.map((t) => (
                                    <div key={t.id} className={s.teamBlock}>
                                       <div className={s.matchNumber}>{/* {t.id} */}</div>
                                       {t.turnament.map((u) => (
                                          <div className={s.player}>
                                             <span className={s.playerTitle}>
                                                {u.user?.nickname || u.team?.name}
                                             </span>
                                             {getMaxMin(
                                                t.turnament,
                                                +(
                                                   String(u.user?.score) || String(u.team?.score)
                                                )
                                             )}
                                          </div>
                                       ))}
                                    </div>
                                 ))}
                              </div>
                           ) : (
                              <div key={g.id} className={s.teamsBlock_forOne}>
                                 {g.group.map((t) => (
                                    <div
                                       key={t.id}
                                       className={
                                          t.turnament.length === 1
                                             ? s.teamBlock_forOne
                                             : s.teamBlock
                                       }
                                    >
                                       {t.turnament.length < 2 ? (
                                          false
                                       ) : (
                                          <div className={s.matchNumber}>{/* {t.id} */}</div>
                                       )}
                                       {t.turnament.map((u) => (
                                          <div className={s.player}>
                                             <span className={s.playerTitle}>
                                                {u.user?.nickname || u.team?.name}
                                             </span>
                                             {getMaxMin(
                                                t.turnament,
                                                +(
                                                   String(u.user?.score) || String(u.team?.score)
                                                )
                                             )}
                                          </div>
                                       ))}
                                    </div>
                                 ))}
                              </div>
                           )
                        )}
                     </div>
                  ))}
               </div>
            ) : (
               false
            )}
         </div>

         {/* /////////////////Final////////////// */}
         {data.data.type === "Double" ? (
            <div className={s.play_offRoundRow2}>
               <div className={s.roundTitle}>{`${groupFinal.data.basket[2].cols[0].name}`}</div>
               <div className={s.teamBlock2}>
                  <div className={s.matchNumber}></div>
                  {groupFinal.data.basket[2].cols[0].newRols.map((u) => (
                     <div className={s.player}>
                        <span className={s.playerTitle}>{u.user.nickname}</span>
                        <div className={s.playerPont}>
                           {getMaxMin(
                              groupFinal.data.basket[2].cols[0].newRols,
                              +(String(u.user?.score) || String(u.team?.score))
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            false
         )}
      </div>
   );
}
{
   /* {roundsInfo.map(u =>
             <div className={s.play_offRoundRow}>
                <div className={s.roundTitle}>{`Round `}</div>
                <div className={s.teamsBlock}>
                   <div className={s.teamBlock}>
                      <div className={s.matchNumber}>1</div>
                      <div className={s.player}>
                         <span className={s.playerTitle}>Игрок</span>
                         <div className={s.playerPont}>2</div>
                      </div>
                      <div className={s.player}>
                         <span className={s.playerTitle}>Игрок</span>
                         <div className={s.playerPont}>2</div></div>
                   </div>
                   <div className={s.teamBlock}>
                      <div className={s.matchNumber}>2</div>
                      <div className={s.player}>
                         <span className={s.playerTitle}>Игрок</span>
                         <div className={s.playerPont}>2</div>
                      </div>
                      <div className={s.player}>
                         <span className={s.playerTitle}>Игрок</span>
                         <div className={s.playerPont}>2</div></div>
                   </div>
                </div>
 
 
             </div>)} */
}

{
   /* /////////////////Round 2////////////// */
}
{
   /* <div className={s.play_offRoundRow}>
             <div className={s.roundTitle}>Round 2</div>
 
             <div className={`${s.teamsBlock} ${s.roundTwo}`}>
                <div className={s.teamBlock}>
                   <div className={s.matchNumber}>1</div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div>
                   </div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div></div>
                </div>
                <div className={s.teamBlock}>
                   <div className={s.matchNumber}>2</div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div>
                   </div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div></div>
                </div>
             </div>
             <div className={`${s.teamsBlock} ${s.roundTwo}`}>
                <div className={s.teamBlock}>
                   <div className={s.matchNumber}>1</div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div>
                   </div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div></div>
                </div>
                <div className={s.teamBlock}>
                   <div className={s.matchNumber}>2</div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div>
                   </div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div></div>
                </div>
             </div>
          </div> */
}
{
   /* /////////////////Round 3////////////// */
}
{
   /* <div className={s.play_offRoundRow}>
             <div className={s.roundTitle}>Round 3</div>
 
             <div className={`${s.teamsBlock} ${s.roundThree}`}>
                <div className={s.teamBlock}>
                   <div className={s.matchNumber}>1</div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div>
                   </div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div></div>
                </div>
                <div className={s.teamBlock}>
                   <div className={s.matchNumber}>2</div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div>
                   </div>
                   <div className={s.player}>
                      <span className={s.playerTitle}>Игрок</span>
                      <div className={s.playerPont}>2</div></div>
                </div>
             </div>
          </div> */
}

/* 

         <div className={s.play_offRoundRow}>
            <div className={s.roundTitle}>Round 1</div>

            <div className={s.teamsBlock}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>1</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>2</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
            <div className={s.teamsBlock}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>3</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>4</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
            <div className={s.teamsBlock}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>3</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>4</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
            <div className={s.teamsBlock}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>3</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>4</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
         </div>
         
         
         <div className={s.play_offRoundRow}>
            <div className={s.roundTitle}>Round 2</div>

            <div className={`${s.teamsBlock} ${s.roundTwo}`}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>1</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>2</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
            <div className={`${s.teamsBlock} ${s.roundTwo}`}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>1</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>2</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
         </div>


         <div className={s.play_offRoundRow}>
            <div className={s.roundTitle}>Round 3</div>

            <div className={`${s.teamsBlock} ${s.roundThree}`}>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>1</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
               <div className={s.teamBlock}>
                  <div className={s.matchNumber}>2</div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div>
                  </div>
                  <div className={s.player}>
                     <span className={s.playerTitle}>Игрок</span>
                     <div className={s.playerPont}>2</div></div>
               </div>
            </div>
         </div>


         <div className={s.play_offRoundRow}>
            <div className={s.roundTitle}>Final</div>

            <div className={s.teamBlock}>
               <div className={s.matchNumber}>1</div>
               <div className={s.player}>
                  <span className={s.playerTitle}>Игрок</span>
                  <div className={s.playerPont}>2</div>
               </div>
               <div className={s.player}>
                  <span className={s.playerTitle}>Игрок</span>
                  <div className={s.playerPont}>2</div></div>
            </div>
         </div> */

/* const getData = (data) => {
const copyData = JSON.parse(JSON.stringify(data));
//Копируем объект с информацией о турнирной сетке

copyData.data.basket[0].cols[3].newRols = [];
const newRols = []
//Создаём новый массив рундов

copyData.data.basket[0].cols[3].rows.map(u => {
const value = +u.tournamentMemberId - 1;
newRols.push(copyData.data.tournamentMember[value])
});
//Формируем новый массив из данных rows и tournamentMember

const turnament = [];
let group = [];
splitIntoSubarray(2, newRols, turnament, 'turnament');
splitIntoSubarray(2, turnament, group, 'group');
//Разбиваем на подгруппы и турниры (это нужно для отрисокви)

copyData.data.basket[0].cols[3].newRols = group;
console.log(copyData.data.basket[0].cols[3]);
//Присваиваем готовые значения

return copyData
} */
