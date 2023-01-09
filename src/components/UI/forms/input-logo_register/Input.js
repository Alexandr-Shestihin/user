import React from "react";
import styled from "styled-components";
import ErrorMessage from "../../blocks/ErrorMessage";

export default function Input({
  icon,
  register,
  error = "",
  label,
  showErrorMessage = true,
  ...props
}) {
  return (
    <StyledInput>
      <div>
        <i className={"icon icon-" + icon} />
      </div>
      <input type="text" placeholder={label} {...props} />
      {error && showErrorMessage && <ErrorMessage>{error}</ErrorMessage>}
    </StyledInput>
  );
}

const StyledInput = styled.div`
  padding: 12.5px 27px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 25px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    & > i {
      background-color: var(--dark);
      width: 26px;
      height: 26px;
    }
  }

  & > input {
    color: #999999;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: -0.61px;
    line-height: normal;
    border: none;
    outline: none;
    width: 100%;
    padding: 7.5px 0;
  }
`;
