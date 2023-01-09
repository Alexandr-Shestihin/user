import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CommunityItem = ({ id, name, description }) => {
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
  return (
    // <div className="list__item">
    <div
      className="event-list__event tournament-list__event"
      style={{
        background: "transparent",
        backgroundColor: "#333333",
        // backgroundColor: "rgba(255, 255, 255, 0.1)",
        // TODO color + size border +1
        borderColor: "#1C1C1C",
        borderWidth: "3px",
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

      <div
        className="event__game-image"
        onClick={() => goToUrl(`/community/${id}/events`)}
      ></div>
      <div
        className="event__name-stage-date"
        onClick={() => goToUrl(`/community/${id}/events`)}
      >
        <h4 className="event__name">{name ? name : "CUP AFRICANA"}</h4>
        <div className="event__decoration"></div>
        <p className="event__stage">Regional Semifinals (online)</p>
      </div>
    </div>
  );
};

export default CommunityItem;
