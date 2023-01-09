import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";

//
import Button from "../../components/UI/buttons/buttons-login_register/button/Button";
import pubg_logo from "../../assets/images/pubg.png";

export default function CupInformation({ tournament }) {
  return (
    <StyledCupInformation>
      <section className="tour__rules">
        <h1>
          <FormattedMessage id="battlecup.information.tournamentRules" />
        </h1>
        <ul>
          {/* <li>
            {tournament?.details?.rules || "No rules for this tournament."}
          </li> */}
          <li>
            <a
              style={{ color: "orange" }}
              href="https://pwiszedma-com.s3.eu-central-1.amazonaws.com/kz/Competition+regulation_+2022.pdf"
              target="_blank"
            >
              Competition Regulation
            </a>
          </li>
          <li>
            <a
              style={{ color: "orange" }}
              target="_blank"
              href="https://pwiszedma-com.s3.eu-central-1.amazonaws.com/kz/Official+rulebook+ready_2022_.pdf
"
            >
              Official Rulebook
            </a>
          </li>
        </ul>
      </section>

      {/* <section className="btn__wrapper">
        <Button active type="cupbottom">
          <FormattedMessage id="battlecup.information.registrationButton" />
        </Button>
      </section> */}
    </StyledCupInformation>
  );
}

const StyledCupInformation = styled.div`
  padding: 25px;

  & > section {
    &.reg__period {
      background-color: var(--white);
      display: -ms-grid;
      display: grid;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      grid-template-columns: 50px auto;
      gap: 16px;
      padding: 14px 0 14px 14px;
      border-radius: 16px;
      margin-bottom: 16px;

      & > div {
        &:first-of-type {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
        & > i {
          width: 48px;
          height: 48px;
          background-color: #3e4349;
        }

        & > p {
          color: #231f20;
          font-size: 16px;
          font-weight: bold;
          font-style: normal;
          letter-spacing: -0.61px;
          line-height: normal;
          padding: 2px 0;

          &:first-of-type {
            border-bottom: 1px solid grey;
          }
        }
      }
    }

    &.tour__details {
      margin-bottom: 16px;
      background-color: #333333;
      padding: 11px;
      border-radius: 10px;
      display: -ms-grid;
      display: grid;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      grid-template-columns: 65px auto;
      gap: 16px;

      & > div {
        &:first-of-type {
          & > img {
            width: 62px;
            height: auto;
          }
        }

        &:last-of-type {
          text-align: center;

          & > h1 {
            font-size: 16px;
            font-weight: 400;
            font-style: normal;
            letter-spacing: -0.61px;
            line-height: normal;
            border-bottom: 1px solid grey;
            padding-bottom: 5px;
            width: max-content;
            margin: 0 auto;
            margin-bottom: 5px;
          }

          & > p {
            font-size: 13px;
            font-weight: 300;
            font-style: normal;
            letter-spacing: -0.51px;
            line-height: normal;
          }
        }
      }
    }

    &.tour__rules {
      background-color: #333333;
      ${"" /* TODO color  */}
      ${"" /* background: rgb(43, 36, 74); */}
      border-radius: 10px;

      padding: 10px 18px;
      margin-bottom: 16px;

      & > h1 {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: -0.61px;
        line-height: normal;
        border-bottom: 1px solid grey;
        padding-bottom: 5px;
        margin-bottom: 5px;
      }

      & > ul {
        li {
          font-size: 13px;
          font-weight: 300;
          font-style: normal;
          letter-spacing: -0.51px;
          line-height: normal;
          margin: 10px;
        }
      }

      & > a {
        color: #f7a01d;
        font-size: 11px;
        font-weight: 300;
        font-style: normal;
        letter-spacing: -0.41px;
        line-height: normal;
        display: block;
        width: max-content;
        margin-left: auto;
        margin-top: 5px;
      }
    }

    &.cash__prize {
      background-color: #333333;
      border-radius: 10px;
      padding: 10px 18px;
      margin-bottom: 25px;

      & > h1 {
        font-size: 16px;
        font-weight: 400;
        font-style: normal;
        letter-spacing: -0.61px;
        line-height: normal;
        border-bottom: 1px solid grey;
        padding-bottom: 5px;
        margin-bottom: 5px;
      }

      & > ul {
        li {
          font-size: 13px;
          font-weight: normal;
          font-style: normal;
          letter-spacing: -0.51px;
          line-height: 16px;
        }
      }
    }

    &.btn__wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    }
  }
`;
