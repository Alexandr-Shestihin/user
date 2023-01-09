import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import star from "../../assets/svg/Star.svg";
import starGold from "../../assets/svg/StarGold.svg";
import cardImage from "../../assets/events/card-image.jpg";
import { convertDate } from "../../helpers/dates-formatter";

const TournamentItem = ({
  id,
  media,
  name,
  participantLimit,
  participationType,
  registrationEndedAt,
  registrationStartedAt,
  activeAt,
  slug,
  status,
}) => {
  const history = useHistory();

  // method
  function goToUrl(url) {
    history.push(url);
  }

  const [star, tongleStar] = useState("false");
  const tongStar = () => {
    if (star) {
      tongleStar(false);
    } else tongleStar(true);
  };

  const addToUserTournaments = (id) => {
    /*tournaments.map(el => {
      if (el.id === id) {

      }
    })*/
    console.log(name);
  };

  const start = new Date(registrationStartedAt);
  const end = new Date(registrationEndedAt);
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
  const startFullDate = [dateStart, " ", monthNameStart, " ", YearNameStart];
  return (
    <article className="events__card">
      <div
        className={
          star === false
            ? "event-list__star-image event-list__star-image--active"
            : "event-list__star-image"
        }
        onClick={() => tongStar()}
      ></div>

      <div
        className="event__game-image"
        onClick={() => goToUrl(`/battleCup/${id}/information`)}
        style={
          media.logo
            ? {
                backgroundImage: `url(${media.logo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {
                backgroundImage: `url(${media.logo})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              } // TODO check game logo in _game.url
        }
      ></div>
      <div
        className="event__name-stage-date"
        onClick={() => goToUrl(`/battleCup/${id}/information`)}
      >
        {/* TODO change default name: disciplineName+"Tournament" */}
        <h4 className="event__name">{name ? name : name}</h4>
        <div className="event__decoration"></div>
        {/*<p className="event__stage">{description}</p>*/}
        <p className="event__date">{convertDate(activeAt)}</p>
      </div>
    </article>
  );
};
export default TournamentItem;
