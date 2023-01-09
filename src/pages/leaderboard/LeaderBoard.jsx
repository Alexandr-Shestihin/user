import React, { useState, useEffect } from "react";
import "./LeaderBoard.css";
import vp from "../../assets/images/vp.png";
import teamNew from "../../assets/images/new.png";
import liquid from "../../assets/images/team-liquid.png";
import flag from "../../assets/images/flag-1.png";
import { API, API_ROUTER } from "../../api";
import NoImage from "../../assets/no-image.png";

const dataPlug = [
  {
    id: 1,
    teamEmblem: vp,
    tag: "AAA",
    pts: 820,
    win: 19,
    lose: 3,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 2,
    teamEmblem: teamNew,
    tag: "BBB",
    pts: 810,
    win: 18,
    lose: 3,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 3,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 720,
    win: 15,
    lose: 6,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 4,
    teamEmblem: vp,
    tag: "DDD",
    pts: 700,
    win: 14,
    lose: 7,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 5,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 680,
    win: 15,
    lose: 8,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 6,
    teamEmblem: vp,
    tag: "DDD",
    pts: 660,
    win: 14,
    lose: 8,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 7,
    teamEmblem: teamNew,
    tag: "DDD",
    pts: 650,
    win: 14,
    lose: 9,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 8,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 610,
    win: 13,
    lose: 9,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 9,
    teamEmblem: teamNew,
    tag: "DDD",
    pts: 580,
    win: 12,
    lose: 10,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 10,
    teamEmblem: vp,
    tag: "AAA",
    pts: 820,
    win: 19,
    lose: 3,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 11,
    teamEmblem: teamNew,
    tag: "BBB",
    pts: 810,
    win: 18,
    lose: 3,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 12,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 720,
    win: 15,
    lose: 6,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 13,
    teamEmblem: vp,
    tag: "DDD",
    pts: 700,
    win: 14,
    lose: 7,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 14,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 680,
    win: 15,
    lose: 8,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 15,
    teamEmblem: vp,
    tag: "DDD",
    pts: 660,
    win: 14,
    lose: 8,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 16,
    teamEmblem: teamNew,
    tag: "DDD",
    pts: 650,
    win: 14,
    lose: 9,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 17,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 610,
    win: 13,
    lose: 9,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 18,
    teamEmblem: teamNew,
    tag: "DDD",
    pts: 580,
    win: 12,
    lose: 10,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 19,
    teamEmblem: liquid,
    tag: "CCC",
    pts: 610,
    win: 13,
    lose: 9,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
  {
    id: 20,
    teamEmblem: teamNew,
    tag: "DDD",
    pts: 580,
    win: 12,
    lose: 10,
    countryImage: flag,
    infosLink: "http//link-to-nowhere.com",
  },
];

const LeaderBoard = () => {
  const [participants, setParticipants] = useState();
  const [filter, setFilter] = useState("tekken");

  useEffect(() => {
    API.request({
      ...API_ROUTER.teams.getTeams,
    })
      .then((res) => {
        setParticipants(res.teams);
      })
      .catch((err) => console.log(err));
  }, [filter]);

  console.log(filter);
  let sortArr = dataPlug.sort((a, b) => b.pts - a.pts);
  return (
    <div>
      <section className="leaderbord">
        <form action="" className="leaderbord__form">
          {/* <div className="leaderbord__form-competition-rank">
            <input
              className="form-competition-rank__input"
              type="radio"
              name="competition-rank"
              value="regional"
              id="competition-rank__regional"
            />
            <label
              className="form-competition-rank__label"
              htmlFor="competition-rank__regional"
            >
              regional
            </label>
            <input
              className="form-competition-rank__input"
              type="radio"
              name="competition-rank"
              value="national"
              id="competition-rank__national"
            />
            <label
              className="form-competition-rank__label"
              htmlFor="competition-rank__national"
            >
              national
            </label>
            <input
              className="form-competition-rank__input"
              type="radio"
              name="competition-rank"
              value="continental"
              id="competition-rank__continental"
            />
            <label
              className="form-competition-rank__label"
              htmlFor="competition-rank__continental"
            >
              continental
            </label>
          </div> */}
          <ul className="leaderbord__form-game-list">
            {/* <li className="leaderbord__form-game">
              <input
                className="form-game__input"
                type="radio"
                id="form-game__pubg"
                name="form-game"
                value="pubg"
              />
              <label className="form-game__label" htmlFor="form-game__pubg">
                PUBG
              </label>
            </li>
            <li className="leaderbord__form-game">
              <input
                className="form-game__input"
                type="radio"
                id="form-game__fifa"
                name="form-game"
                value="fifa"
              />
              <label className="form-game__label" htmlFor="form-game__fifa">
                FIFA
              </label>
            </li> */}
            <li className="leaderbord__form-game">
              <input
                className="form-game__input"
                type="radio"
                id="form-game__tekken"
                name="form-game"
                value="tekken"
                defaultChecked
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <label className="form-game__label" htmlFor="form-game__tekken">
                TEKKEN 7
              </label>
            </li>
            <li className="leaderbord__form-game">
              <input
                className="form-game__input"
                type="radio"
                id="form-game__guilty-gear"
                name="form-game"
                value="guilty gear"
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <label
                className="form-game__label"
                htmlFor="form-game__guilty-gear"
              >
                Rocket League
              </label>
            </li>
          </ul>
        </form>
        <ul className="leaderbord__result-list">
          <li className="leaderbord__result-list-item leaderbord__result-list-item--header">
            <p className="leaderbord__result-team">Team</p>
            <p className="leaderbord__result-pts">Pts</p>
            <p className="leaderbord__result-win">V</p>
            <p className="leaderbord__result-lose">D</p>
            <p className="leaderbord__result-percent">%</p>
            <p className="leaderbord__result-flag">C</p>
            <p className="leaderbord__result-infos-link">infos</p>
          </li>
          {filter === "tekken"
            ? participants?.map((el) => (
                <li
                  className={
                    participants?.indexOf(el) % 2 == 0
                      ? "leaderbord__result-list-item leaderbord__result-list-item--also-gray"
                      : "leaderbord__result-list-item leaderbord__result-list-item--gray"
                  }
                >
                  <p
                    className={
                      participants?.indexOf(el) == 0
                        ? "leaderbord__result-place id-first"
                        : participants?.indexOf(el) == 1
                        ? "leaderbord__result-place id-second"
                        : participants?.indexOf(el) == 2
                        ? "leaderbord__result-place id-third"
                        : "leaderbord__result-place"
                    }
                  >
                    {participants?.indexOf(el) + 1}
                  </p>
                  <p className="leaderbord__result-emblem">
                    <img
                      src={el.logo ? el.logo : NoImage}
                      alt={el.logo ? el.logo : NoImage}
                      width="28"
                      height="28"
                    />
                  </p>
                  <p className="leaderbord__result-tag">{el.name}</p>
                  <p className="leaderbord__result-pts">-</p>
                  <p className="leaderbord__result-win">-</p>
                  <p className="leaderbord__result-lose">-</p>
                  <p className="leaderbord__result-percent">
                    {/* {(el.win / (el.win + el.lose)).toFixed(2)} */} -
                  </p>
                  <p className="leaderbord__result-flag">
                    <img
                      src={el.flag ? el.flag : NoImage}
                      alt=""
                      width="29"
                      height="19"
                    />
                  </p>
                  <a
                    href={`/teams/team/${el?.id}`}
                    className="leaderbord__result-infos-link"
                  >
                    Infos ...
                  </a>
                </li>
              ))
            : false}
          {filter === "guilty gear"
            ? participants?.reverse().map((el) => (
                <li
                  className={
                    participants?.indexOf(el) % 2 == 0
                      ? "leaderbord__result-list-item leaderbord__result-list-item--also-gray"
                      : "leaderbord__result-list-item leaderbord__result-list-item--gray"
                  }
                >
                  <p
                    className={
                      participants?.indexOf(el) == 0
                        ? "leaderbord__result-place id-first"
                        : participants?.indexOf(el) == 1
                        ? "leaderbord__result-place id-second"
                        : participants?.indexOf(el) == 2
                        ? "leaderbord__result-place id-third"
                        : "leaderbord__result-place"
                    }
                  >
                    {participants?.indexOf(el) + 1}
                  </p>
                  <p className="leaderbord__result-emblem">
                    <img
                      src={el.logo ? el.logo : NoImage}
                      alt={el.logo ? el.logo : NoImage}
                      width="28"
                      height="28"
                    />
                  </p>
                  <p className="leaderbord__result-tag">{el.name}</p>
                  <p className="leaderbord__result-pts">-</p>
                  <p className="leaderbord__result-win">-</p>
                  <p className="leaderbord__result-lose">-</p>
                  <p className="leaderbord__result-percent">
                    {/* {(el.win / (el.win + el.lose)).toFixed(2)} */} -
                  </p>
                  <p className="leaderbord__result-flag">
                    <img
                      src={el.flag ? el.flag : NoImage}
                      alt=""
                      width="29"
                      height="19"
                    />
                  </p>
                  <a
                    href={`/teams/team/${el?.id}`}
                    className="leaderbord__result-infos-link"
                  >
                    Infos ...
                  </a>
                </li>
              ))
            : false}
        </ul>
      </section>
    </div>
  );
};

export default LeaderBoard;
