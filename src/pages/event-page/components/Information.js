import React from "react";
import styled from "styled-components";

//
import Button from "../../../components/UI/buttons/buttons-login_register/button/Button";
import nigeria from "../../../assets/images/nigeria.png";

export default function Information() {
  return (
    <StyledInformation>
      <div className="top b-shadow">
        <div className="config">
          <h1>07 Dec 22 | NIGERIA</h1>
          <Button active type="cupbottom" event>
            LIVE
          </Button>
        </div>
        <div className="title-event">
          <div>
            <img src={nigeria} alt="nigeria" />
          </div>
          <h1>INFORMATION</h1>
          <div></div>
        </div>
      </div>
      <div className="bottom">
        <p className="main__text">
          The future has arrived: Welcome to the world of online games and
          events. 75% of your employees, partners and acquaintances love these
          games and spend most of their free time online. If we don't hold a
          tournament for them today, tomorrow they will leave for your
          competitors. We already have excellent experience organizing tour-
          naments in the most popular disciplines, both online and offline.
        </p>
        <ul className="text__list">
          <li>
            Country: <span>Estonia</span>
          </li>
          <li>
            Year of foundation : <span>2020</span>
          </li>
          <li>
            Contact: <span>bigcom@gmail.com</span>
          </li>
        </ul>
      </div>
    </StyledInformation>
  );
}

const StyledInformation = styled.section`
  position: relative;
  & > .top {
    padding: 22px 19px;
    z-index: 2 !important;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background-color: var(--bg);
    ${"" /* TODO color  */}
    ${"" /* background-color: #3f317c; */}
    border: 1px solid var(--icon);
    border-left: 0;
    border-right: 0;

    & > .config {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > h1 {
        font-size: 15px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.59px;
        line-height: normal;
      }
    }

    & > .title-event {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > h1 {
        font-size: 17px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.67px;
        line-height: normal;
      }
    }
  }

  & > .bottom {
    background-color: #303030;
    padding: 140px 25px 25px;

    & > .main__text {
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.55px;
      line-height: normal;
    }

    & > .text__list {
      margin-top: 28px;
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.55px;
      line-height: normal;
      display: flex;
      flex-direction: column;
      gap: 2px;

      & > li {
        max-width: 250px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
`;
