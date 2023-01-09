import React, { useState } from "react";
import styled, { css } from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import cl from "classnames";

export default function SelectCountry({
  value,
  options,
  onChange,
  hideFlags,
  padding,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function changeIsOpen(v) {
    setIsOpen(v);
  }

  function changeValue(id) {
    onChange(id);
    changeIsOpen(false);
  }

  return (
    <OutsideClickHandler onOutsideClick={() => changeIsOpen(false)}>
      <StyledSelectCountry isOpen={isOpen} padding={padding}>
        <section>
          <div>
            <i
              className="icon icon-globus"
              style={{ width: "15px", height: "15px" }}
            />
            <p>{value.name}</p>
          </div>
          <div>
            <img
              src={value.flag}
              alt="flag"
              className={cl("", {
                hide: hideFlags,
              })}
            />
            <i
              className="icon icon-circle-arrow-down"
              style={{ width: "15px", height: "15px" }}
              onClick={() => changeIsOpen(!isOpen)}
            />
          </div>
        </section>
        <section>
          <ul>
            {options.map((i) => (
              <li key={i.id} onClick={() => changeValue(i.id)}>
                <p>{i.name}</p>
                <img src={i.flag} alt="flag" />
              </li>
            ))}
          </ul>
        </section>
      </StyledSelectCountry>
    </OutsideClickHandler>
  );
}

const StyledSelectCountry = styled.div`
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
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        gap: 1rem;

        & > p {
          font-size: 12px;
          font-weight: 300;
          font-style: normal;
          letter-spacing: normal;
          line-height: 17.99px;
        }

        & > img {
          &.hide {
            display: none;
          }
        }
      }
    }

    &:last-of-type {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      transform: translateY(100%);
      display: none;
      z-index: 2;

      & > ul {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 10px;
        padding: 25px 32px;
        background-color: var(--dark);

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
          cursor: pointer;

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
