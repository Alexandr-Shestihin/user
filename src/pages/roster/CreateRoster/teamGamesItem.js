import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NoImage from "../../../assets/no-image.png";

const TeamGamesItem = ({ id, logo, title }) => {
  const history = useHistory();

  function goToUrl(url) {
    history.push(url);
  }

  return (
    (
      <li className={"games__item-list"} key={id}>
        <img
          className="games__item-list-image"
          src={logo}
          alt={title}
          width="100"
          height="100"
        />
        {title.length > 16 ? (
          <p className="games__item-list-text">{title.slice(0, 16) + "..."}</p>
        ) : (
          <p className="games__item-list-text">{title}</p>
        )}
      </li>
    ),
    {
      /* <div className="team-games__game-items" style={{ marginRight: "30px" }}>
      <img
        className="form-discipline__game-image"
        src={logo || NoImage}
        alt={""}
      />
      {title.length > 16 ? (
        <h3 className="form-discipline__game-title">
          {title.slice(0, 16) + "..."}
        </h3>
      ) : (
        <h3 className="form-discipline__game-title">{title || ""} </h3>
      )}
    </div> */
    }
  );
};

export default TeamGamesItem;
