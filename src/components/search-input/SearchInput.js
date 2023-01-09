import React from "react";
import styled from "styled-components";

export default function SearchInput() {
  return (
    <StyledSearchInput>
      <input type="text" />
      <i className="icon icon-search"></i>
    </StyledSearchInput>
  );
}

const StyledSearchInput = styled.div`
  position: relative;

  & > input {
    background-color: #404040;
    max-width: 120px;
    border-radius: 12px;
    border: none;
    padding: 6px 12px;
    font-size: 12px;

    &:focus {
      outline: none;
    }
  }

  & > i {
    width: 17px;
    height: 17px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 8px;
  }
`;
