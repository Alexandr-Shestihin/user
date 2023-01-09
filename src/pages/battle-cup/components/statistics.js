import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import flagAzerbaijan from "../../../assets/images/flags/azerbaijan.png";
import flagHungary from "../../../assets/images/flags/Hungary.png";
import flagLuxembourg from "../../../assets/images/flags/Luxembourg.png";
import flagMonaco from "../../../assets/images/flags/Monaco.png";
import flagNetherlands from "../../../assets/images/flags/Netherlands.png";
import flagSlovakia from "../../../assets/images/flags/Slovakia.png";
import flagSpain from "../../../assets/images/flags/Spain.png";
import flagSweden from "../../../assets/images/flags/Sweden1.png";
import flagTurkiye from "../../../assets/images/flags/Turkey.png";
import flagWales from "../../../assets/images/flags/Wales.png";
import rocketLeagueStatistic from "./rocket-league-2022-statistic.json";
import tekkenStatistic from "./tekken-2022-statistic.json";
import { useParams } from "react-router-dom";
import { API, API_ROUTER } from "../../../api";

const FlagMe =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/me.svg";
const FlagMt =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/mt.svg";
const FlagMk =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/mk.svg";
const FlagPl =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/pl.svg";
const FlagIt =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/it.svg";
const FlagGe =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/ge.svg";
const FlagIl =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/il.svg";
const FlagFr =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/fr.svg";
const FlagRs =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/rs.svg";
const FlagSk =
  "https://pwiszedma-com.s3.eu-central-1.amazonaws.com/assets/flag/4x3/sk.svg";

const flagMap = new Map([
  ["Netherlands", flagNetherlands],
  ["Sweden", flagSweden],
  ["Spain", flagSpain],
  ["Turkey", flagTurkiye],
  ["Slovakia", FlagSk],
  ["Hungary", flagHungary],
  ["Wales", flagWales],
  ["Luxembourg", flagLuxembourg],
  ["Azerbaijan", flagAzerbaijan],
  ["Monaco", flagMonaco],
  ["Flow", flagHungary],
  ["Why", FlagPl],
  ["Mitrust-Storm", FlagIt],
  ["duelist17", FlagGe],
  ["Mr_Expandable", FlagIl],
  ["The Emperor", flagSweden],
  ["Kuroten", FlagFr],
  ["Oracle_99", flagSpain],
  ["The Alpha and the Omega", FlagRs],
  ["RealMG", flagMonaco],
  ["Riyukan", FlagMt],
  ["Rogue_Identity", FlagMk],
  ["Falcon", flagAzerbaijan],
  ["Leather Warlord", FlagMe],
  ["JEvs", flagWales],
  ["Kicking Machine", flagTurkiye],
  ["EpicFail8221", FlagSk],
]);

