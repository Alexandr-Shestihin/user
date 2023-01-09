import React, { useState, useEffect } from "react";
import { Modal } from "../../components/UI";
import { Styled } from "../../components/auth-modal/style";
import { FormattedMessage } from "react-intl";
import { hideQrModal } from "../../redux/actions";
import { connect } from "react-redux";
import qr from "../../assets/images/qr-code.png";
import owl from "../../assets/images/owl-eye.png";
import Dashboard from "./Dashboard";
import { API, API_ROUTER } from "../../api";
import { useHistory, useParams } from "react-router-dom";
import getPublicUserProfile from "../../helpers/user/getPublicUserProfile";

const Profile = (props) => {
   const { showQrModal, dispatchHideQrModal, userData } = props;
   const [userQr, setUserQr] = useState("");
   const [userProfile, setUserProfile] = useState();
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
   function isCreator() {
      return userProfile?.id === userData?.id;
   }
   useEffect(() => getQR(), [userData]);
   function getQR() {
      let userId = id;
      if (id !== undefined) {
         API.request({
            ...API_ROUTER.user.getUserQR,
            pathKeys: { userId },
         })
            .then((res) => {
               setUserQr(res.url);
            })
            .catch((err) => console.log(err));
      } else {
         setUserQr(qr);
      }
   }
   return (
      <>
         <Dashboard {...props} isCreator={isCreator} id={id} />

         <Modal
            className="modal__wrapper"
            isTransparent={true}
            open={showQrModal}
            onClose={dispatchHideQrModal}
         >
            <div className="modal">
               <img className="qr__owl-eye" src={owl} alt="owl-eye" />
               <p className="qr__title">Gamer id Card</p>
               <div className="qr">
                  <img
                     className="qr__img"
                     src={userQr}
                     alt="QR code"
                     style={{ borderRadius: "15px" }}
                  />
               </div>
               <Styled.ButtonHolder>
                  <button className="qr__hide-qr" onClick={dispatchHideQrModal}>
                     <FormattedMessage id="gamer.id.card.btn.close" />
                  </button>
               </Styled.ButtonHolder>
            </div>
         </Modal>
      </>
   );
};

const mapStateToProps = (state) => {
   return {
      showQrModal: state.showQrModal,
      userData: state.userData,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      dispatchHideQrModal: () => dispatch(hideQrModal()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
