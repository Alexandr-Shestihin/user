import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import ReactOutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";

//
import Card from "./Card";
import avatar from "../../../assets/images/teamLogo.png";
import SearchInput from "../../../components/search-input";

export default function Bottom() {
  const [open, setOpen] = useState(false);

  return (
    <StyledBottom>
      <div className="bio">
        <section>
          <Link to={"/community"}>
            <img src={avatar} alt="avatar" width={66} />
          </Link>
        </section>
        <section>
          <Link to={"#"} className="link__title">
            Fearness community
          </Link>
          <p>
            Bio : Introduce yourself in a few lines, your hobbits, your favorite
            games, your tournaments won, etc.
          </p>
        </section>
      </div>
      <div className="calendar b-shadow">
        <div className="icon__wrap">
          <i
            className="icon icon-calendar"
            onClick={() => (!open ? setOpen(true) : {})}
          />
          {open && (
            <div className="calendar__wrapper">
              <ReactOutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <Calendar />
              </ReactOutsideClickHandler>
            </div>
          )}
        </div>
        <h1>TOURNAMENTS</h1>
        <div>
          <SearchInput />
        </div>
      </div>
      <div className="card__list">
        <h1>Week 8 (Dec 6 - Dec 12)</h1>
        <ul>
          <li>
            <Card />
          </li>
          <li>
            <Card />
          </li>
        </ul>
      </div>
    </StyledBottom>
  );
}

const StyledBottom = styled.section`
  & > .bio {
    padding: 25px 25px 36px;
    display: flex;
    align-items: center;
    gap: 40px;
    border: 1px solid var(--icon);
    border-left: 0;
    border-right: 0;

    & > section {
      & > .link__title {
        display: inline-block;
        width: 100%;
        font-size: 28px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -1.08px;
        line-height: normal;
        text-decoration: none;
        text-align: center;
        white-space: nowrap;
      }

      & > p {
        font-size: 12px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.46px;
        line-height: normal;
        margin-top: 17px;
      }
    }

    @media (max-width: 450px) {
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    }
  }

  & > .calendar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 25px;
    border-bottom: 1px solid var(--icon);

    & > h1 {
      font-size: 21px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.82px;
      line-height: normal;
    }

    & > .icon__wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      i {
        width: 22px;
        height: 22px;
      }

      & > .calendar__wrapper {
        position: absolute;
        z-index: 2;
        bottom: 0;
        right: -1rem;
        transform: translate(100%);

        @media (max-width: 450px) {
          right: 2rem;
          bottom: 2rem;

          & > .react-calendar {
            width: calc(90vw - 12px);
          }
        }
      }
    }
  }

  & > .card__list {
    padding: 25px;

    & > h1 {
      font-size: 18px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.72px;
      line-height: normal;
    }

    & > ul {
      margin-top: 27px;
      display: flex;
      flex-direction: column;
      gap: 17px;
    }
  }
`;
