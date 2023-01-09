import React from "react";
import styled, { css } from "styled-components";
import cl from "classnames";

export default function TitleRow({
  title = "Title",
  required,
  flags,
  ...props
}) {
  return (
    <StyledTitleRow {...props}>
      <h1>
        {title}
        {required && <span>*</span>}
      </h1>
      <div
        className={cl("flags", {
          active: flags,
        })}
      >
        <ul>
          {flags?.map((i) => (
            <li key={i.id}>
              <img src={i.flag} alt="flag" />
            </li>
          ))}
        </ul>
      </div>
    </StyledTitleRow>
  );
}

const StyledTitleRow = styled.div`
  background-color: #343435;
  padding: 10px 23px;
  border-top: 1px solid #9a9ca6;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}

  ${({ boxshadow }) =>
    boxshadow &&
    css`
      box-shadow: 0 12px 13px 0px #1a1a1a75;
    `}

  & > h1 {
    margin: 0;
    color: #868686;
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 17.99px;
    text-transform: uppercase;

    ${({ color }) =>
      color === "white" &&
      css`
        color: #fff;
      `}

    & > span {
      color: #ce8926;
      margin-left: 2px;
    }
  }

  & > .flags {
    display: none;

    & > ul {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      gap: 6px;
    }

    &.active {
      display: unset;
    }
  }
`;
