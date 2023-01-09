import React from "react";
import CupTab from "../cup-tab/CupTab";
import s from "./CupBracket.module.css";

import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Group_stage from "./bracketTabs/group_stage-component/group_stage";
import Preliminary_tournament from "./bracketTabs/preliminary_tournament-component/preliminary_tournament";
import Play_off from "./bracketTabs/play_off-component/play_off";

export default function CupBracket(props) {
  // console.log(props.tournament?.stages?.type, "pops");
  let { id } = useParams();
  console.log(id);
  const nav__list = [
    // {
    //   id: uuidv4(),
    //   title: "PRELIMINARY TOURNAMENT",
    //   to: `/battleCup/${id}/bracket/preliminary_tournament`,
    // },
    {
      id: uuidv4(),
      title: "GROUP STAGE",
      to: `/battleCup/${id}/bracket/group_stage`,
    },
    {
      id: uuidv4(),
      title: "PLAY OFF",
      to: `/battleCup/${id}/bracket/play_off`,
    },
  ];

  const { pathname } = useLocation();
  const selectTab = (fn1, fn2) => {
    // if (pathname === `/battleCup/${id}/bracket/preliminary_tournament`) {
    //   return <Preliminary_tournament />;
    // } else
    if (pathname === `/battleCup/${id}/bracket/group_stage`) {
      return <Group_stage {...props} getGroupStageData={fn2} />;
    } else if (pathname === `/battleCup/${id}/bracket/play_off`) {
      return <Play_off getData={fn1} getGroupStageData={fn2} />;
    }
  };
  const splitIntoSubarray = (size, currentArray, newArray, name) => {
    for (let i = 0; i < Math.ceil(currentArray.length / size); i++) {
      newArray.push({
        [name]: currentArray.slice(i * size, i * size + size),
        id: i + 1,
      });
    }
    return newArray;
  };
  const makeNewArrayFromRowsTournamentMember = (
    rowsArray,
    tournamentMemberArray
  ) => {
    const newTournamentMemberArray = JSON.parse(
      JSON.stringify(tournamentMemberArray)
    );
    const newRols = [];

    rowsArray.rows.map((u) => {
      const value = +u.tournamentMemberId - 1;
      if (newTournamentMemberArray[value].user) {
        newTournamentMemberArray[value].user.score = u.score;
        newTournamentMemberArray[value].user.number = u.position;
      } else {
        newTournamentMemberArray[value].team.score = u.score;
        newTournamentMemberArray[value].team.number = u.score;
      }

      newRols.push(newTournamentMemberArray[value]);
    });
    return newRols;
  };

  const getData = (data, tournamentMember) => {
    const copyData = JSON.parse(JSON.stringify(data));
    //Копируем объект с информацией о турнирной сетке

    for (let i = 0; i < copyData.cols.length; i++) {
      copyData.cols[i].newRols = [];
      const newRols = [];
      //Создаём новый массив раундов

      let height = 200;
      if (i > 0 && copyData.cols[i].rows.length > 0) {
        height = parseInt(copyData.cols[i - 1].teamsBlockStyle.height) * 1.64;
      }
      copyData.cols[i].teamsBlockStyle = {
        height: `${height}px`,
      };
      //Рассчитываем высоту teamsBlock

      newRols.push(
        ...makeNewArrayFromRowsTournamentMember(
          copyData.cols[i],
          tournamentMember
        )
      );
      //Формируем новый массив из данных rows и tournamentMember

      const turnament = [];
      let group = [];
      splitIntoSubarray(2, newRols, turnament, "turnament");
      splitIntoSubarray(2, turnament, group, "group");
      //Разбиваем на подгруппы и турниры (это нужно для отрисокви)

      copyData.cols[i].newRols = group;
      /* console.log(copyData.cols[i]); */
      //Присваиваем готовые значения
    }
    return copyData;
  };

  return (
    <div className={s.bracket}>
      <CupTab nav__list={nav__list} />
      {selectTab(getData, makeNewArrayFromRowsTournamentMember)}
    </div>
  );
}
