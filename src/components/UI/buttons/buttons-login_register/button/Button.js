import React from "react";
import styled, { css } from "styled-components";

export default function Button({ ...props }) {
  return <StyledButton {...props} />;
}

const StyledButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: bolder;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  padding: 16px 45px;
  white-space: nowrap;

  ${({ active }) =>
    active &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${({ size }) =>
    size === "sm"
      ? css`
          font-size: 10px;
          padding: 10px 24px;
          border-radius: 12px;
        `
      : size === "md"
      ? css`
          padding: 12px 40px;
          font-size: 10px;
          font-weight: 700;
          font-style: normal;
          letter-spacing: normal;
          text-align: center;
          border-radius: 14px;
        `
      : null}

  ${({ color }) =>
    color === "yellow" &&
    css`
      background-color: #ce8926;
      color: var(--dark);
    `}
    ${({ status }) =>
    status === "completed"
      ? css`
          background-color: brown;
        `
      : status === "active"
      ? css`
          background-color: green;
        `
      : null}
  ${({ type }) =>
    type === "cuptop"
      ? css`
          border: 1px solid var(--white);
          color: var(--white);
          padding: 9px;
          font-size: 7px;
        `
      : type === "cupbottom"
      ? css`
          border: 1px solid var(--white);
          color: var(--white);
          background-color: var(--yellow);
          padding: 9px 30px;
          font-size: 17px;
        `
      : null}

  ${({ event }) =>
    event &&
    css`
      border: 1px solid var(--white);
      color: var(--white);
      background-color: var(--yellow);
      padding: 7px 34px;
      font-size: 12px;
    `}
`;
