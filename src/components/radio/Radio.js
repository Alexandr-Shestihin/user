import React from "react";
import styled from "styled-components";

export default function Radio({ checked = false, ...props }) {
  return (
    <StyledRadio {...props}>
      {checked && <div className="active__circle" />}
    </StyledRadio>
  );
}

const StyledRadio = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #9a9ca6;
  display: flex;
  align-items: center;
  justify-content: center;

  & > .active__circle {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #f2702c;
  }
`;
