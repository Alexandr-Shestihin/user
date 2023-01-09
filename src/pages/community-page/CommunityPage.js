import React, { useEffect, useState } from "react";
import "./CommunityPage.css";
import TournamentItem from "./tournament-item";
import EventItem from "./event-item";
import { FormattedMessage } from "react-intl";
import loadAllTournaments from "../../helpers/userTournaments/loadAllTournaments";
import { showQrModal, hideQrModal } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import getCommunityDetailsHelper from "../../helpers/userCommunities/getCommunityDetailsHelper";
import getCommunityEvents from "../../helpers/userCommunities/getCommunityEvents";
import getCommunityTournaments from "../../helpers/communities/getCommunityTournaments";
import profLogo from "../../assets/images/bg.png";

import { LinearProgress } from "@material-ui/core";
import ModalQR from "./qrModal";
import { useHistory, useParams } from "react-router-dom";

const CommunityPage = (props) => {
  let { tab } = useParams();
  let history = useHistory();

  let { communityId } = useParams();
  console.log(tab);
  const [heart, tongleHeart] = useState("false");
  const [community, setCommunity] = useState();
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [tournaments, setTournaments] = useState(null);
  const [events, setEvents] = useState(null);
  const [currentTab, setCurrentTab] = useState(tab);
  const CALENDAR_ROUTES = {
    events: `/community/${communityId}/events`,
    tournaments: `/community/${communityId}/tournaments`,
  };
  const TABS = {
    events: "events",
    tournaments: "tournaments",
  };
  console.log(community);

  useEffect(() => {
    getCommunityDetailsHelper(communityId)
      .then((res) => {
        setCommunity(() => res);
        setRequestSuccess(true);
      })
      .catch((e) => {
        console.log("error in getting all communities", e);
      });
  }, []);
  const dispatch = useDispatch();

  const openModal = (e) => {
    e.preventDefault();
    dispatch(showQrModal());
  };

  const tongHeart = () => {
    if (heart) {
      tongleHeart(false);
    } else tongleHeart(true);
  };

  useEffect(() => {
    checkEvents();
    checkTournaments();
  }, []);

  const checkEvents = () => {
    getCommunityEvents(communityId)
      .then((res) => {
        console.log("events", res.events);
        setEvents(() => res.events);
        setRequestSuccess(true);
      })
      .catch((e) => {
        toast.error(e.statusText);
      });
  };

  const checkTournaments = () => {
    setEvents(null);
    getCommunityTournaments(communityId)
      .then((res) => {
        console.log("res tournaments", res);
        setTournaments(() => res.tournaments);
        setRequestSuccess(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const renderEvents = (events) => {
    if (!events?.length) return <div className="empty-data">no events</div>;
    return (
      <section className="calendar__event-lists calendar__tournament-lists">
        <article className="calendar__tournament-list">
          <ul className="event-list__events  tournament-list__events">
            {events?.map((events) => (
              <EventItem {...events} key={events.id} />
            ))}
          </ul>
        </article>
      </section>
    );
  };
  const renderTournaments = (tournaments) => {
    if (!tournaments?.length)
      return <div className="empty-data">no tournaments</div>;
    console.log(tournaments);
    return (
      <section className="calendar__event-lists calendar__tournament-lists">
        <article className="calendar__tournament-list">
          <ul className="event-list__events  tournament-list__events">
            {tournaments?.map((items) => (
              <TournamentItem {...items} key={items.id} />
            ))}
          </ul>
        </article>
      </section>
    );
  };
  const tabChecker = (tabName) => currentTab === tabName;
  const setTabClassNAme = (tabName) =>
    tabChecker(tabName)
      ? `calendar__title calendar__title--clickable calendar__title--active`
      : `calendar__title calendar__title--clickable`;
  return (
    <div>
      <div className="community-page">
        <section className="community-page__first-section"></section>
        <section className="community-page__logo-and-title">
          <section style={{ display: "flex", justifyContent: "center" }}>
            <div className="community-page__team-picture">
              {/* <div className="team-picture__edit-wrapper"></div> */}
              <div className="team-picture__image-wrapper">
                <img
                  className="team-picture__image"
                  src={profLogo}
                  alt="owl"
                  width="131"
                  height="131"
                />
              </div>
              <div className="team-picture__qr-wrapper">
                {/* <i
                  className="icon icon-qr"
                  style={{
                    width: "58px",
                    height: "58px",
                    background: "var(--icon)",
                  }}
                  onClick={(e) => openModal(e)}
                /> */}
              </div>
            </div>
          </section>
          <section className="community-page__description">
            <div className="community-page__title-wrapper">
              <p className="community-page__title">{community?.name}</p>
            </div>
            <div>
              <div className="with__border">
                <p className="community-page__followers-number">
                  0 FOLLOWERS [COMING SOON]
                </p>
              </div>
            </div>
            <p className="community-page__bio">{}</p>
          </section>
          <section className="community-page__decoration-heart-section">
            <div
              className="community-page__decoration-heart"
              onClick={() => tongHeart()}
            >
              <div
                className={
                  heart
                    ? "decoration-heart__image decoration-heart__image--active"
                    : "decoration-heart__image"
                }
              ></div>
              <p className="decoration-heart__tongler">
                {heart ? "unfollow" : "follow"}
              </p>
            </div>
          </section>
        </section>
        <section className="community-page__information-block">
          <h3 className="community-page__information">INFORMATION</h3>
          <p className="information-block__text">{community?.description}</p>
          <article className="community-page__country-year-contact">
            <p className="community-page__country">
              <span className="country-year-contact__right-text">Country:</span>{" "}
              Estonia
            </p>
            <p className="community-page__year">
              <span className="country-year-contact__right-text">
                Year of foundation :
              </span>{" "}
              2020
            </p>
            <p className="community-page__contact">
              <span className="country-year-contact__right-text">Contact:</span>{" "}
              {community?.contact}
            </p>
          </article>
        </section>
        <section className="community-page__tabs tabs">
          {/* <h3
            className={
              events == null
                ? `tabs__tab-title tabs__tab-title--clickable`
                : `tabs__tab-title tabs__tab-title--clickable tabs__tab-title--active`
            }
            onClick={() => checkEvents()}
          >
            <FormattedMessage id="calendar.events" />
          </h3> */}
          <h3
            className={setTabClassNAme(TABS.events)}
            onClick={() => {
              history.push(CALENDAR_ROUTES.events);
              setCurrentTab(TABS.events);
            }}
          >
            <FormattedMessage id="calendar.events" />
          </h3>
          {/* <h3
            className={
              tournaments == null
                ? `tabs__tab-title tabs__tab-title--clickable`
                : `tabs__tab-title tabs__tab-title--clickable tabs__tab-title--active`
            }
            onClick={() => checkTournaments()}
          >
            <FormattedMessage id="calendar.tournaments" />
          </h3> */}
          <h3
            className={setTabClassNAme(TABS.tournaments)}
            onClick={() => {
              history.push(CALENDAR_ROUTES.tournaments);
              setCurrentTab(TABS.tournaments);
            }}
          >
            <FormattedMessage id="calendar.tournaments" />
          </h3>
        </section>
        {/* {events !== null && (
          <section className="communities__event-lists">
            <article className="communities__event-list">
              <ul className="event-list__events">
                {events.map((el) => {
                  return (
                    <EventItem
                      events={events}
                      startedAt={el.startedAt}
                      endedAt={el.endedAt}
                      key={el.id}
                      id={el.id}
                      name={el.name}
                    />
                  );
                })}
              </ul>
            </article>
          </section>
        )} */}
        {tabChecker(TABS.events) && (
          <>{requestSuccess ? renderEvents(events) : <LinearProgress />}</>
        )}
        {/* {tournaments !== null && (
          <section className="communities__event-lists">
            <article className="communities__tournament-list">
              <ul className="event-list__events  tournament-list__events">
                {tournaments.map((el) => {
                  return (
                    <TournamentItem
                      tournaments={tournaments}
                      key={el.id}
                      {...el}
                    />
                  );
                })}
              </ul>
            </article>
          </section>
        )} */}
        {tabChecker(TABS.tournaments) && (
          <>
            {requestSuccess ? (
              renderTournaments(tournaments)
            ) : (
              <LinearProgress />
            )}
          </>
        )}
      </div>
      <ModalQR />
    </div>
  );
};

export default CommunityPage;
