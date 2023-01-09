import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FormattedMessage, injectIntl } from "react-intl";
import takenData from "./components/tekken-7-2022.json";
import RocketData from "./components/rocket-league-2022.json";
import NoImage from "../../assets/no-image.png";

import Calendar from "./components/Calendar";
import GameCard from "./components/GameCard";
import Switch from "../../components/switch";
import Button from "../../components/UI/buttons/buttons-login_register/button/Button";
import atk from "../../assets/images/atk.png";
import sinster from "../../assets/images/sinster.png";
import bravdo from "../../assets/images/bravdo.png";
import energy from "../../assets/images/energy.png";
import solo from "../../assets/images/solo.png";
import gaming from "../../assets/images/gaming.png";
import star from "../../assets/svg/Star.svg";
import { LinearProgress } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { API, API_ROUTER } from "../../api";

export default function CupMatches(props) {
  const [matches, setMatches] = useState();
  let { id } = useParams();

  useEffect(() => {
    API.request({
      ...API_ROUTER.tournaments.getTournamentMatches,
      pathKeys: {
        tournamentId: id,
      },
    })
      .then((res) => {
        setMatches(res.matches);
        console.log("MATCHES", res);
      })
      .catch((err) => console.log(err));
  }, []);

  const getGameCard = ({
    tournamentMember1 = {},
    tournamentMember2 = {},
    startedAt,
  }) => {
    const { user: user1, team: team1 } = tournamentMember1 || {
      user: null,
      team: null,
    };
    const { user: user2, team: team2 } = tournamentMember2 || {
      user: null,
      team: null,
    };

    const avatar1 = user1?.avatar || team1?.logo || NoImage;
    const avatar2 = user2?.avatar || team2?.logo || NoImage;

    return (
      <GameCard
        team1img={avatar1}
        // team1img={atk}
        team1name={user1?.name || team1?.name}
        team2img={avatar2}
        // team2img={sinster}
        team2name={user2?.name || team2?.name}
        start={startedAt}
      />
    );
  };
  const renderMatches = () => {
    if (!matches?.length) return <div className="empty-data">no matches</div>;
    return matches?.map(getGameCard);
  };

  return (
    <StyledCupMatches>
      <div className="wrapper">
        {/* TODO comment filter */}
        {/* <Calendar />
        <section className="result__hide">
          <p>
            <FormattedMessage id="battlecup.matches.hideResult" />
          </p>
          <Switch />
        </section> */}

        {/* <section className="holding-tournaments__filters">
          <ul>
            <li className="active">
              <FormattedMessage id="battlecup.matches.allow" />
            </li>
            <li className="">
              <i className="icon icon-star" />
              <p>
                <FormattedMessage id="battlecup.matches.follow" />
              </p>
            </li>
            <li>
              <FormattedMessage id="battlecup.matches.live" />
            </li>
            <li>
              <FormattedMessage id="battlecup.matches.soon" />
            </li>
            <li>
              <FormattedMessage id="battlecup.matches.ended" />
            </li>
          </ul>
          <input
            className="holding-tournaments__filter"
            type="radio"
            name="holding-tournaments-filter"
            id="tournaments-filter-1"
            value="all"
            defaultChecked
          />
          <label
            className="holding-tournaments__filter-label"
            htmlFor="tournaments-filter-1"
          >
            All
          </label>
          <input
            className="holding-tournaments__filter"
            type="radio"
            name="holding-tournaments-filter"
            id="tournaments-filter-2"
            value="star"
          />
          <label
            className="holding-tournaments__filter-label"
            htmlFor="tournaments-filter-2"
          >
            <img src={star} alt="Star" width="10" height="10" />
          </label>
          <input
            className="holding-tournaments__filter"
            type="radio"
            name="holding-tournaments-filter"
            id="tournaments-filter-3"
            value="live"
          />
          <label
            className="holding-tournaments__filter-label"
            htmlFor="tournaments-filter-3"
          >
            Live
          </label>
          <input
            className="holding-tournaments__filter"
            type="radio"
            name="holding-tournaments-filter"
            id="tournaments-filter-4"
            value="soon"
          />
          <label
            className="holding-tournaments__filter-label"
            htmlFor="tournaments-filter-4"
          >
            Soon
          </label>
          <input
            className="holding-tournaments__filter"
            type="radio"
            name="holding-tournaments-filter"
            id="tournaments-filter-5"
            value="ended"
          />
          <label
            className="holding-tournaments__filter-label"
            htmlFor="tournaments-filter-5"
          >
            Ended
          </label>
        </section> */}

        <section className="game__list">
          {renderMatches(takenData)}

          {/* <GameCard
            team1img={atk}
            team1name={"ATK"}
            team2img={sinster}
            team2name={"Sinister5"}
          />
          <GameCard
            team1img={bravdo}
            team1name={"Gaming <br/> Bravado "}
            team2img={energy}
            team2name={"Energy <br/> Esports"}
            type="live"
          />
          <GameCard
            team1img={solo}
            team1name={"Solo <br/> Esports"}
            team2img={gaming}
            team2name={"Gaming <br/> NYOS"}
            type="end"
          /> */}
        </section>

        <p className="no__match">
          <FormattedMessage id="battlecup.matches.noMore" />
        </p>

        {/* <div className="register__btn__wrapper">
          <Button active type="cupbottom">
            <FormattedMessage id="battlecup.information.registrationButton" />
          </Button>
        </div> */}
      </div>
    </StyledCupMatches>
  );
}

const StyledCupMatches = styled.div`
  padding: 25px 18px;

  & > .wrapper {
    border-top: 1px solid #939598;

    & > section {
      &.result__hide {
        background-color: #414042;
        padding: 14px 18px;
        margin-top: 12px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;

        & > p {
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
        }
      }

      &.filter__tabs {
        margin-top: 18px;

        & > ul {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          gap: 12px;

          & > li {
            padding: 5px 15px;
            min-width: 60px;
            text-transform: uppercase;
            color: #6d6e71;
            font-size: 9px;
            font-style: normal;
            letter-spacing: -0.36px;
            line-height: normal;
            border: 1px solid var(--white);
            border-radius: 12px;
            cursor: pointer;
            text-align: center;

            &:nth-child(2) {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              gap: 6px;

              i {
                width: 8px;
                height: 8px;
                background-color: #6d6e71;
              }
            }

            & > * {
              color: #6d6e71;
            }

            &.active {
              color: var(--dark);
              background-color: #bcbec0;

              & > p {
                color: var(--dark);
              }

              & > i {
                background-color: var(--dark);
              }
            }
          }
        }

        @media (max-width: 450px) {
          ul {
            display: -ms-grid;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
        }
      }

      &.game__list {
        margin-top: 20px;
      }
    }

    & > .no__match {
      text-transform: uppercase;
      color: #6d6e71;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: -0.61px;
      line-height: normal;
      text-align: center;
    }

    & > .register__btn__wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-top: 60px;
    }
  }
`;
