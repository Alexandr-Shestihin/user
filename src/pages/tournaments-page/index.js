import React, { useEffect, useState } from "react";
import "./CommunitiesPage.css";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import loadAllTournaments from "../../helpers/userTournaments/loadAllTournaments";
import getUserCommunityList from "../../helpers/communities/getUserCommunityList";
import getAllTournamentsList from "../../helpers/userTournaments/loadAllTournaments";
import loadTournament from "../../helpers/userTournaments/loadTournament";
import { LinearProgress } from "@material-ui/core";
import { TABS } from "./const";

import CommunityItem from "./tournament-item";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { addCommunityData } from "../../redux/actions/communityData/addCommunityData";

const TournamentPage = () => {
  const history = useHistory();
  const [tournaments, setTournaments] = useState(null);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const [currentTab, setCurrentTab] = useState(TABS.participantTournaments);

  const tabChecker = (tabName) => currentTab === tabName;
  const setTabClassNAme = (tabName) =>
    tabChecker(tabName)
      ? `calendar__title calendar__title--clickable calendar__title--active`
      : `calendar__title calendar__title--clickable`;

  useEffect(() => {
    getAllTournamentsList()
      .then((res) => {
        console.log("all tournaments", res);
        setTournaments(() => res.tournaments);
        setRequestSuccess(true);
      })
      .catch((e) => {
        console.log("error in getting all communities", e);
      });
  }, []);

  const renderTournaments = (tournaments) => {
    if (!tournaments.length) return <div>no tournaments</div>;
    console.log(tournaments);
    return (
      <section className="communities-page">
        <section className="calendar__event-lists calendar__tournament-lists">
          <article className="calendar__tournament-list">
            {/*TODO move this h1 to general header where back button and notifications icon*/}

            <ul className="event-list__events  tournament-list__events">
              {tournaments.map((items) => (
                <CommunityItem {...items} key={items.id} />
              ))}
            </ul>
          </article>
        </section>
      </section>
    );
  };
  return (
    <>
      <div className="calendar">
        <section className="calendar__filter">
          <h3
            className={setTabClassNAme(TABS.participantTournaments)}
            onClick={() => setCurrentTab(TABS.participantTournaments)}
          >
            Participant
          </h3>

          <h3
            className={setTabClassNAme(TABS.followTournaments)}
            onClick={() => setCurrentTab(TABS.followTournaments)}
          >
            Followed
          </h3>
        </section>
        {tabChecker(TABS.participantTournaments) && (
          <>
            {requestSuccess ? (
              renderTournaments(tournaments)
            ) : (
              <LinearProgress />
            )}
          </>
        )}
        {tabChecker(TABS.followTournaments) && (
          <>
            {/* {requestSuccess ? (
              renderTournaments(tournaments)
            ) : (
              <LinearProgress />
            )} */}
            no followed tournaments
          </>
        )}

        {/* {tabChecker(TABS.events) && (
        <>{requestSuccess ? renderEvents(eventList) : <LinearProgress />}</>
      )} */}
        {/* {tournaments ? (
                tournaments.map((el) => {
                  return (
                    <li
                      onClick={() => goToUrl(`/battleCup/information/${el.id}`)}
                      className="community-list__item-wrapper"
                    >
                      <CommunityItem id={el.id} title={el.title} />
                    </li>
                  );
                })
              ) : (
                <h1>List of tournaments</h1>
              )} */}
      </div>
    </>
  );
};

export default TournamentPage;
