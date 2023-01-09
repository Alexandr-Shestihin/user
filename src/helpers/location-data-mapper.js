import React from "react";
import ERA from "../assets/images/logo_only.png";
import { isAuthenticated } from "../helpers";

const mapper = {
  "/more": <h3 className="calendar__title">Menu</h3>,
  "/rating": <h3 className="calendar__title">Leaderboard</h3>,
  "/watch": <h3 className="calendar__title">Matches</h3>,
  "/community": <h3 className="calendar__title">My community</h3>,
  "/eventPage": <h3 className="calendar__title">Events</h3>,

  "/battleCup": <h3 className="calendar__title">tournament</h3>,
  "/roster/create": (
    <a>
      <img
        className="search__era-logo"
        src={ERA}
        alt=""
        width="30"
        height="30"
      />
    </a>
  ),
  "/roster/discipline": (
    <a>
      <img
        className="search__era-logo"
        src={ERA}
        alt=""
        width="30"
        height="30"
      />
    </a>
  ),
  "/roster": (
    <a>
      <img
        className="search__era-logo"
        src={ERA}
        alt=""
        width="30"
        height="30"
      />
    </a>
  ),

  "/teams/team/0c509dde-aa97-11ec-8a9e-b261f13bce5d": (
    <a>
      <img
        className="search__era-logo"
        src={ERA}
        alt=""
        width="30"
        height="30"
      />
    </a>
  ),
  // "/id/": (
  //   <a>
  //     <img
  //       className="search__era-logo"
  //       src={ERA}
  //       alt=""
  //       width="30"
  //       height="30"
  //     />
  //   </a>
  // ),

  "/notifications": <input className="search__searching-input" type="text" />,
};

export default mapper;