const LeaderBoard = () => {
  let { id } = useParams();

  const [participants, setParticipants] = useState();

  useEffect(() => {
    API.request({
      ...API_ROUTER.tournaments.getTournamentMembers,
      pathKeys: {
        tournamentId: id,
      },
    })
      .then((res) => {
        setParticipants(res.members);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(participants);
  let dataPlug = [];
  if (id === "01G3K9CM1KKTFTXPVB4F48VYAV") {
    dataPlug = tekkenStatistic;
  } else if (id === "01G3K8V10Y6JDRATQQCVD4QQV1") {
    dataPlug = rocketLeagueStatistic;
  }

  let sortArr = dataPlug.sort((a, b) => b.pts - a.pts);
  return participants && !rocketLeagueStatistic && !tekkenStatistic ? (
    <div style={{ paddingTop: 10 }}>
      <section className="leaderbord">
        <ul className="leaderbord__result-list">
          <li className="leaderbord__result-list-item leaderbord__result-list-item--header">
            <p className="leaderbord__result-team">Team</p>
            <p className="leaderbord__result-win">V</p>
            <p className="leaderbord__result-lose">D</p>
            <p className="leaderbord__result-percent">%</p>
            <p className="leaderbord__result-infos-link">infos</p>
          </li>
          {participants?.map((el) => (
            <li
              className={
                participants.indexOf(el) % 2 === 0
                  ? "leaderbord__result-list-item leaderbord__result-list-item--also-gray"
                  : "leaderbord__result-list-item leaderbord__result-list-item--gray"
              }
            >
              <p
                className={
                  participants.indexOf(el) === 0
                    ? "leaderbord__result-place id-first"
                    : participants.indexOf(el) === 1
                    ? "leaderbord__result-place id-second"
                    : participants.indexOf(el) === 2
                    ? "leaderbord__result-place id-third"
                    : "leaderbord__result-place"
                }
              >
                {participants.indexOf(el) + 1}
              </p>
              {el.user ? (
                <p className="leaderbord__result-emblem">
                  <img
                    src={el.user.avatar ? el.user.avatar : "-"}
                    alt={el.tag}
                    width="35"
                    height="28"
                  />
                </p>
              ) : (
                <p className="leaderbord__result-emblem">
                  <img
                    src={el.team.logo ? el.team.logo : "-"}
                    alt={el.tag}
                    width="35"
                    height="28"
                  />
                </p>
              )}
              {el.user ? (
                <p className="leaderbord__result-tag">{el.user.nickname}</p>
              ) : (
                <p className="leaderbord__result-tag">{el.team.name}</p>
              )}

              <p className="leaderbord__result-win">{/* {el.win} */} -</p>
              <p className="leaderbord__result-lose">{/* {el.lose} */} -</p>
              <p className="leaderbord__result-percent">
                {/* {(el.win / (el.win + el.lose)).toFixed(2)} */} -
              </p>
              <p className="leaderbord__result-infos-link">
                {/* {el.infosLink} */} -
              </p>
              {/*<a*/}
              {/*  href={el.infosLink}*/}
              {/*  className="leaderbord__result-infos-link"*/}
              {/*>*/}
              {/*  Infos ...*/}
              {/*</a>*/}
            </li>
          ))}
        </ul>
      </section>
    </div>
  ) : (
    <div style={{ paddingTop: 10 }}>
      <section className="leaderbord">
        <ul className="leaderbord__result-list">
          <li className="leaderbord__result-list-item leaderbord__result-list-item--header">
            <p className="leaderbord__result-team">Team</p>
            <p className="leaderbord__result-win">V</p>
            <p className="leaderbord__result-lose">D</p>
            <p className="leaderbord__result-percent">%</p>
            <p className="leaderbord__result-infos-link">infos</p>
          </li>
          {sortArr.map((el) => (
            <li
              className={
                sortArr.indexOf(el) % 2 === 0
                  ? "leaderbord__result-list-item leaderbord__result-list-item--also-gray"
                  : "leaderbord__result-list-item leaderbord__result-list-item--gray"
              }
            >
              <p
                className={
                  sortArr.indexOf(el) === 0
                    ? "leaderbord__result-place id-first"
                    : sortArr.indexOf(el) === 1
                    ? "leaderbord__result-place id-second"
                    : sortArr.indexOf(el) === 2
                    ? "leaderbord__result-place id-third"
                    : "leaderbord__result-place"
                }
              >
                {sortArr.indexOf(el) + 1}
              </p>
              <p className="leaderbord__result-emblem">
                <img
                  src={flagMap.get(el.tag)}
                  alt={el.tag}
                  width="35"
                  height="28"
                />
              </p>

              <p className="leaderbord__result-tag">{el.tag}</p>

              <p className="leaderbord__result-win">{el.win} </p>
              <p className="leaderbord__result-lose">{el.lose} </p>
              <p className="leaderbord__result-percent">
                {(el.win / (el.win + el.lose)).toFixed(2)}
              </p>
              <p className="leaderbord__result-infos-link">
                {/* {el.infosLink} */} -
              </p>
              {/*<a*/}
              {/*  href={el.infosLink}*/}
              {/*  className="leaderbord__result-infos-link"*/}
              {/*>*/}
              {/*  Infos ...*/}
              {/*</a>*/}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LeaderBoard;
