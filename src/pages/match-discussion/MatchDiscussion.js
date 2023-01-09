import React, { useState, useEffect } from "react";
import "./MatchDiscussion.css";
import arrowDown from "../../assets/matchDiscussion/arrow-down.svg";
import clip from "../../assets/matchDiscussion/clip.svg";
import cross from "../../assets/matchDiscussion/cross.svg";
// import microphone from "../../assets/matchDiscussion/microphone.svg";
import smile from "../../assets/matchDiscussion/smile.svg";
import team1 from "../../assets/matchDiscussion/team-1.svg";
import team2 from "../../assets/matchDiscussion/team-2.svg";
import user1 from "../../assets/matchDiscussion/user-1.jpg";
import user2 from "../../assets/matchDiscussion/user-2.jpg";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { showQrModal, getUserData } from "../../redux/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { API, API_ROUTER } from "../../api";
const Games = ["1", "2", "3"];

const MatchDiscussion = ({ userData }) => {
  const [liveChat, changeLiveChatVisiability] = useState(false);
  const [gameMenu, openGameMenu] = useState(false);
  const [activeGame, changeActiveGame] = useState(1);
  const [teamInfo, setTeamInfo] = useState();
  const { matchId } = useParams();
  useEffect(() => {
    API.request({
      ...API_ROUTER.tournaments.getCurrentMatch,
      pathKeys: {
        matchId: matchId,
      },
    })
      .then((res) => {
        setTeamInfo(res);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(teamInfo);

  const tongle = () => {
    if (liveChat) {
      changeLiveChatVisiability(false);
    } else {
      changeLiveChatVisiability(true);
    }
  };
  console.log(userData);
  const tongleGameMenu = () => {
    if (gameMenu) {
      openGameMenu(false);
    } else {
      openGameMenu(true);
    }
  };

  const setActiveGame = (el) => {
    changeActiveGame(el);
    openGameMenu(false);
  };
  const history = useHistory();

  // method
  function goToUrl(url) {
    history.push(url);
  }
  return (
    <div className="match">
      <section className="match__scoreboard">
        <article
          className="scoreboard__team"
          onClick={() =>
            teamInfo?.tournamentMember1.team
              ? goToUrl(`/teams/team/${teamInfo?.tournamentMember1.team.id}`)
              : goToUrl(`/id/${teamInfo?.tournamentMember1.user.id}`)
          }
        >
          <div className="scoreboard__team-image-wrapper">
            {teamInfo?.tournamentMember1.team ? (
              <img
                className="scoreboard__team-image"
                src={teamInfo?.tournamentMember1.team.logo}
                alt={teamInfo?.tournamentMember1.team.logo}
                width="70"
                height="70"
                style={{ borderRadius: "50px" }}
              />
            ) : (
              <img
                className="scoreboard__team-image"
                src={teamInfo?.tournamentMember1.user.avatar}
                alt={teamInfo?.tournamentMember1.user.avatar}
                width="70"
                height="70"
                style={{ borderRadius: "50px" }}
              />
            )}
          </div>

          {teamInfo?.tournamentMember1.team ? (
            <>
              <h5 className="scoreboard__team-title">
                {teamInfo?.tournamentMember1.team.name}
              </h5>
              {/* <p className="scoreboard__team-tag">[gb5]</p> */}
            </>
          ) : (
            <>
              <h5 className="scoreboard__team-title">
                {teamInfo?.tournamentMember1.user.nickname}
              </h5>
              {/* <p className="scoreboard__team-tag">[gb5]</p> */}
            </>
          )}
        </article>
        <article className="scoreboard__team-score">
          <div className="team-score__parameters">
            <p className="team-score__live">{teamInfo?.status}</p>
            <p className="team-score__best-of">
              Bo {teamInfo?.games.games.length}
            </p>
          </div>
          <div className="team-score__score">
            <p>{teamInfo?.tournamentMemberScore1}</p>
            <p>:</p>
            <p>{teamInfo?.tournamentMemberScore2}</p>
          </div>
        </article>
        <article
          className="scoreboard__team"
          onClick={() =>
            teamInfo?.tournamentMember2.team
              ? goToUrl(`/teams/team/${teamInfo?.tournamentMember2.team.id}`)
              : goToUrl(`/id/${teamInfo?.tournamentMember2.user.id}`)
          }
        >
          <div className="scoreboard__team-image-wrapper">
            {teamInfo?.tournamentMember2.team ? (
              <img
                className="scoreboard__team-image"
                src={teamInfo?.tournamentMember2.team.logo}
                alt={teamInfo?.tournamentMember2.team.logo}
                width="70"
                height="70"
                style={{ borderRadius: "50px" }}
              />
            ) : (
              <img
                className="scoreboard__team-image"
                src={teamInfo?.tournamentMember2.user.avatar}
                alt={teamInfo?.tournamentMember2.user.avatar}
                width="70"
                height="70"
                style={{ borderRadius: "50px" }}
              />
            )}
          </div>
          {teamInfo?.tournamentMember2.team ? (
            <>
              <h5 className="scoreboard__team-title">
                {teamInfo?.tournamentMember2.team.name}
              </h5>
              {/* <p className="scoreboard__team-tag">[gb5]</p> */}
            </>
          ) : (
            <>
              <h5 className="scoreboard__team-title">
                {teamInfo?.tournamentMember2.user.nickname}
              </h5>
              {/* <p className="scoreboard__team-tag">[gb5]</p> */}
            </>
          )}
        </article>
      </section>
      <section className="match__discussion">
        <div className="select-match__menu-wrapper">
          {gameMenu && (
            <ul className="select-match__menu">
              {Games.map((el) => (
                <li
                  className="select-match__menu-item"
                  onClick={() => setActiveGame(el)}
                >
                  {" "}
                  <p className="discussion__select-game">GAME {el}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* <article
          className="discussion__select-match"
          onClick={() => tongleGameMenu()}
        >
          <p className="discussion__select-tongler">select match</p>
          <p className="discussion__select-game">GAME {activeGame}</p>
          <img
            className="discussion__select-game-image"
            src={arrowDown}
            alt="down"
            width="8"
            height="4"
          />
        </article> */}
        {/* <form className="discussion__form" action="" method="post">
          <div className="discussion__inputs">
            <input
              className="discussion__input-text-message"
              type="text"
              placeholder="Enter Score"
              name="match__score"
            />

            <label className="discussion__label" htmlFor="match-result__win">
              <input
                className="discussion__input-invisible"
                type="radio"
                name="match__result"
                value="win"
                id="match-result__win"
              />
              <div className="match-result__pseudo-radio"></div>
              <p className="discussion__input-text">Win</p>
            </label>
            <label className="discussion__label" htmlFor="match-result__lose">
              <input
                className="discussion__input-invisible"
                type="radio"
                name="match__result"
                value="lose"
                id="match-result__lose"
              />
              <div className="match-result__pseudo-radio"></div>
              <p className="discussion__input-text">Lose</p>
            </label>
            <label className="discussion__label" htmlFor="match-result__draw">
              <input
                className="discussion__input-invisible"
                type="radio"
                name="match__result"
                value="draw"
                id="match-result__draw"
              />
              <div className="match-result__pseudo-radio"></div>
              <p className="discussion__input-text">Draw</p>
            </label>
          </div>
          <div className="discussion__file-wrapper">
            <input
              className="discussion__file-input"
              type="file"
              name="match__file"
              id="match__file"
            />
            <label
              className="discussion__file-input-label"
              htmlFor="match__file"
            >
              Game {activeGame} Result
              <br /> Screenshot
              <br /> Not uploaded
            </label>
            <p
              className="discussion__submit"
              // type="submit"
              value="Send Result"
            >
              Send Result
            </p>
          </div>
        </form> */}
      </section>
      <section className="discussion__teams">
        <article className="discussion__team">
          {/*  <h3 className="discussion__team-title">Team 1</h3>
          <div
            className="discussion__team-wrapper"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang">Player 1</p>
              <p className="team-wrapper__name">Pavel</p>
            </div>
            <img
              className="team-wrapper__image"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
          </div>
          <div className="discussion__team-wrapper">
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang">Player 1</p>
              <p className="team-wrapper__name">Pavel</p>
            </div>
            <img
              className="team-wrapper__image"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
          </div>
          <div
            className="discussion__team-wrapper"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang">Player 1</p>
              <p className="team-wrapper__name">Pavel</p>
            </div>
            <img
              className="team-wrapper__image"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
          </div>
          <div
            className="discussion__team-wrapper"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang">Player 1</p>
              <p className="team-wrapper__name">Pavel</p>
            </div>
            <img
              className="team-wrapper__image"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
          </div>
          <div
            className="discussion__team-wrapper"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang">Player 1</p>
              <p className="team-wrapper__name">Pavel</p>
            </div>
            <img
              className="team-wrapper__image"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
          </div>
        </article>
        <article className="discussion__team discussion__team--reverse">
          <h3 className="discussion__team-title discussion__team-title--reverse">
            Team 2
          </h3>
          <div
            className="discussion__team-wrapper discussion__team-wrapper--reverse"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <img
              className="team-wrapper__image  team-wrapper__image--reverse"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang team-wrapper__rang--reverse">
                Player 1
              </p>
              <p className="team-wrapper__name team-wrapper__name--reverse">
                Pavel
              </p>
            </div>
          </div>
          <div
            className="discussion__team-wrapper discussion__team-wrapper--reverse"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <img
              className="team-wrapper__image  team-wrapper__image--reverse"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang team-wrapper__rang--reverse">
                Player 1
              </p>
              <p className="team-wrapper__name team-wrapper__name--reverse">
                Pavel
              </p>
            </div>
          </div>
          <div
            className="discussion__team-wrapper discussion__team-wrapper--reverse"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <img
              className="team-wrapper__image  team-wrapper__image--reverse"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang team-wrapper__rang--reverse">
                Player 1
              </p>
              <p className="team-wrapper__name team-wrapper__name--reverse">
                Pavel
              </p>
            </div>
          </div>
          <div
            className="discussion__team-wrapper discussion__team-wrapper--reverse"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <img
              className="team-wrapper__image  team-wrapper__image--reverse"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang team-wrapper__rang--reverse">
                Player 1
              </p>
              <p className="team-wrapper__name team-wrapper__name--reverse">
                Pavel
              </p>
            </div>
          </div>
          <div
            className="discussion__team-wrapper discussion__team-wrapper--reverse"
            onClick={() => goToUrl(`/id/${userData?.id}`)}
          >
            <img
              className="team-wrapper__image  team-wrapper__image--reverse"
              src={user2}
              alt="user"
              width="40"
              height="40"
            />
            <div className="team-wrapper__name-and-rang">
              <p className="team-wrapper__rang team-wrapper__rang--reverse">
                Player 1
              </p>
              <p className="team-wrapper__name team-wrapper__name--reverse">
                Pavel
              </p>
            </div>
          </div>*/}
        </article>
      </section>
      {/* <section className="match__chat">
        <article className="match__chat-open" onClick={() => tongle()}>
          <div className="match__chat-open-info">
            <h3 className="chat-info__title">Live chat</h3>
            <p className="chat-info__online">Online 570</p>
          </div>
          <img
            className="chat-info__arrow"
            src={liveChat ? cross : arrowDown}
            alt="down"
            width={liveChat ? "24" : "18"}
            height={liveChat ? "24" : "9"}
          />
        </article> */}
      {/* {liveChat && (
          <article className="match-chat__messages">
            <div className="match-chat__message">
              <img
                className="match-chat__image"
                src={user2}
                alt="user"
                width="40"
                height="40"
              />
              <div className="match-chat__texts">
                <p className="match-chat__text">
                  Player 1: Player 2 are you online?
                </p>
                <p className="match-chat__text">{`:)`}</p>
              </div>
            </div>
            <div className="match-chat__message match-chat__message--reverse">
              <div className="match-chat__texts match-chat__texts--reverse">
                <p className="match-chat__text match-chat__text--reverse">
                  Yeah, I'm online
                </p>
                <p className="match-chat__text match-chat__text--reverse">
                  How are you?
                </p>
              </div>
              <img
                className="match-chat__image  match-chat__image--reverse"
                src={user1}
                alt="user"
                width="40"
                height="40"
              />
            </div>
            <div className="match-chat__message">
              <img
                className="match-chat__image"
                src={user2}
                alt="user"
                width="40"
                height="40"
              />
              <div className="match-chat__texts">
                <p className="match-chat__text">
                  Player 1: Not bad {`:)`} I have a question
                </p>
              </div>
            </div>
          </article>
        )} */}

      {/* {liveChat && (
          <article className="match-chat__write-message">
            <img
              className="write-message__input-clip"
              src={clip}
              alt=""
              width="16"
              height="18"
            />
            <input
              className="write-message__input"
              type="text"
              placeholder="Write"
            />
            <img
              className="write-message__input-smile"
              src={smile}
              alt=""
              width="20"
              height="20"
            />
          </article>
        )} */}
      {/* </section> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};
export default injectIntl(connect(mapStateToProps)(MatchDiscussion));
