import React, { useState } from "react";
import styled from "styled-components";

//
import TitleRow from "../../components/title-row";
import SelectCountry from "../../components/select-country";
import SelectLang from "../../components/select-lang";
import SelectGame from "../../components/select-game";
import Button from "../../components/UI/buttons/buttons-login_register";
import { countries } from "./static";

export default function AddRoster() {
  const [country, setCountry] = useState(countries[0]);
  const [lang, setLang] = useState([...countries.map((i) => i.id)]);

  function changeCountry(id) {
    const selectedCountry = countries.find((i) => i.id === id);
    setCountry({ ...selectedCountry });
  }

  function changeLang(id) {
    let tempLang = [...lang];
    if (tempLang.includes(id)) {
      if (tempLang.length > 1) {
        tempLang = tempLang.filter((i) => i !== id);
      }
    } else {
      tempLang = [...tempLang, id];
    }
    setLang([...tempLang]);
  }

  return (
    <StyledAddRoster>
      <div className="add__roster__title">
        <h1>CREATE ROSTER</h1>
      </div>
      <TitleRow title="SELECT THE COUNTRY" />
      <div className="country__select">
        <SelectCountry
          value={country}
          options={countries}
          onChange={changeCountry}
        />
      </div>
      <TitleRow title="SELECT THE SPEAKING LANGUAGE" />
      <div className="lang__select">
        <SelectLang value={lang} options={countries} onChange={changeLang} />
      </div>
      <TitleRow title="SELECT THE DISCIPLINE" />
      <div className="game__select">
        <SelectGame />
      </div>
      <div className="edit__roster">
        <div>
          <div>
            <i
              className="icon icon-pencil"
              style={{ width: "15px", height: "17px" }}
            />
          </div>
          <p>Roster name</p>
        </div>
      </div>
      <div className="btn__group">
        <Button active size="sm" color="yellow">
          APPLY
        </Button>
        <Button active size="sm">
          CANCEL
        </Button>
      </div>
    </StyledAddRoster>
  );
}

const StyledAddRoster = styled.div`
  background-color: #1a1a1a;
  min-height: 100vh;

  & > .add__roster__title {
    padding: 25px 23px;
    & > h1 {
      color: #f6a020;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: 23.99px;
      text-align: left;
      text-transform: uppercase;
    }
  }

  & > .country__select,
  & > .lang__select,
  & > .game__select {
    padding: 0 23px;
  }

  & > .edit__roster {
    border-top: 1px solid #9a9ca6;
    padding: 20px 23px;
    box-shadow: 0 12px 13px 0px #00000075;

    & > div {
      display: flex;
      align-items: center;

      & > p {
        font-size: 12px;
        font-weight: 300;
        font-style: normal;
        letter-spacing: normal;
        line-height: 17.99px;
        margin-left: 16px;
      }
    }
  }

  & > .btn__group {
    padding: 20px 23px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > button {
      padding: 10px 38px;
    }
  }
`;
