import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import ErrorMessage from "../UI/blocks/ErrorMessage";

export default function InfoInput({
  icon = "",
  placeholder = "Label",
  borderBottom = false,
  birthdate = false,
  textarea = false,
  error = "",
  label,
  showErrorMessage = true,
  ...props
}) {
  const [v, setV] = useState("");
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    setErrorMessage(error);
  }, [error]);

  function changeV(e) {
    let { value } = e.target;
    if (birthdate) {
      var reg = /^\d+$/;
      value = value
        .split("")
        .filter((i) => i !== "-")
        .join("");
      console.log(value);
      if (!reg.test(value) && value !== "") return;

      let tempV = value.split("");
      if (tempV.length > 8) return;
      if (tempV.length > 1) {
        tempV.splice(2, 0, "-");
      }
      if (tempV.length > 4) {
        tempV.splice(5, 0, "-");
      }
      setV(tempV.join(""));
      return;
    }
    setV(value);
  }

  function onBlur(e) {
    let { type, value, required } = e.target;
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if (required && !value) {
      setErrorMessage("This field is required");
      return;
    }

    if (type === "email") {
      if (!value.match(pattern)) {
        setErrorMessage(
          "Please enter provide email address. Ex : email@gmail.com"
        );
        return;
      }
    }

    setErrorMessage("");
  }

  return (
    <>
      <StyledInfoInput borderBottom={borderBottom}>
        <div>
          <i className={"icon icon-" + icon}></i>
        </div>
        <div>
          {textarea ? (
            <textarea
              placeholder={placeholder}
              value={v}
              onChange={changeV}
              onBlur={onBlur}
              rows={3}
              {...props}
            />
          ) : (
            <input
              placeholder={placeholder}
              value={v}
              onChange={changeV}
              onBlur={onBlur}
              {...props}
            />
          )}
        </div>
      </StyledInfoInput>
      <StyledError>
        {errorMessage && showErrorMessage && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </StyledError>
    </>
  );
}

const StyledInfoInput = styled.div`
  padding: 5px 38px;
  display: -ms-grid;
  display: grid;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  grid-template-columns: 15px auto;

  ${({ borderBottom }) =>
    borderBottom &&
    css`
      border-bottom: 1px solid #9a9ca6;
    `}

  & > div {
    & > input,
    & > textarea {
      color: #ffffff;
      font-size: 12px;
      font-weight: 300;
      font-style: normal;
      letter-spacing: normal;
      line-height: 18.01px;
      background-color: transparent;
      width: 100%;
      border: none;
      outline: none;
      margin-left: 18px;
      &::placeholder {
        color: #fff;
      }
    }

    &:first-of-type {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;

      & > i {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

const StyledError = styled.div`
   {
    padding: 0px 38px;
  }
`;
