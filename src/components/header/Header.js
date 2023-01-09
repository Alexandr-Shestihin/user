import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "../../pages/notifications/Notification.css";
import "../../pages/calendar/Calendar.css";
import ERA from "../../assets/icons/arrow-left.svg";
import Bell from "../../assets/svg/Bell.svg";
import { hideMenu, showMenu } from "../../redux/actions";
import { HIDE_FOR } from "../../config";
import { getUserData, userOnline } from "../../redux/actions";
import Mapper from "../../helpers/location-data-mapper";

const Header = ({ location, userNotifications, userData }) => {
  let history = useHistory();

  const headerFiller =
    location.pathname.split("/")[1] === "battleCup"
      ? Mapper["/battleCup"]
      : Mapper[location.pathname];

  return HIDE_FOR.includes(location.pathname) ? (
    ""
  ) : (
    <section className="notification__search calendar__search">
      <p
        className="notification__search-link calendar__searching-link"
        onClick={history.goBack}
      >
        <img
          className="search__era-logo"
          src={ERA}
          alt=""
          width="25"
          height="25"
        />
      </p>
      {headerFiller}
      {userData?.unreadNotifications ? (
        <a
          className="notification__search-link notification__search-link--bell"
          href="/notifications"
        >
          <img
            className="search__searching-bell"
            src={Bell}
            alt="Bell_orange"
            width="28"
            height="28"
          />
        </a>
      ) : (
        <a className="notification__search-link " href="/notifications">
          <img
            className="search__searching-bell"
            src={Bell}
            alt="Bell_orange"
            width="28"
            height="28"
          />
        </a>
      )}
    </section>
  );
};
const mapStateToProps = (state) => {
  return {
    userNotifications: state.userNotifications,
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
  withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
);
