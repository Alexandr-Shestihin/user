import React, { useEffect, useState } from "react";
import { hideMenu, showMenu } from "../../redux/actions";

import Home from "../../assets/svg/Home Ico.svg";
import Ranking from "../../assets/svg/Ranking_4.svg";
import Calendar from "../../assets/svg/Calendar_without_text_6.svg";
import Watch from "../../assets/svg/Watch_8.svg";
import Burger from "../../assets/svg/More_10.svg";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ROUTER, HIDE_FOR } from "../../config";
import {
  getUserData,
  setUserData,
  userOffline,
  userOnline,
} from "../../redux/actions";
import { isAuthenticated } from "../../helpers";

const MENU_ROUTES = [
  ROUTER.id,
  ROUTER.rating,
  ROUTER.calendar,
  ROUTER.watch,
  ROUTER.more,
];

const Footer = ({ history, location, userData }) => {
  const [currentRoute, setCurrentRoute] = useState();

  useEffect(() => {
    if (MENU_ROUTES.includes(location?.pathname))
      setCurrentRoute(location?.pathname);
  }, [location.pathname]);

  const changeRoute = (route) => {
    history.push(route);
  };

  const setActiveClass = (navItem) =>
    `prefooter__item ${
      currentRoute === navItem ? "prefooter__item-active" : ""
    }`;

  return HIDE_FOR.includes(location.pathname) ? (
    ""
  ) : (
    <ul className="prefooter">
      <li
      // className={setActiveClass(ROUTER.id)}
      >
        <a
          className="prefooter__link"
          style={{ textDecoration: "none" }}
          href={`/id/${userData?.id}`}
        >
          <img className="prefooter__image" src={Home} alt="Home" />
          <div className="prefooter__title">Home</div>
        </a>
      </li>

      <li
      // className={setActiveClass(ROUTER.rating)}
      >
        <div
          className="prefooter__link"
          onClick={() => {
            changeRoute(ROUTER.rating);
          }}
        >
          <img className="prefooter__image" src={Ranking} alt="Ranking" />

          <div className="prefooter__title">Ranking</div>
        </div>
      </li>
      <li
      // className={setActiveClass(ROUTER.calendar)}
      >
        <div
          className="prefooter__link"
          onClick={() => {
            changeRoute("/calendar/events");
          }}
        >
          <img className="prefooter__image" src={Calendar} alt="Calendar" />
          <div className="prefooter__title">Calendar</div>
        </div>
      </li>
      <li
      // className={setActiveClass(ROUTER.watch)}
      >
        <div
          className="prefooter__link"
          onClick={() => {
            changeRoute(ROUTER.watch);
          }}
        >
          <img className="prefooter__image" src={Watch} alt="Watch" />
          <div className="prefooter__title">Watch</div>
        </div>
      </li>
      <li
      // className={setActiveClass(ROUTER.more)}
      >
        <div
          className="prefooter__link"
          onClick={() => {
            changeRoute(ROUTER.more);
          }}
        >
          <img
            className="prefooter__image prefooter__image-small"
            src={Burger}
            alt="Burger"
          />
          <div className="prefooter__title">More</div>
        </div>
      </li>
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    showMenu: state.showMenu,
    userOnline: state.userOnline,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchShowMenu: () => dispatch(showMenu()),
    dispatchHideMenu: () => dispatch(hideMenu()),
    runGetUserData: () => dispatch(getUserData()),
    runUserOnline: () => dispatch(userOnline()),
  };
};

export default injectIntl(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer))
);
