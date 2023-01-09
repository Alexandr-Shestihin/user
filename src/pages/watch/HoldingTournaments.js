import React, { useState, useEffect } from "react";
import "./Notification.css";
import "./HoldingTournaments.css";
import HoldingTournamentsItem from "./HoldingTournamentsItem";
import pubg from "../../assets/images/pubg-small.jpg";
import calendar from "../../assets/icons/Calendar-watch.svg";
import LeftSideswitch from "../../assets/icons/LeftSideswitch.svg";
import RightSideswitch from "../../assets/icons/RightSideswitch.svg";
import star from "../../assets/svg/Star.svg";
import atk from "../../assets/images/atk.png";
import sinster from "../../assets/images/sinster.png";
import bravdo from "../../assets/images/bravdo.png";
import energy from "../../assets/images/energy.png";
import solo from "../../assets/images/solo.png";
import gaming from "../../assets/images/gaming.png";
import Switch from "../../components/switch";
import getAllMatches from "../../helpers/watch/getAllMatches";
import { LinearProgress } from "@material-ui/core";
import { toast } from "react-toastify";
import { API, API_ROUTER } from "../../api";

const WeekCalendar = [
  {
    id: 0,
    day: "Mon",
    date: 3,
    active: false,
  },
  {
    id: 1,
    day: "Tue",
    date: 4,
    active: false,
  },
  {
    id: 2,
    day: "Wed",
    date: 5,
    active: true,
  },
  {
    id: 3,
    day: "Thu",
    date: 6,
    active: false,
  },
  {
    id: 4,
    day: "Fri",
    date: 7,
    active: false,
  },
  {
    id: 5,
    day: "Sat",
    date: 8,
    active: false,
  },
  {
    id: 6,
    day: "Sun",
    date: 9,
    active: false,
  },
];

const Tournaments = [
  {
    id: 0,
    gameStatus: "soon",
    star: true,
    teamImage1: atk,
    teamImage2: sinster,
    teamName1: "ATK",
    teamName2: "Sinister5",
    score: "none",
    time: "1:00 AM",
    date: "Wed 5/01",
    gameLink: "/match-disscusion",
    watchLink: "/teams/team",
    statisticsLink: "/teams/team",
  },
  {
    id: 1,
    gameStatus: "live",
    star: false,
    teamImage1: bravdo,
    teamImage2: energy,
    teamName1: "Bravado Gaming",
    teamName2: "Energy Esports",
    score: "2 - 2",
    time: "1:00 AM",
    date: "Wed 5/01",
    gameLink: "/match-disscusion",
    watchLink: "/teams/team",
    statisticsLink: "/teams/team",
  },
  {
    id: 2,
    gameStatus: "end",
    star: false,
    teamImage1: solo,
    teamImage2: gaming,
    teamName1: "Solo Esports",
    teamName2: "NYOS Gaming",
    score: "4 - 1",
    time: "1:00 AM",
    date: "Wed 5/01",
    gameLink: "/match-disscusion",
    watchLink: "/teams/team",
    statisticsLink: "/teams/team",
  },
];

