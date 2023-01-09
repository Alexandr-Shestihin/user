import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

//
import pubg from "../../../assets/images/pubg.png";

export default function Card() {
  const [icon, setIcon] = useState(false);
  const history = useHistory();
  function handleClick() {
    history.push("/battleCup/information");
  }
  function click(event) {
    event.stopPropagation();
    setIcon((p) => !p);
  }

  return (
    <StyledCard icon={icon} onClick={() => handleClick()}>
      <section className="img__wrap">
        <img src={pubg} alt="pubg" />
      </section>
      <section className="center__wrap">
        <h1>CUP 1</h1>
        <p>Regional Semifinals (online)</p>
        <p style={{ fontWeight: "bold" }}>7 DEC - 8 DEC</p>
      </section>
      <section className="more__star__wrap">
        <i className="icon icon-star" onClick={click} />
        {/* <a href="#1">More infos ...</a> */}
      </section>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  padding: 12px;
  background-color: #333333;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;

  & > .img__wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      width: 60px;
      height: auto;
      object-fit: cover;
    }
  }

  & > .center__wrap {
    text-align: center;

    & > h1 {
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: -0.61px;
      line-height: normal;
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: 1px solid var(--icon);
    }

    & > p {
      font-size: 13px;
      font-weight: 300;
      font-style: normal;
      letter-spacing: -0.51px;
      line-height: normal;
    }
  }

  & > .more__star__wrap {
    min-width: 50px;

    & > i {
      width: 18px;
      height: 18px;
      background-color: #6d6e71;
      position: absolute;
      top: 9px;
      right: 9px;

      ${({ icon }) =>
        icon &&
        css`
          background-color: var(--yellow);
        `}
    }

    & > a {
      position: absolute;
      bottom: 7px;
      right: 16px;
      color: #ffffff;
      font-size: 11px;
      font-weight: 300;
      font-style: normal;
      letter-spacing: -0.41px;
      line-height: normal;
    }
  }
`;
