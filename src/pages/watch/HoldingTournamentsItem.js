import React, { useState } from "react";
import starWhite from "../../assets/svg/Star.svg";
import starGold from "../../assets/svg/StarGold.svg";
import { useHistory } from "react-router-dom";
import star from "../../assets/svg/Star.svg";

const HoldingTournamentsItem = (
  // gameStatus,
  // star,
  // teamImage1,
  // teamImage2,
  // teamName1,
  // teamName2,
  // score,
  // time,
  // date,
  // gameLink,
  // watchLink,
  // statisticsLink,
  props
) => {
  const history = useHistory();
  function goto() {
    window.location = "https://www.twitch.tv";
  }
  const [star, tongleStar] = useState("false");
  const tongStar = () => {
    if (star) {
      tongleStar(false);
    } else tongleStar(true);
  };

  return (
    <section className="holding-tournaments__search-results">
      <a
        href={`/match-disscusion/${props.matchId}`}
        className="holding-tournaments__search-result"
        style={{ textDecoration: "none" }}
      >
        <p
          className={
            // gameStatus == "live"
            // ?
            // "search-result__status search-result__status--live"
            // :
            "search-result__game"
          }
        >
          {props.tournamentName}

          {/* {gameStatus} */}
        </p>
        {/* TODO wait follow/unfollow  */}
        <div
          className={
            star === false
              ? "event-list__star-image event-list__star-image--active"
              : "event-list__star-image"
          }
          onClick={() => tongStar()}
        ></div>

        <p
          className={
            // gameStatus == "live"
            // ?
            // "search-result__status search-result__status--live"
            // :
            "search-result__status"
          }
        >
          {/* {gameStatus} */}
          {props.status}
        </p>
        <div className="search-result__team-1">
          <div className="search-result__team-image-wrapper">
            {props.tournamentMember1.user?.avatar ||
            props.tournamentMember1.team?.logo ? (
              <img
                className="search-result__team-image"
                src={
                  props.tournamentMember1.user?.avatar ||
                  props.tournamentMember1.team?.logo
                }
                alt={
                  props.tournamentMember1.user?.avatar ||
                  props.tournamentMember1.team?.logo
                }
              />
            ) : (
              false
            )}
          </div>
          <p className="search-result__team-name">
            {" "}
            {props.tournamentMember1.user?.nickname ||
              props.tournamentMember1.team?.name}
          </p>
        </div>
        <div className="search-result__score">
          <p className="search-result__score-day">{`BO${props.games.games.length} `}</p>
          <p className="search-result__score-time">{props.startedAt}</p>
          {/* {score == "none" ? (
            <>
            </>
          ) : (
            score
          )} */}
          <p className="search-result__score-score">
            {" "}
            {props.tournamentMemberScore1} - {props.tournamentMemberScore2}
          </p>
        </div>
        <div className="search-result__team-2">
          <div className="search-result__team-image-wrapper">
            {props.tournamentMember1.user?.avatar ||
            props.tournamentMember1.team?.logo ? (
              <img
                className="search-result__team-image"
                src={
                  props.tournamentMember2.user?.avatar ||
                  props.tournamentMember2.team?.logo
                }
                alt={
                  props.tournamentMember2.user?.avatar ||
                  props.tournamentMember2.team?.logo
                }
                width="30px"
                height="30px"
              />
            ) : (
              false
            )}
          </div>
          <p className="search-result__team-name">
            {props.tournamentMember2.user?.nickname ||
              props.tournamentMember2.team?.name}
          </p>{" "}
        </div>
      </a>
      <article className="search-results__links">
        <a
          className="search-results__watch-link"
          onClick={() => goto()}
          style={{ textDecoration: "none" }}
        >
          Watch
        </a>
        <p
          className="search-results__statistics-link"
          // href={statisticsLink}
          style={{ textDecoration: "none" }}
        >
          Statistics
        </p>
      </article>
    </section>
  );
};

export default HoldingTournamentsItem;
