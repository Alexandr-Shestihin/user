import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { FormattedMessage, injectIntl } from "react-intl";
//
import Button from "../../components/UI/buttons/buttons-login_register/button/Button";
import { API, API_ROUTER } from "../../api";
import NoImage from "../../assets/no-image.png";

export default function CupParticipants({ tournament }) {
  const [participants, setParticipants] = useState();
  let { id } = useParams();

  useEffect(() => {
    API.request({
      ...API_ROUTER.tournaments.getTournamentMembers,
      pathKeys: {
        tournamentId: id,
      },
    })
      .then((res) => {
        setParticipants(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const getTableRows = () => {
    return participants.members.map((participant, i) => {
      const { user, team } = participant;
      return (
        <tr>
          <td>{i + 1}</td>
          <td>
            <div className="team__td">
              <img
                width={30}
                style={{ borderRadius: "5px" }}
                src={team?.logo || user?.avatar || NoImage}
                alt={team?.name || user?.nickname}
              />
              <p>{team?.name || user?.nickname}</p>
            </div>
          </td>
          {/*<td>*/}
          {/*  <img src={mali} alt="mali" />*/}
          {/*</td>*/}
          {/* <td>5</td> */}
          <td className="lastCell">
            {team?.id ? (
              <Link to={`/teams/team/${team?.id}`}>
                <FormattedMessage id="battlecup.participants.moreInfo" />
              </Link>
            ) : (
              ""
            )}
            {user?.id ? (
              <Link to={`/id/${user?.id}`}>
                <FormattedMessage id="battlecup.participants.moreInfo" />
              </Link>
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <StyledCupPar>
      <table className="table">
        <thead>
          <tr>
            <td>#</td>
            <td>
              <FormattedMessage id="battlecup.participants.team" />
            </td>
            {/*<td>*/}
            {/*  <FormattedMessage id="battlecup.participants.country" />*/}
            {/*</td>*/}
            {/* <td>
              {" "}
              <FormattedMessage id="battlecup.participants.players" />
            </td> */}
            <td className="lastCell">
              <FormattedMessage id="battlecup.participants.info" />
            </td>
          </tr>
        </thead>
        <tbody>
          {participants?.members.length
            ? getTableRows()
            : "There is no participants yes"}
        </tbody>
      </table>
      {/* 
      <section className="btn__wrapper" style={{ paddingLeft: 60 }}>
        <Button active type="cupbottom">
          <FormattedMessage id="battlecup.information.registrationButton" />
        </Button>
      </section> */}
    </StyledCupPar>
  );
}

const StyledCupPar = styled.div`
  padding: 25px 18px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 0;
  }

  & > .table {
    width: 100%;
    border-spacing: 0;
    /* min-width: 450px; */

    & > thead {
      tr {
        td {
          color: #939598;
          font-size: 10px;
          font-weight: bold;
          font-style: normal;
          letter-spacing: -0.39px;
          line-height: normal;
          padding: 5px 14px 15px;
        }
      }
    }

    & > tbody {
      & > tr {
        background-color: #808285;
        ${"" /* TODO color  */}
        ${"" /* background: rgb(43, 36, 74, 0.6); */}

        & > td {
          border: none;
          border-bottom: 1px solid var(--bg);
          padding: 8px 14px;
          font-size: 10px;
          font-weight: 400;
          font-style: normal;
          letter-spacing: -0.39px;
          line-height: normal;

          .team__td {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            gap: 8px;
          }
        }

        &:hover {
          background-color: #58595b;

          & > td {
            &:first-of-type {
              color: var(--yellow);
            }
          }
        }
      }
    }
  }
  .btn__wrapper {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-right: 40px;
    padding-top: 40px;
  }

  .lastCell {
    text-align: end;
  }
`;
