import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cl from "classnames";
import UploadAvatar from "../../../components/upload-avatar";
import { getUserData, showQrModal } from "../../../redux/actions";
import { connect } from "react-redux";
import { API, API_ROUTER } from "../../../api";
import { teamCard } from "../../../components/cards/teamCard";

const Top = ({ team, isCreator, history, dispatchShowQrModal }) => {
   // const [teamInfo, setInfo] = useState([]);

   // useEffect(() => {
   //   API.request({
   //     ...API_ROUTER.teams.getTeamDetails,
   //     pathKeys: {
   //       teamId: "01G2YVVDBXWQHY2RK6BBHAN2CR",
   //       // team?.id,
   //     },
   //   })
   //     .then((res) => {
   //       setInfo(res);
   //     })
   //     .catch((err) => console.log(err));
   // }, [team]);
   // console.log(teamInfo);
   const openModal = (e) => {
      e.preventDefault();
      dispatchShowQrModal();
   };
   const [heart, tongleHeart] = useState("false");

   const tongHeart = () => {
      if (heart) {
         tongleHeart(false);
      } else tongleHeart(true);
   };
   function isCreatorConditionRendering(node) {
      return isCreator() ? node : "";
      /* return node; */
   }

   function goToEditForm() {
      history.push(`/teams/edit/${team.id}`);
   }
   return (
      <StyledTop>
         <section></section>

         <section>
            <div className="edit__banner">
               {/*{*/}
               {/*  isCreatorConditionRendering(*/}
               {/*    <>*/}
               {/*      <i*/}
               {/*          className="icon icon-pencil"*/}
               {/*          style={{width: "19px", height: "22px"}}*/}
               {/*      />*/}
               {/*      <p>EDIT BANNER</p>*/}
               {/*    </>*/}
               {/*  )*/}
               {/*}*/}
            </div>
            <div>
               <UploadAvatar image={team?.logo} conditionRendering={() => ""} />
            </div>
            <div onClick={openModal}>
               <i
                  className="icon icon-qr"
                  style={{ width: "58px", height: "58px", background: "var(--icon)" }}
               />
            </div>
         </section>

         <section>
            <div>
               <p>Team : {team?.name} </p>
            </div>
            <>{teamCard(team).defaultCard}</>

            <div>
               <div className="with__borde">
                  <p className="under-construction">0 FOLLOWERS [COMING SOON] </p>
               </div>
               <div className="hr__border"></div>
               <p style={{ color: "silver", fontSize: "15px" }}>
                  Classification : Amateur
               </p>

               <p>{team?.description}</p>
            </div>
         </section>
         <section>
            <>
               <div className="unfollow">
                  {team?.hasAccessEdit ? (
                     <div className="edit__banner" onClick={goToEditForm}>
                        <i
                           className="icon icon-pencil"
                           style={{ width: "19px", height: "22px" }}
                        />
                        <p>EDIT TEAM</p>
                     </div>
                  ) : (
                     <>
                        <div className="unfollow">
                           <div
                              className="community-page__decoration-heart"
                              onClick={() => tongHeart()}
                           >
                              <div
                                 className={
                                    heart
                                       ? "decoration-heart__image"
                                       : "decoration-heart__image decoration-heart__image--active"
                                 }
                              ></div>
                              <p className="decoration-heart__tongler">
                                 {heart ? "follow" : "unfollow"}
                              </p>
                           </div>
                        </div>
                     </>
                  )}
               </div>
            </>
         </section>
      </StyledTop>
   );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
   return {
      dispatchShowQrModal: () => dispatch(showQrModal()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);

const StyledTop = styled.div`
  padding: 18px 23px 50px;
  position: relative;

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
      margin-bottom: 22px;

      & > div {
        &:last-of-type {
          position: relative;

          &::after {
            content: "";
            position: absolute;
            width: 11px;
            height: 11px;
            background-color: var(--red);
            border-radius: 50%;
            top: 2px;
            right: -2px;
          }
        }
      }
    }

    &:nth-child(2) {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    &:nth-child(3) {
      width: 68%;
      margin: 0 auto;
      margin-top: 16px;
      min-width: 300px;

      & > div {
        &:first-of-type {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          margin-bottom: 11px;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;

          & > p {
            font-size: 28px;
            font-weight: bold;
            font-style: normal;
            letter-spacing: -1.08px;
            line-height: normal;
            margin-right: 24px;
          }
        }

        &:last-of-type {
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
              padding-bottom: 9px;
              margin-bottom: 7px;

              &.with__border {
                border-bottom: 1px solid var(--text);
              }

              & > p {
                color: var(--yellow);
                font-size: 12px;
                font-weight: bold;
                font-style: normal;
                letter-spacing: -0.46px;
                line-height: normal;
                padding: 0 7px;

                &.left__border {
                  border-left: 1px solid var(--text);
                }
              }
            }
          }

          & > .hr__border {
            height: 1.5px;
            width: 50%;
            min-width: 300px;
            margin: 0 auto;
            margin-bottom: 8px;
            background-color: var(--icon);
          }

          & > p {
            font-size: 12px;
            font-weight: bold;
            font-style: normal;
            letter-spacing: -0.46px;
            line-height: normal;
            text-align: center;
            color: var(--text);
          }
        }
      }
    }

    &:last-of-type {
      position: absolute;
      bottom: 0;
      right: 25px;

      & > .edit__wrapper {
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
        cursor: pointer;

        & > p {
          font-size: 12px;
          font-weight: bold;
          font-style: normal;
          letter-spacing: -0.47px;
          line-height: normal;
          text-decoration: underline;
          margin-top: 4px;
        }
      }
      & > .unfollow {
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

        & > p {
          font-size: 9px;
          font-weight: bold;
          font-style: normal;
          letter-spacing: -0.35px;
          line-height: normal;
          margin-top: 3px;
        }
      }
    }

    .edit__banner {
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
      cursor: pointer;
      min-width: 78px;
      min-height: 22px;

      &:hover {
        cursor: pointer;
      }

      & > p {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        font-style: normal;
        letter-spacing: -0.47px;
        line-height: normal;
        text-decoration: underline;
        margin-top: 3px;
      }
    }

    .follow {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background-color: var(--white);
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      cursor: pointer;

      .hide {
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      }
    }
  }

  @media (max-width: 400px) {
    padding: 16px 16px 50px;

    & > section {
      &:nth-child(2) {
        justify-content: space-between;

        & > div {
          &.edit__banner {
            & > p {
              font-size: 10px;
            }

            & > .icon-pencil {
              width: 18px !important;
              height: 20px !important;
            }
          }

          &.follow {
            width: 48px;
            height: 48px;

            & > i.icon-follow {
              width: 32px !important;
              height: 28px !important;
            }
          }
        }

        .icon-qr {
          width: 52px !important;
          height: 52px !important;
        }
      }
    }
  }
`;
