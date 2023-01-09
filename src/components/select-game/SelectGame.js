import React, { useState } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";

//
import csgo from "../../assets/images/img-login_register_profile_rodster/csgo.png";
import { css } from "styled-components";

export default function SelectGame() {
  const [isOpen, setIsOpen] = useState(false);

  function changeIsOpen(v) {
    setIsOpen(v);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => changeIsOpen(false)}>
      <StyledSelectGame isOpen={isOpen}>
        <section>
          <img src={csgo} alt="csgo" />
        </section>
        <section>
          <i
            className="icon icon-circle-arrow-down"
            style={{ width: "15px", height: "15px" }}
            onClick={() => changeIsOpen(!isOpen)}
          />
        </section>
        <div className="select__menu"></div>
      </StyledSelectGame>
    </OutsideClickHandler>
  );
}

const StyledSelectGame = styled.div`
  padding: 20px 0;
  display: flex;
  width: max-content;
  margin: 0 auto;
  position: relative;

  & > section {
    border: 1px solid var(--icon);
    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &:last-of-type {
      background-color: var(--dark);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 25px;
    }
  }

  & > .select__menu {
    position: absolute;
    background-color: var(--dark);
    padding: 25px 32px;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
    width: 100%;
    display: none;
    z-index: 2;

    ${({ isOpen }) =>
      isOpen &&
      css`
        display: block;
      `}
  }
`;
