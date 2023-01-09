import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const EventItem = ({ id, name, logo, description, startedAt, endedAt }) => {
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
  const start = new Date(startedAt);
  const end = new Date(endedAt);
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
    const dateEnd = end.getDate();
    const monthNameEnd = months[end.getMonth()];
    const YearNameEnd = end.getFullYear();
    const endFullDate = [dateEnd, " ", monthNameEnd, " ", YearNameEnd];
  return (
    <li className="event-list__event tournament-list__event"
        style={{
          background: "transparent",
          backgroundColor: "#018549",
          borderColor: "#1C1C1C",
          borderWidth: "2px",
        }} key={id}>
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
          style={
            logo
                ? {
                  backgroundImage: `url(${logo})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
                : {
                  backgroundImage: `url(${logo})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
          }
      ></div>
      <div className="event__name-stage-date"
          onClick={() => goToUrl(`/eventPage/${id}`)}>

          <h4 className="event__name">{name ? name : name}</h4>
          {/*<p className="event__prize">$7,000 • 2500 Players</p>*/}
          <br></br>
          <p className="event__date">
            {/*{" "}*/}
             {startFullDate} - {endFullDate}
          </p>
        </div>

    </li>
  );
};

export default EventItem;
