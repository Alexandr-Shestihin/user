import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UploadAvatar from "../../../components/upload-avatar";
import profLogo from "../../../assets/images/bg.png";
import baner from "../../../assets/images/euroevent25may.jpg";

import { connect } from "react-redux";
import { showQrModal, getUserData } from "../../../redux/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import { dataUriToBlob } from "../../../helpers";
import getPublicUserProfile from "../../../helpers/user/getPublicUserProfile";
import { API, API_ROUTER } from "../../../api";
import { handleLoadAvatar } from "../../team-settings/const";
import { useHistory, useParams } from "react-router-dom";

const Top = ({
   user,
   dispatchShowQrModal,
   userOnline,
   history,
   runGetUserData,
   userData,
   isEditMode = false,
}) => {
   const openModal = (e) => {
      e.preventDefault();
      dispatchShowQrModal();
   };
   const [userProfile, setUserProfile] = useState();
   const [heart, tongleHeart] = useState("false");
   const [image, setImage] = useState(null);
   console.log(userData);
   let { id } = useParams();

   useEffect(() => {
      if (userData?.id === undefined && id === undefined) {
         return;
      }
      chekUserProfile();
   }, []);

   const chekUserProfile = () => {
      getPublicUserProfile(id)
         .then((res) => {
            setUserProfile(res);
         })
         .catch((e) => {
            console.log(e);
         });
   };

   const imgSet = (file) => {
      setImage(() => file);
   };

   function changeImg(e) {
      const file = e.target.files[0];
      if (file) {
         const params = {
            ...API_ROUTER.user.setUserData,
         };

         const formData = new FormData();

         formData.append("media", file);
         formData.append("mediaType", "userAvatar");
         formData.append("mediaOwnerId", userData.uuid);

         const avatarParams = {
            ...API_ROUTER.media.setAvatar,
            headers: {
               "Content-type": "multipart/form-data",
            },
            data: formData,
         };

         return API.request(avatarParams, true)
            .then((res) => {
               console.log("avatarParams", avatarParams);
               console.log("res in uploading avatar", res);
            })
            .catch((e) => {
               console.log("params", avatarParams);
               console.log("avatarParams", avatarParams);
               console.log("e in avatar request", e);
            });
      }
   }

   /*TODO change for backend*/
   const imageSelect = (event) => {
      const file = event.target.files[0];
      console.log("file in imageSelect", file);
      if (file) {
         //handleLoadAvatar(file, imgSet);
         imgSet(file);
      }

      changeImg(userData.uuid);
   };

   const check = () => {
      console.log("image", image);
   };

   function isCreator() {
      return userProfile?.id === userData?.id;
   }
   const tongHeart = () => {
      if (heart) {
         tongleHeart(false);
      } else tongleHeart(true);
   };

   return (
      <StyledTop>
         <section></section>

         <section>
            {/* {isCreatorConditionRendering(
          <>
            <div className="follow">
              <i
                className="icon icon-follow"
                style={{
                  background: "var(--dark)",
                  width: "40px",
                  height: "34px",
                }}
              />
            </div>
          </>
        ) || ( */}
            <>
               <div onClick={() => check()} className="edit__banner">
                  {/* <i
                className="icon icon-pencil"
                style={{ width: "19px", height: "22px" }}
              />
              <p>
                <Link to="/teams/edit">
                  <FormattedMessage id="settings.editBanner.profile" />
                </Link>
              </p> */}

                  <a
                     href={
                        userData?.sites[0]?.url
                           ? userData?.sites[0].url
                           : "https://www.facebook.com"
                     }
                  >
                     <i className="icon icon-facebook" />
                  </a>
               </div>
            </>
            {/* )} */}
            {isCreator() ? (
               <>
                  <div>
                     <img
                        className="profile-avatar"
                        src={userData?.avatar ? userData?.avatar : profLogo}
                     ></img>
                  </div>
                  <div>
                     <i
                        className="icon icon-qr"
                        style={{
                           width: "58px",
                           height: "58px",
                           background: "var(--icon)",
                        }}
                        onClick={openModal}
                     />
                  </div>
               </>
            ) : (
               <>
                  <div>
                     <img
                        className="profile-avatar"
                        src={userProfile?.avatar ? userProfile?.avatar : profLogo}
                     ></img>
                  </div>
                  <div>
                     <i
                        className="icon icon-qr"
                        style={{
                           width: "58px",
                           height: "58px",
                           background: "var(--icon)",
                        }}
                        onClick={openModal}
                     />
                  </div>
               </>
            )}
         </section>

         <section>
            {isCreator() ? (
               <>
                  <div>
                     <p>{userData?.nickname || ""}</p>
                     {/*<i*/}
                     {/*  className="icon icon-pencil"*/}
                     {/*  style={{ width: "19px", height: "22px" }}*/}
                     {/*/>*/}
                  </div>
               </>
            ) : (
               <div>
                  <p>{userProfile?.nickname || ""}</p>
                  {/*<i*/}
                  {/*  className="icon icon-pencil"*/}
                  {/*  style={{ width: "19px", height: "22px" }}*/}
                  {/*/>*/}
               </div>
            )}

            {/* <>{UserCard(userInfo).defaultCard}</> */}

            <div>
               <div className="with__borde">
                  <p className="under-construction">
                     0 <FormattedMessage id="id.followers" /> [COMING SOON]
                  </p>

                  {user && (
                     <>
                        <p className="left__border">
                           {" "}
                           3800 <FormattedMessage id="id.eraPoints" />
                        </p>
                     </>
                  )}
               </div>
               <p style={{ fontSize: "15px", paddingBottom: "10px" }}>
                  <FormattedMessage id="id.bio" /> {userData?.about}
               </p>
               <p style={{ color: "gold", fontSize: "15px" }}>
                  Classification : Professional
               </p>
            </div>
         </section>

         <section>
            {isCreator() ? (
               <>
                  <div className="edit__wrapper">
                     <i className="icon icon-user-edit" />
                     <p>
                        <Link to="/profile/settings">
                           <FormattedMessage id="id.editProfile" />
                        </Link>
                     </p>
                  </div>
               </>
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
         </section>
      </StyledTop>
   );
};

const mapStateToProps = (state) => {
   return {
      userData: state.userData,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      runGetUserData: () => dispatch(getUserData()),
      dispatchShowQrModal: () => dispatch(showQrModal()),
   };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Top));

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
      padding-left: 30px;

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
    .profile-avatar {
      width: 132px;
      height: 132px;
      border-radius: 50%;
      display: inline-block;
      background-size: cover;
      position: relative;
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
      .profile-avatar {
        width: 120px;
        height: 120px;
      }
    }
  }
`;
