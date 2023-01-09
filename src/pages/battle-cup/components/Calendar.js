import React, { useState } from "react";
import styled from "styled-components";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { FormattedMessage, injectIntl } from "react-intl";

//
const weekDays = [
  { id: uuidv4(), day: "Mon", date: 3 },
  { id: uuidv4(), day: "Tue", date: 4 },
  { id: uuidv4(), day: "Wed", date: 5 },
  { id: uuidv4(), day: "Thu", date: 6 },
  { id: uuidv4(), day: "Fri", date: 7 },
  { id: uuidv4(), day: "Sat", date: 8 },
  { id: uuidv4(), day: "Sun", date: 9 },
];

export default function Calendar() {
  const [active, tongleActive] = useState("false");
  const tongActive = (id) => {
    tongleActive(id);
  };
  return (
    <StyledCalendar>
      <h1>JANVIER 2022</h1>
      <div className="calendar">
        <i className="icon icon-calendar" />
      </div>
      <ul className="week__days">
        {weekDays.map((day) => (
          <li
            onClick={() => tongActive(day.id)}
            key={day.id}
            className={cl({
              active: active === day.id,
            })}
          >
            <p>{day.day}</p>
            <p>{day.date}</p>
          </li>
        ))}
      </ul>
    </StyledCalendar>
  );
}

const StyledCalendar = styled.div`
  padding-top: 10px;
  position: relative;

  & > h1 {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: -0.87px;
    line-height: normal;
    margin-bottom: 10px;
  }

  & > .calendar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 25px;
  }

  & > .week__days {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    gap: 16px;

    & > li {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      border-radius: 6px;
      gap: 3px;
      padding: 5px 11px;
      min-width: 50px;
      cursor: pointer;

      &.active {
        background-color: #373737;
      }
    }
  }

  @media (max-width: 576px) {
    & > .week__days {
      display: -ms-grid;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
  }
`;
