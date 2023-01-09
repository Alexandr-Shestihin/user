import React from "react";
import styled from "styled-components";
import { useParams, withRouter } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
//
import Button from "../UI/buttons/buttons-login_register/button/Button";
import CupTab from "../cup-tab";
import bg_pubg from "../../assets/images/pubg_banner.png";
import azerbaijan from "../../assets/images/azerbaijan.png";

import { convertDate } from "../../helpers/dates-formatter";

const navList = (id) => [
  { id: uuidv4(), title: "INFORMATION", to: `/battleCup/${id}/information` },
  { id: uuidv4(), title: "RULES", to: `/battleCup/${id}/rules` },
  { id: uuidv4(), title: "PARTICIPANTS", to: `/battleCup/${id}/participants` },
  { id: uuidv4(), title: "MATCHES", to: `/battleCup/${id}/matches` },
  {
    id: uuidv4(),
    title: "BRACKET",
    // to1: `/battleCup/${id}/bracket/preliminary_tournament`,
    to: `/battleCup/${id}/bracket/group_stage`,
    to1: `/battleCup/${id}/bracket/play_off`,
  },
  { id: uuidv4(), title: "STATISTICS", to: `/battleCup/${id}/statistics` },
];

export function Top(props) {
  let { tournament } = props;

  let { id } = useParams();

  return (
    <StyledTop>
      <StyledTopBanner bg={tournament?.media?.pageHeaderBanner}>
        <div className="body">
          <div />
          {/*<h1>{tournament?.name || "Tournament"}</h1>*/}
          <img width={40} src={azerbaijan} alt="azerbaijan" className="c-p" />
        </div>
      </StyledTopBanner>
      <StyledNews>
        <p>
          <h2>{tournament?.name || "Tournament"}</h2> <br />{" "}
          <h3>Regional CUP</h3>
          {convertDate(tournament?.activeAt)} | Azerbaijan
        </p>
        <Button active type="cuptop" status={tournament?.status}>
          {/*<FormattedMessage id="battlecup.component.top.buttonRegister" />*/}

          <p style={{ fontSize: "12px" }}>
            {tournament?.status || "Not actual"}
          </p>
        </Button>
      </StyledNews>
      <CupTab nav__list={navList(id)} />
    </StyledTop>
  );
}

export default withRouter(Top);

const StyledTop = styled.div``;

const StyledTopBanner = styled.div`
  background: ${({ bg }) => `url(${bg}) no-repeat center top`};
  background-color: var(--footer-back);
  background-size: cover;
  min-height: 300px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;

  & > .left__logo {
    img {
      position: absolute;
      top: 18px;
      left: 18px;
    }
  }

  & > .body {
    width: 100%;
    padding: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

    & > h1 {
      text-transform: uppercase;
      font-size: 26px;
      font-weight: bold;
      font-style: normal;
      letter-spacing: -1.01px;
      line-height: normal;
    }
  }
`;

const StyledNews = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 16px;

  & > p {
    font-size: 15px;
    font-weight: bold;
    font-style: normal;
    letter-spacing: -0.59px;
    line-height: normal;
  }
`;
