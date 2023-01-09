import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvitMessage from "../../components/invit-message";
import profLogo from "../../assets/images/bg.png";

import Profile from "../../assets/svg/ProfLogo.svg";
// import PhotoIcon from "../../assets/svg/Photo_.svg";
import "./more.css";
import { API, API_ROUTER } from "../../api";
import store from "../../redux/store";
import {
  getUserData,
  setUserData,
  userOffline,
  userOnline,
} from "../../redux/actions";
import { ROUTER } from "../../config";
import { FormattedMessage, injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import arrow from "../../assets/icons/downarrow.svg";

import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BurgerOpenList = ({ history, match, userData }) => {
   const [showList, setShowList] = useState(false);

  const [teams, setTeams] = useState([]);
  const [teamInvites, setTeamInvites] = useState([]);

  const logOut = (e) => {
    e.preventDefault();

    const params = {
      ...API_ROUTER.auth.logOut,
    };

      API.request(params, true)
         .then(() => {
            sessionStorage.removeItem("token");
            localStorage.removeItem("token");
            store.dispatch(userOffline());
            store.dispatch(setUserData(null));
            history.push(ROUTER.login);
         })
         .catch((err) => console.log(err));
   };

   const checkList = () => {
      if (showList) {
         setShowList(() => false);
      }
      setShowList(() => !showList);

    console.log("user", userData);
  };
  console.log("user", userData);
  API.request({
    ...API_ROUTER.games.getConnectedGames,
    pathKeys: {
      userId: userData?.id,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  useEffect(() => {
     getUserData();
    API.request({
      ...API_ROUTER.teams.getMyTeams,
    })
      .then((res) => {
        setTeams(res.teams);
      })
      .catch((err) => console.log(err));
    API.request({
      ...API_ROUTER.teams.getTeamInvites,
    })
      .then((res) => {
        setTeamInvites(res.teams);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderTeams = (teams) => {
    let teamsList = [];
    const createOption = [
      <div>
        {teamInvites?.map((el) => (
          <InvitMessage key={el.id} id={el.id} name={el.name} logo={el.logo} />
        ))}
        <Link
          className="drop-list-teams__item-link"
          style={{ textDecoration: "none" }}
          to={`/teams/team/create`}
        >
          Create new team
        </Link>
      </div>,
    ];

    if (!teams.length) {
      teamsList.push(
        <div className="drop-list-teams__item-no-team">no teams</div>
      );
    } else {
      teamsList = teams.map((items) => (
        <li className="drop-list-teams__item">
          <Link
            style={{ textDecoration: "none" }}
            to={`/teams/team/${items.id}`}
          >
            {items.name}
          </Link>
        </li>
      ));
    }

      return [...createOption, ...teamsList];
   };
   return (
      <div>
         <div className="open-list">
            <div className="open-list__team-card">
               <div className="team-card__owl-profile">
                  <div className="team-card__owl">
                     <img
                        src={userData?.avatar ? userData?.avatar : Profile}
                        alt="Owl"
                        width="110"
                        height="110"
                        style={{ borderRadius: " 50%" }}
                     />
                  </div>
                  <div className="team-card__profile">
                     <h3 className="profile__team-name">{userData?.nickname || ""}</h3>
                     <p className="profile__team-email">{userData?.username || ""}</p>
                     <button className="profile__disconnect" onClick={logOut}>
                        <FormattedMessage id="more.disconnect" />
                     </button>
                  </div>
               </div>
               <a className="team-card__to-profile" href={`/id/${userData?.id}`}>
                  <FormattedMessage id="more.goToProfile" />
               </a>
            </div>

            {/*<Link to={"/home"} className="open-list__list-item">*/}
            {/*  Match calendar*/}
            {/*</Link>*/}
            <h4 className="open-list__sub-title">
               <FormattedMessage id="more.personalDetails" />
            </h4>

            <ul className="open-list__list">
               <li className="open-list__list-item">
                  <FormattedMessage id="more.accInfo" />
                  <i
                     className="icon icon-password"
                     style={{ paddingLeft: 70, width: 15, height: 15 }}
                  />
               </li>
               <li className="team-list-wrapper">
                  <button
                     style={{ textDecoration: "none" }}
                     onClick={() => checkList()}
                     className="open-list__list-item button-team-list"
                  >
                     <span className="button-team-list__title">
                        <img
                           className={`button-team-list__title-arrow
              ${showList ? "button-team-list__title-arrow-rotate" : ""}`}
                           width={10}
                           height={10}
                           src={arrow}
                        />
                        My teams
                     </span>
                  </button>
                  <ul
                     className={`drop-list-teams
              ${showList ? "drop-list-teams--open" : "drop-list-teams--close"}`}
                  >
                     {renderTeams(teams)}
                  </ul>
               </li>
               <li className="open-list__list-item">
                  {/* <Link
              to={"/community"}
              style={{ textDecoration: "none" }}
              className="open-list__list-item"
            > */}
                  My communities
                  {/* </Link> */}
                  <i
                     className="icon icon-password"
                     style={{ paddingLeft: 70, width: 15, height: 15 }}
                  />
               </li>
               <li className="open-list__list-item">
                  {/* <Link
              to={"/my/tournament"}
              style={{ textDecoration: "none" }}
              className="open-list__list-item"
            > */}
            My tournaments
            {/* </Link> */}
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.EraSubs" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.socialNet" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />{" "}
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.gamingNet" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />{" "}
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.accSecurity" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
        </ul>
        <h4 className="open-list__sub-title">
          <FormattedMessage id="more.EraWallet" />
        </h4>
        <ul className="open-list__list">
          <li className="open-list__list-item">
            <FormattedMessage id="more.walletBalance" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.nft" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.swapTokens" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
        </ul>
        <h4 className="open-list__sub-title">
          <FormattedMessage id="more.parameters" />
        </h4>
        <ul className="open-list__list">
          <li className="open-list__list-item">
            <FormattedMessage id="more.notifi" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
          <li className="open-list__list-item">
            <FormattedMessage id="more.language" />
            <i
              className="icon icon-password"
              style={{ paddingLeft: 70, width: 15, height: 15 }}
            />
          </li>
          <li className="open-list__list-item open-list__list-item--border-bottom">
            <Link style={{ textDecoration: "none" }} to="/support">
              Support
            </Link>{" "}
            {""}
          </li>
        </ul>
        <a className="open-list__pre-footer">
          <p>I have read and agree with the</p>
          <Link to="/terms-of-use">Terms of Use </Link> &nbsp;
          <Link to="/privacy-policy">Privacy Policy</Link> &nbsp;
          <Link to="/cookie-policy">Cookie Policy</Link>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
   return {
      userOnline: state.userOnline,
      userData: state.userData,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      runGetUserData: () => dispatch(getUserData()),
      runUserOnline: () => dispatch(userOnline()),
   };
};

export default injectIntl(
   withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerOpenList))
);
