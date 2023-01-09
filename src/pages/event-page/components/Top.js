import React, { useState } from "react";
import styled from "styled-components";

//
import logoOnly from "../../../assets/images/logo_only.png";
import eventBg from "../../../assets/images/eventbg.png";
import { css } from "styled-components";

export default function Top() {
  const [icon, setIcon] = useState(false);

  return (
    <StyledTop bg={eventBg} icon={icon}>
      <div className="top"></div>
      <div className="bottom">
        <div></div>
        <h1>ESWC AFRICA</h1>
        <div className="like">
          <i className="icon icon-heart" onClick={() => setIcon((p) => !p)} />
          <p>1588 FOLLOWERS</p>
        </div>
      </div>
    </StyledTop>
  );
}

const StyledTop = styled.section`
  min-height: 500px;
  background: ${({ bg }) => `url("${bg}")`} no-repeat center;
  background-size: cover;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > section {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      & > .circle {
        position: absolute;
        width: 10px;
        height: 10px;
        top: 3px;
        right: 0;
        background-color: var(--red);
        border-radius: 50%;
      }
    }
  }

  & > .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > h1 {
      font-size: 26px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -1.01px;
      line-height: normal;
    }

    & > .like {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;

      & > i {
        background-color: #6d6e71;

        ${({ icon }) =>
          icon &&
          css`
            background-color: var(--yellow);
          `}
      }

      & > p {
        font-size: 8px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.31px;
        line-height: normal;
        color: #6d6e71;
        transition: 0.25s linear;

        ${({ icon }) =>
          icon &&
          css`
            color: var(--yellow);
          `}
      }
    }
  }

  @media (max-width: 768px) {
    min-height: 270px;
  }
`;
