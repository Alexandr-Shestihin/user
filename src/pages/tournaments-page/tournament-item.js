import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { API, API_ROUTER } from "../../api";

const CommunityItem = ({
  id,
  tournaments,
  uuid,
  description,
  date_end,
  date_start,
  logo,
  name,
  _game,
  title,
  ...game
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
  const start = new Date(date_start);
  const end = new Date(date_end);
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
  const dateEnd = end.getDate();
  const monthNameEnd = months[end.getMonth()];

  return (
    // <div className="list__item">
    <div
      className="event-list__event tournament-list__event"
      style={{
        background: "transparent",
        backgroundColor: "#333333",
        borderColor: "#1C1C1C",
        borderWidth: "2px",
      }}
      key={id}
    >
      <div
        className={
          star === false
            ? "event-list__star-image event-list__star-image--active"
            : "event-list__star-image"
        }
        onClick={() => tongStar()}
      ></div>

      <div className="event__game-image"></div>
      <div
        className="event__name-stage-date"
        onClick={() => goToUrl(`/battleCup/${id}/information`)}
      >
        <h4 className="event__name">{title ? title : "CUP AFRICANA"}</h4>
        <div className="event__decoration"></div>
        <p className="event__stage">{description}</p>
        <p className="event__date">
          {dateEnd} {monthNameEnd}- {dateStart} {monthNameStart}
        </p>
      </div>
    </div>
  );
};

export default CommunityItem;
