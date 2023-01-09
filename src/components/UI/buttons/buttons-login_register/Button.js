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
  font-weight: bold;
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
    size === "sm" &&
    css`
      font-size: 10px;
      padding: 10px 24px;
      border-radius: 12px;
    `}

  ${({ color }) =>
    color === "yellow" &&
    css`
      background-color: #ce8926;
      color: var(--dark);
    `}
`;
