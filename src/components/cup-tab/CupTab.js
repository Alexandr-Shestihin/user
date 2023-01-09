import React from "react";
import styled from "styled-components";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation, useParams } from "react-router-dom";

export default function CupTab(props) {
  // router
  const history = useHistory();
  const { pathname } = useLocation();
  // method
  function goToUrl(url) {
    history.push(url);
  }
  return (
    <StyledCupTab className="b-shadow">
      <ul /*style={{ justifyContent: "space-between" }}*/>
        {props.nav__list.map((i) => (
          <li
            key={i.id}
            onClick={() => goToUrl(i.to)}
            className={cl({
              active:
                i.to === pathname || i.to1 === pathname || i.to2 === pathname,
            })}
          >
            {i.title}
          </li>
        ))}
      </ul>
    </StyledCupTab>
  );
}

const StyledCupTab = styled.div`
  background-color: #333333;
  ${"" /* TODO color + border*/}
  ${"" /* background: rgb(32, 25, 65); */}

  ${"" /* border: solid 1px rgb(43, 36, 74); */}
  border-radius: 10px;
  overflow-x: auto;
  padding: 12px 24px 15px;

  &::-webkit-scrollbar {
    height: 0;
  }

  & > ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 36px;
    min-width: 550px;

    & > li {
      font-size: 14px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -0.55px;
      line-height: normal;
      padding-bottom: 5px;
      border-bottom: 1px solid transparent;
      transform: translateY(3px);
      cursor: pointer;

      &:last-of-type {
        margin-right: 24px;
      }

      &.active {
        border-color: var(--yellow);
      }
    }
  }
`;
