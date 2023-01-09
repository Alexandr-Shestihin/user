import React from "react";
import styled from "styled-components";
import cl from "classnames";
import { FormattedMessage, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

export default function GameCard({
  team1img,
  team2img,
  team1name = "",
  team2name = "",
  selected,
  type,
  start,
}) {
  const history = useHistory();
  const { pathname } = useLocation();

  // method
  function goToUrl(url) {
    history.push(url);
  }
  function goto() {
    window.location =
      "https://passport.gg/tournaments/tournament/test-tournament-round-robin/matches";
  }

  return (
    <StyledGameCard className="b-shadow">
      {/* TODO wait follow/unfollow back  */}

      {/* <div className="star__wrapper">
        <i
          className={cl("icon icon-star", {
            selected,
          })}
        />
      </div> */}

      <div
        className={cl("type__display", {
          live: type === "live",
        })}
      >
        {type === "live" ? (
          <FormattedMessage id="battlecup.gamecard.live" />
        ) : type === "end" ? (
          <FormattedMessage id="battlecup.gamecard.end" />
        ) : (
          <FormattedMessage id="battlecup.gamecard.soon" />
        )}
      </div>

      <header
      // onClick={() => goToUrl("/match-disscusion")}
      >
        <section className="team__wrapper">
          <img
            src={team1img}
            alt="teamlogo"
            style={{ width: "70px", height: "70px", borderRadius: "15px" }}
          />
          {team1name.length < 10 ? (
            <p dangerouslySetInnerHTML={{ __html: team1name }} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: team1name.substring(0, 3),
              }}
            />
          )}
        </section>
        <section>
          {type === "live" ? (
            <>
              <h1 className="game__res">2 - 2</h1>
            </>
          ) : type === "end" ? (
            <>
              <h1 className="game__res">4 - 4</h1>
            </>
          ) : (
            <>
              {/* TODO time comment */}
              {/* <h1 className="date_time">1:00 AM</h1> */}
              <p className="week_day">{start}</p>
            </>
          )}
        </section>
        <section className="team__wrapper">
          <img
            src={team2img}
            alt="teamlogo"
            style={{ width: "70px", height: "70px", borderRadius: "15px" }}
          />
          {team2name.length < 10 ? (
            <p dangerouslySetInnerHTML={{ __html: team2name }} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: team2name.substring(0, 10),
              }}
            />
          )}
        </section>
      </header>

      <footer>
        {/* TODO commented watch  */}
        {/* <section>
          <FormattedMessage id="battlecup.gamecard.watch" />
        </section>

        <section>
          <FormattedMessage id="battlecup.gamecard.stats" />
        </section> */}
      </footer>
    </StyledGameCard>
  );
}

const StyledGameCard = styled.div`
  background-color: #333333;
  ${"" /* TODO color */}
  ${"" /* background: rgb(43, 36, 74); */}
  position: relative;
  border-radius: 12px;
  margin-bottom: 24px;

  & > .star__wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: max-content;
    position: absolute;
    top: 12px;
    right: 8px;

    i {
      width: 18px;
      height: 18px;
      background-color: #6d6e71;

      &.selected {
        background-color: var(--yellow);
      }
    }
  }

  & > .type__display {
    color: #262626;
    font-size: 9px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: -0.36px;
    line-height: normal;
    background-color: #bcbec0;
    position: absolute;
    padding: 3px 7px;
    border-radius: 0 0 5px 5px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    &.live {
      background-color: var(--red);
      color: var(--white);
    }
  }

  & > header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    padding: 15px 0;

    & > section {
      &.team__wrapper {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 8px;
      }

      h1.date_time {
        font-size: 18px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.72px;
        line-height: normal;
        text-align: center;
      }

      h1.game__res {
        font-size: 35px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -1.38px;
        line-height: normal;
      }

      p.week_day {
        font-size: 15px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.36px;
        line-height: normal;
        text-align: center;
      }
    }
  }

  & > footer {
    display: -ms-grid;
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-top: 1px solid grey;

    & > section {
      text-align: center;
      padding: 10px 0;
      &:first-of-type {
        border-right: 1px solid grey;
      }
    }
  }
`;
