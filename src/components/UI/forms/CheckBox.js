import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ErrorMessage from "../blocks/ErrorMessage";

const check = () => (
  <svg
    enableBackground="new 0 0 78.369 78.369"
    version="1.1"
    viewBox="0 0 78.369 78.369"
  >
    <path d="m78.049 19.015-48.591 48.591c-0.428 0.428-1.121 0.428-1.548 0l-27.59-27.591c-0.427-0.426-0.427-1.119 0-1.547l6.704-6.704c0.428-0.427 1.121-0.427 1.548 0l20.113 20.112 41.113-41.113c0.429-0.427 1.12-0.427 1.548 0l6.703 6.704c0.428 0.427 0.428 1.119 0 1.548z" />
  </svg>
);

const StyledCheckBox = styled.div`
    display: flex;
    align-items: flex-start;
    min-height: 20px;

    label {
      cursor: pointer;
      font-size: 12px;
      line-height: 21px;
      color: var(--main-text--active);
      padding-left: 24px;

      a {
        display: inline-block;
        color: var(--main-text--active);
        text-decoration: none;
        font-weight: bold;

        &:hover,
        &focus {
          color: #eda211;
          text-decoration: underline;
        }
      }

      & > p {
        margin-left: 20px;
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        letter-spacing: normal;
        line-height: normal;

        & > a {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }

    input {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }

    input + span {
      display: block;
      position: absolute;
      top: 1px;
      left: 0;
      width: 20px;
      height: 20px;
      background: white;
      border: none;
      transition: background-color 0.3s ease;

      & + span {
        position: absolute;
        top: 0px;
        left: 1px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;

        svg {
          width: 20px;
          display: block;
          position: relative;
          top: 1px;

          path {
            fill: var(--main-text--active);
          }
        }
      }
    }

    input:disabled + span {
      opacity: 0.5;
      pointer-events: none;
    }

    input:checked + span + span {
      opacity: 1;
    }
  `,
  Holder = styled.div`
    position: relative;
  `;

export default function CheckBox({
  children,
  name,
  checked = false,
  onChange,
  error,
  disabled = false,
  required,
}) {
  return (
    <Holder>
      <StyledCheckBox>
        <label>
          <input
            required={required}
            type="checkbox"
            disabled={disabled}
            name={name}
            checked={checked}
            onChange={onChange}
          />
          <span />
          <span>{check()}</span>
          {children}
        </label>
      </StyledCheckBox>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Holder>
  );
}

CheckBox.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};
