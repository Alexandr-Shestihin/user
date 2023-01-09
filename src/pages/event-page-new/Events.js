import React, { useState, useEffect } from "react";
import "./Events.css";
import { API, API_ROUTER } from "../../api";
import { useHistory, useParams } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import azerlogo from "../../assets/images/azkifwhite.png";
import esportlogo from "../../assets/images/esport-logo.png";

import star from "../../assets/svg/Star.svg";
import starGold from "../../assets/svg/StarGold.svg";
import calendar from "../../assets/events/calendar.svg";
import baner from "../../assets/events/banner.jpg";
import cardImage from "../../assets/events/card-image.jpg";
import glass from "../../assets/events/glass.svg";
import point from "../../assets/events/point.svg";
import team from "../../assets/events/team.svg";
import heart from "../../assets/events/heart.svg";
import voronka from "../../assets/events/voronka.svg";
import heartYellow from "../../assets/events/heart--yellow.svg";
import heartBig from "../../assets/events/Heart--white.svg";
import heartWhite from "../../assets/events/Heart--big.svg";
import TournamentItem from "./tournament-item";

import getEventsTournaments from "../../helpers/events/getEventsTournaments";

const Events = () => {
  const [cardLike, changeCardLike] = useState(false);
  const [cardLike2, changeCardLike2] = useState(false);
  const [heartLike, changeHeartLike] = useState(false);
  const [heartCounter, changeHeartCounter] = useState(1588);
  const [event, setEvent] = useState({});
  const [tournaments, setTournaments] = useState();
  const [requestSuccess, setRequestSuccess] = useState(false);
  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    API.request({
      ...API_ROUTER.events.getCurrentEvent,
      pathKeys: {
        eventId: id,
      },
    })
      .then((res) => {
        setEvent(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getEventsTournaments(id)
      .then((res) => {
        setTournaments(res.tournaments);
        setRequestSuccess(true);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(tournaments);
  const tongleCardLike = () => {
    if (cardLike) {
      changeCardLike(false);
    } else {
      changeCardLike(true);
    }
  };

  const tongleCardLike2 = () => {
    if (cardLike2) {
      changeCardLike2(false);
    } else {
      changeCardLike2(true);
    }
  };

  const tongleHeartLike = () => {
    if (heartLike) {
      let some = heartCounter;
      changeHeartCounter(some - 1);
      changeHeartLike(false);
    } else {
      let some = heartCounter;
      changeHeartCounter(some + 1);
      changeHeartLike(true);
    }
  };
  function goToUrl(url) {
    history.push(url);
  }
  const start = new Date(event?.startDate);
  // const end = new Date(endedAt);
  const months = [
    "JAN",
    "FEB",
    "MARC",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEPT",
    "OCT",
    "NOV",
    "DEC",
  ];

  const dateStart = start.getDate();
  const monthNameStart = months[start.getMonth()];
  const YearNameStart = start.getFullYear();
  const fullData = [dateStart, " ", monthNameStart, " ", YearNameStart];
  // const dateEnd = end.getDate();
  // const monthNameEnd = months[end.getMonth()];
  const renderTournaments = (tournaments) => {
    if (!tournaments.length) return <div>no tournaments</div>;

    return (
      // <section className="calendar__event-lists calendar__tournament-lists">
      <article className="calendar__tournament-list">
        <ul className="event-list__events  tournament-list__events">
          {tournaments.map((items) => (
            <TournamentItem {...items} key={items.uuid} />
          ))}
        </ul>
      </article>
      // </section>
    );
  };
  console.log(event);
  return (
    <div className="events">
      <section className="events__banner">
        {/* <img
          className="events__banner-image"
          src={event.logo ? event.logo : baner}
          alt="logo"
          width="90"
          height="90"
        /> */}
      </section>
      <section className="events__title">
        <p className="events__title-life">LIVE</p>
        <h3 className="events__title-name">
          {/* {event?.description ? event?.description : <LinearProgress />} */}
          Europe Esports Championship 2022
        </h3>
        <article className="events__date-and-place">
          <img
            className="events__date-image"
            src={calendar}
            alt="calendar"
            width="23"
            height="31"
          />
          <p className="events__date-text">{fullData ? fullData : ""}</p>
          <img
            className="events__date-image"
            src={point}
            alt=""
            width="17.4"
            height="20"
          />
          <p className="events__date-text">Azerbaijan</p>
        </article>
        <article
          className="events__heart-abs"
          onClick={() => tongleHeartLike()}
        >
          <img
            className="events__heart-abs-image"
            src={heartLike ? heartWhite : heartBig}
            alt=""
            width="27"
            height="24"
          />
          <p className="events__heart-abs-text">{heartCounter}</p>
        </article>
      </section>
      <div className="events__about-wrapper">
        <section className="events__about">
          <h4 className="events__about-title">INFORMATION</h4>
          <p className="events__about-description">
            {event?.description ? event?.description : <LinearProgress />}
          </p>
          <div className="events__about-data">
            <p className="about-data__title">Country:</p>
            <p className="about-data__description">Azerbaijan</p>
          </div>
          <div className="events__about-data">
            {/* <p className="about-data__title">Contact:</p>
            <p className="about-data__description">{event.contact}</p> */}
          </div>
          <h4 className="events__about-title events__about-title--organizer">
            organizer
          </h4>
          <article className="events__organizer">
            <img
              className="organizer__image"
              src={esportlogo}
              alt=""
              width="15%"
              height="15%"
            />
            <img
              className="organizer__image"
              src={azerlogo}
              alt=""
              width="20%"
              height="20%"
            />
            <div className="organizer__card">
              <h5 className="organizer__card-title">Azerbaijan</h5>
              <p className="organizer__card-description">
                {/* Bio : Introduce yourself in a few lines, your hobbits, your
                favorite games, your tournaments won, etc */}
                The first ever Europe Esports Championship, run by the European
                Esports Federation and the Azerbaijan Esports Federation
              </p>
            </div>
          </article>
        </section>
      </div>

      <section className="events_tournaments">
        <h3 className="events__about-title">TOURNAMENTS</h3>
        {/* TODO comment filter */}
        {/* <article className="events_tournaments__search">
          <input
            className="tournaments-search__input"
            type="text"
            placeholder="Search"
          />
          <img
            className="tournaments-search__image"
            src={glass}
            alt="glass"
            width="18.75"
            height="18.75"
          />
          <div className="tournaments-search__image-wrapper">
            <img src={voronka} alt="voronka" width="18.75" height="16.75" />
          </div>
        </article> */}
        <section className="events__cards">
          {/* <article className="events__card">
            <img
              className="events__card-star"
              src={cardLike ? starGold : star}
              alt="star"
              width="20"
              height="19"
              onClick={() => tongleCardLike()}
            />
            <div className="events__card-image">
              <img
                className="events__card-image"
                src={cardImage}
                alt="fon"
                width="60"
                height="60"
              />
            </div>
            <div className="events__card-image">
              <h3 className="card-image__title">CUP 1</h3>
              <p className="card-image__name">Regional Semifinals (online)</p>
              <p className="card-image__time">7 DEC - 8 DEC</p>
            </div>
          </article>
          <article className="events__card">
            <img
              className="events__card-star"
              src={cardLike2 ? starGold : star}
              alt="star"
              width="20"
              height="19"
              onClick={() => tongleCardLike2()}
            />
            <div className="events__card-image">
              <img
                className="events__card-image"
                src={cardImage}
                alt="fon"
                width="60"
                height="60"
              />
            </div>
            <div className="events__card-image">
              <h3 className="card-image__title">CUP 1</h3>
              <p className="card-image__name">Regional Semifinals (online)</p>
              <p className="card-image__time">7 DEC - 8 DEC</p>
            </div>
          </article> */}
          <>
            {requestSuccess ? (
              renderTournaments(tournaments)
            ) : (
              <LinearProgress />
            )}
          </>
        </section>
      </section>
    </div>
  );
};

export default Events;
