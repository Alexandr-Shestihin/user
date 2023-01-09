import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";

export default function Switch() {
  const [checked, setChecked] = useState(false);

  function changeChecked(v) {
    setChecked(v);
  }

  return (
    <StyledSwitch checked={checked} onClick={() => changeChecked(!checked)}>
      <div className="road"></div>
      <div className="circle"></div>
    </StyledSwitch>
  );
}

const StyledSwitch = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;


  & > .road {
    background-color: #939598;
    min-width: 34px;
    min-height: 17px;
    border-radius: 8px;
    transition: .25s linear;
  }

  & > .circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #f1f2f2;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-2.5px);
    transition: 0.25s linear;
  }

  ${({ checked }) =>
    checked &&
    css`
      & > .road {
        background-color: var(--yellow);
        opacity: .5;
      }
      & > .circle {
        background-color: var(--yellow);
        left: auto;
        right: 0;
      }
    `}
`;