const HoldingTournaments = (props) => {
  const [resultsTongler, changeVisibility] = useState(null);
  const [matches, setMatches] = useState();
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("");
  console.log(currentFilter);

  useEffect(() => {
    getMatches(currentFilter);
  }, [currentFilter]);
  useEffect(() => {
    getMatches(currentFilter);
  }, []);

  console.log(matches);

  function getMatches(currentFilter) {
    const urlParams = {
      state: currentFilter,
    };
    API.request({
      ...API_ROUTER.watch.getAllMatches,
      urlParams,
    })
      .then((res) => {
        setMatches(res.matches);
        setRequestSuccess(true);
      })
      .catch((err) => console.log(err));
  }

  const exchangeVisibility = () => {
    if (resultsTongler !== null) {
      changeVisibility(null);
    } else {
      changeVisibility("Open");
    }
  };
  const [active, tongleActive] = useState("false");
  const tongActive = (id) => {
    tongleActive(id);
  };

  return (
    <div>
      <div className="holding-tournaments__wrapper">
        <form>
          {/* TODO comment filter watch */}
          {/* <section className="holding-tournaments__calendar">
            <h3 className="calendar__title holding-tournaments__calendar-title">
              JANVIER 2022
            </h3>
            <img
              src={calendar}
              alt="Calendar"
              className="holding-tournaments__calendar-image"
              width="20"
              height="22"
            />
            <ul className="holding-tournaments__calendar-week">
              {WeekCalendar.map((day) => (
                <li
                  onClick={() => tongActive(day.id)}
                  className={
                    active === day.id
                      ? "holding-tournaments__calendar-day-of-week holding-tournaments__calendar-day-of-week--active"
                      : "holding-tournaments__calendar-day-of-week"
                  }
                  key={day.id}
                >
                  <p className="calendar-day-of-week__day-name">{day.day}</p>
                  <p className="calendar-day-of-week__day-number">{day.date}</p>
                </li>
              ))}
            </ul>
          </section> */}
          {/* <section className="holding-tournaments__hide-results">
            <input
              className="holding-tournaments__hide-results-input"
              type="text"
              value={
                resultsTongler !== null ? "see results" : "dont't see results"
              }
              name="result-visiability"
            />
            <p className="hide-results__description">
              {resultsTongler !== null
                ? "Hide the results of completed matches"
                : "Open the results of completed matches"}
            </p>
            <div
              className="hide-results__image"
              onClick={() => exchangeVisibility()}
            >
              <Switch />
            </div>
          </section> */}
          <section className="holding-tournaments__filters">
            <input
              className="holding-tournaments__filter"
              type="radio"
              name="holding-tournaments-filter"
              id="tournaments-filter-1"
              value="all"
              defaultChecked
              // onClick={() => filter()}
              onChange={(e) => {
                setCurrentFilter(" ");
              }}
            />
            <label
              className="holding-tournaments__filter-label"
              htmlFor="tournaments-filter-1"
            >
              All
            </label>
            {/* <input
              className="holding-tournaments__filter"
              type="radio"
              name="holding-tournaments-filter"
              id="tournaments-filter-2"
              value="star"
            />
            <label
              className="holding-tournaments__filter-label"
              htmlFor="tournaments-filter-2"
            >
              <img src={star} alt="Star" width="10" height="10" />
            </label> */}
            <input
              className="holding-tournaments__filter"
              type="radio"
              name="holding-tournaments-filter"
              id="tournaments-filter-3"
              value="live"
              onChange={(e) => {
                setCurrentFilter(e.target.value);
              }}
            />
            <label
              className="holding-tournaments__filter-label"
              htmlFor="tournaments-filter-3"
            >
              Live
            </label>
            <input
              className="holding-tournaments__filter"
              type="radio"
              name="holding-tournaments-filter"
              id="tournaments-filter-4"
              value="soon"
              onChange={(e) => {
                setCurrentFilter(e.target.value);
              }}
            />
            <label
              className="holding-tournaments__filter-label"
              htmlFor="tournaments-filter-4"
            >
              Soon
            </label>
            <input
              className="holding-tournaments__filter"
              type="radio"
              name="holding-tournaments-filter"
              id="tournaments-filter-5"
              value="ended"
              onChange={(e) => {
                setCurrentFilter(e.target.value);
              }}
            />
            <label
              className="holding-tournaments__filter-label"
              htmlFor="tournaments-filter-5"
            >
              Ended
            </label>
          </section>
        </form>
        <>
          {requestSuccess ? (
            matches?.map((el) => (
              <HoldingTournamentsItem
                key={el.matchId}
                tournamentLogo={el.tournament.logo}
                tournamentName={el.tournament.name}
                nameGame={el.game.name}
                gameLogo={el.game.logo}
                tournamentMember1={el.tournamentMember1 || 0}
                tournamentMember2={el.tournamentMember2 || 0}
                tournamentMemberScore1={el.tournamentMemberScore1}
                tournamentMemberScore2={el.tournamentMemberScore2}
                games={el.games}
                groupsName={el.round.name}
                startedAt={el.startedAt}
                matchId={el.matchId}
                status={el.status}
              />
            ))
          ) : (
            <LinearProgress />
          )}
        </>

        {/*<div className="match-search__end-message holding-tournaments__end-message"> */}
        <p className="end-message__text">NO MORE MATCH</p>
        {/* </div> */}
      </div>
    </div>
  );
};

export default HoldingTournaments;
