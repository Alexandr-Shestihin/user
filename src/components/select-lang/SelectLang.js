import React, { useState } from "react";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import cl from "classnames";

//
import Radio from "../radio/Radio";
import { css } from "styled-components";

export default function SelectLang({
  value,
  options,
  onChange,
  padding,
  hideFlags,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function changeIsOpen(v) {
    setIsOpen(v);
  }

  function getTitle() {
    return options
      .filter((i) => value.includes(i.id))
      .map((i) => i.name)
      .join(" | ");
  }

  function getFlags() {
    return options.filter((i) => value.includes(i.id));
  }

  function onChangeVal(id) {
    onChange(id);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => changeIsOpen(false)}>
      <StyledSelectLang isOpen={isOpen} padding={padding}>
        <section>
          <div>
            <i
              className="icon icon-globus"
              style={{ width: "15px", height: "15px" }}
            />
            <p>{getTitle()}</p>
          </div>
          <div>
            <i
              className="icon icon-circle-arrow-down"
              style={{ width: "15px", height: "15px" }}
              onClick={() => changeIsOpen(!isOpen)}
            />
          </div>
        </section>
        <section
          className={cl({
            hide: hideFlags,
          })}
        >
          <ul>
            {getFlags().map((i) => (
              <li key={i.id}>
                <img src={i.flag} alt="flag" />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <ul>
            {options.map((i) => (
              <li key={i.id}>
                <p>{i.name}</p>
                <Radio
                  checked={value.includes(i.id)}
                  onClick={() => onChangeVal(i.id)}
                />
              </li>
            ))}
          </ul>
        </section>
      </StyledSelectLang>
    </OutsideClickHandler>
  );
}

const StyledSelectLang = styled.div`
  position: relative;
  padding: 20px 0;

  ${({ padding }) =>
    padding &&
    css`
      padding: 5px 0;
      margin: 0 38px;
    `}

  & > section {
    &:first-of-type {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;

      & > div {
        &:first-of-type {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          gap: 16px;

          & > p {
            font-size: 12px;
            font-weight: 300;
            font-style: normal;
            letter-spacing: normal;
            line-height: 17.99px;
          }
        }
      }
    }

    &:nth-child(2) {
      padding: 10px 0 0 32px;

      & > ul {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        gap: 16px;
      }

      &.hide {
        display: none;
      }
    }

    &:last-of-type {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      transform: translateY(100%);
      display: none;
      z-index: 2;

      & > ul {
        background-color: var(--dark);
        padding: 25px 32px;

        & > li {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;

          & > p {
            color: #9a9ca6;
            font-size: 12px;
            font-weight: 300;
            font-style: normal;
            letter-spacing: normal;
            line-height: 23.99px;
          }
        }
      }

      ${({ isOpen }) =>
        isOpen &&
        css`
          display: block;
        `}
    }
  }
`;
