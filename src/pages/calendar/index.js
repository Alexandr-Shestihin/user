import React, { useEffect, useState } from "react";
import Filter from "../../assets/svg/Filter_plus.svg";
import "../notifications/Notification.css";
import "./Calendar.css";
import "./MatchSearch.css";
import { FormattedMessage } from "react-intl";
import MatchSearchItem from "./MatchSearchItem";
import CommunityItem from "./community-item";
import TournamentItem from "./tournament-item";
import EventItem from "./event-item";
import { API, API_ROUTER } from "../../api";
import { LinearProgress } from "@material-ui/core";
import {
  Months,
  // Regions,
  // Countries,
  // Games,
  TABS,
  CALENDAR_ROUTES,
} from "./const";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import loadAllTournaments from "../../helpers/userTournaments/loadAllTournaments";

const Calendar = () => {
  let { tab } = useParams();
  let history = useHistory();

  const [tournaments, setTournaments] = useState([]);
  const [communityList, setCommunity] = useState([]);
  const [eventList, setEvents] = useState([]);
  const [loadAllGames, setLoadAllgames] = useState([]);
  const [chosenGame, setChosenGame] = useState();
  const [chosenGameName, setChosenGameName] = useState("select game");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [currentTab, setCurrentTab] = useState(tab);
  const [month, setMonth] = useState();
  const [monthName, setMonthName] = useState("select month");
  const [modalMonthWindow, openMonth] = useState(null);
  const [modalGameWindow, openGame] = useState(null);
  useEffect(() => {
    getData(setEvents, "events", API_ROUTER.events.getEvents);
    getData(setCommunity, "communities", API_ROUTER.community.getCommunityList);
    getData(setLoadAllgames, "games", API_ROUTER.games.getGames);
  }, []);
  function getData(dataSetter, type, api) {
    return API.request({ ...api })
      .then((res) => {
        dataSetter(res[type]);
        setRequestSuccess(true);
      })
      .catch((err) => {
        // toast.error(err?.data && err?.data?.message || `Load of ${type} failed`);
        console.log(err);
      });
  }

  function filter() {
    const urlParams = {
      gameId: chosenGame ? chosenGame : "",
      month: month ? month : "",
    };
    API.request({
      ...API_ROUTER.tournaments.getTournaments,
      urlParams,
    })
      .then((res) => {
        setTournaments(res.tournaments);
      })
      .catch((err) => console.log(err));
  }

  function clearFilter() {
    setChosenGameName("select game");
    setMonthName("select month");
    const urlParams = {
      gameId: "",
      month: "",
    };
    API.request({
      ...API_ROUTER.tournaments.getTournaments,
      urlParams,
    })
      .then((res) => {
        setTournaments(res.tournaments);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    API.request({
      ...API_ROUTER.tournaments.getTournaments,
      urlParams: {
        gameId: chosenGame ? chosenGame : "",
      },
    })
      .then((res) => {
        setTournaments(res.tournaments);
        setRequestSuccess(true);
      })
      .catch((err) => console.log(err));
  }, []);
  const [search, setSearch] = useState("hide");
  const showFilter = () => {
    if (search === "hide") {
      setSearch("show");
    } else {
      setSearch("hide");
    }
  };

  // const [region, setRegion] = useState(Regions[0]["name"]);
  // const [modalRegionWindow, openRegion] = useState(null);

  // const [country, setCountry] = useState(Countries[0]["name"]);
  // const [modalCountryWindow, openCountry] = useState(null);

  // const [game, setGame] = useState(Games[0]["name"]);
  // console.log(Games);

  const tongleMonth = () => {
    if (modalMonthWindow) {
      openMonth(null);
    } else {
      openMonth("Open");
    }
  };
  // const tongleRegion = () => {
  //   if (modalRegionWindow) {
  //     openRegion(null);
  //   } else {
  //     openRegion("Open");
  //   }
  // };
  // const tongleCountry = () => {
  //   if (modalCountryWindow) {
  //     openCountry(null);
  //   } else {
  //     openCountry("Open");
  //   }
  // };
  const tongleGame = () => {
    if (modalGameWindow) {
      openGame(null);
    } else {
      openGame("Open");
    }
  };

  const changeMonth = (name) => {
    setMonth(name);
    openMonth(null);
  };

  const changeMonthName = (name) => {
    setMonthName(name);
    openMonth(null);
  };
  // const changeRegion = (name) => {
  //   setRegion(name);
  //   openRegion(null);
  // };
  // const changeCountry = (name) => {
  //   setCountry(name);
  //   openCountry(null);
  // };
  const changeGame = (name) => {
    setChosenGame(name);
    openGame(null);
  };
  const changeGameName = (name) => {
    setChosenGameName(name);
    openGame(null);
  };

  const renderTournaments = (tournaments) => {
    if (!tournaments.length)
      return <div className="empty-data">no tournaments</div>;
    return (
      <>
        <section className="calendar__event-lists calendar__tournament-lists">
          <article className="calendar__tournament-list">
            <ul className="event-list__events  tournament-list__events">
              {tournaments.map((items) => (
                <TournamentItem {...items} key={items.id} />
              ))}
            </ul>
          </article>
        </section>
      </>
    );
  };
  const renderEvents = (eventList) => {
    if (!eventList.length) return <div className="empty-data">no events</div>;
    return (
      <section className="calendar__event-lists calendar__tournament-lists">
        <article className="calendar__tournament-list">
          <ul className="event-list__events  tournament-list__events">
            {eventList.map((events) => (
              <EventItem {...events} key={events.id} />
            ))}
          </ul>
        </article>
      </section>
    );
  };
  const renderCommunity = (communityList) => {
    if (!communityList.length)
      return <div className="empty-data">no communities</div>;
    return (
      <section className="calendar__event-lists calendar__tournament-lists">
        <article className="calendar__tournament-list">
          <ul className="event-list__events">
            {communityList.map((communities) => (
              <CommunityItem {...communities} key={communities.id} />
            ))}
          </ul>
        </article>
      </section>
    );
  };

  const tabChecker = (tabName) => currentTab === tabName;
  const setTabClassNAme = (tabName) =>
    tabChecker(tabName)
      ? `calendar__title calendar__title--clickable calendar__title--active`
      : `calendar__title calendar__title--clickable`;
  return (
    <div>
      <div className="calendar">
        <section className="calendar__filter">
          <h3
            className={setTabClassNAme(TABS.community)}
            onClick={() => {
              history.push(CALENDAR_ROUTES.community);
              setCurrentTab(TABS.community);
            }}
          >
            Community
          </h3>
          <h3
            className={setTabClassNAme(TABS.events)}
            onClick={() => {
              history.push(CALENDAR_ROUTES.events);
              setCurrentTab(TABS.events);
            }}
          >
            <FormattedMessage id="calendar.events" />
          </h3>
          <h3
            className={setTabClassNAme(TABS.tournaments)}
            onClick={() => {
              history.push(CALENDAR_ROUTES.tournaments);
              setCurrentTab(TABS.tournaments);
            }}
          >
            <FormattedMessage id="calendar.tournaments" />
          </h3>

          <a className="calendar__filter-icon" onClick={() => showFilter()}>
            <img
              className="search__searching-bell"
              src={Filter}
              alt="Bell_orange"
              width="28"
              height="28"
            />
          </a>
        </section>
        {search === "show" && (
          <>
            <div className="tournaments__strike-decoration"></div>
            <div className="match-search__search-tournaments-form">
              <MatchSearchItem
                title={<FormattedMessage id="calendar.filter.month" />}
                id="match-search__month"
                value={monthName}
                name="match-search__name-month"
                onClickFunction={() => tongleMonth()}
                modalWindow={modalMonthWindow}
                ConstDataArr={Months}
                changeFunction={changeMonth}
                changeName={changeMonthName}
              />
              {/* <MatchSearchItem
                title={<FormattedMessage id="calendar.filter.region" />}
                id="match-search__region"
                value={region}
                name="match-search__name-region"
                onClickFunction={() => tongleRegion()}
                modalWindow={modalRegionWindow}
                ConstDataArr={Regions}
                changeFunction={changeRegion}
              /> */}
              {/* <MatchSearchItem
                title={<FormattedMessage id="calendar.filter.country" />}
                id="match-search__country"
                value={country}
                name="match-search__name-country"
                onClickFunction={() => tongleCountry()}
                modalWindow={modalCountryWindow}
                ConstDataArr={Countries}
                changeFunction={changeCountry}
              /> */}
              <MatchSearchItem
                title={<FormattedMessage id="calendar.filter.game" />}
                id="match-search__game"
                value={chosenGameName}
                name="match-search__name-game"
                onClickFunction={() => tongleGame()}
                modalWindow={modalGameWindow}
                ConstDataArr={loadAllGames}
                changeFunction={changeGame}
                changeName={changeGameName}
              />
              <div className="search-tournaments-form__submit-wrapper">
                <button
                  className="search-tournaments-form__submit"
                  onClick={() => filter()}
                >
                  Apply filters
                </button>
                <button
                  className="search-tournaments-form__submit"
                  style={{ color: "#d74527" }}
                  onClick={() => clearFilter()}
                >
                  Clear filters
                </button>
              </div>
            </div>
          </>
        )}
        {tabChecker(TABS.community) && (
          <>
            {requestSuccess ? (
              renderCommunity(communityList)
            ) : (
              <LinearProgress />
            )}
          </>
        )}
        {tabChecker(TABS.events) && (
          <>{requestSuccess ? renderEvents(eventList) : <LinearProgress />}</>
        )}
        {tabChecker(TABS.tournaments) && (
          <>
            {requestSuccess ? (
              renderTournaments(tournaments)
            ) : (
              <LinearProgress />
            )}
          </>
        )}
        {tab === undefined ? (
          <>{requestSuccess ? renderEvents(eventList) : <LinearProgress />}</>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Calendar;
