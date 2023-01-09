import React, { useRef, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import Wrapper from "../../components/wrapper";
import PersonalInfo from "./Info";
import {Modal} from "../../components/UI";
import owl from "../../assets/images/owl-eye.png";
import qr from "../../assets/images/qr-code.png";
import {Styled} from "../../components/auth-modal/style";
import {FormattedMessage} from "react-intl";
import {hideQrModal} from "../../redux/actions";

const Settings = (props) => {
  const gamesRef = useRef(null);
  const userData = useSelector((state) => state.userData);
  const scrollTo = useSelector((state) => state.scrollTo);

  // scroll to games on nav click
  useEffect(() => {
    if (scrollTo === "games") {
      gamesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollTo]);

  if (!userData) return false;

  return (
      <Wrapper>
        <PersonalInfo {...props} />

        <Modal
            className="modal__wrapper"
            isTransparent={true}
            open={props.showQrModal}
            onClose={props.dispatchHideQrModal}
        >
          <div className="modal">
            <img className="qr__owl-eye" src={owl} alt="owl-eye" />
            <p className="qr__title">Gamer id Card</p>
            <div className="qr">
              <img className="qr__img" src={qr} alt="QR code" />
            </div>
            <Styled.ButtonHolder>
              <button className="qr__hide-qr" onClick={props.dispatchHideQrModal}>
                <FormattedMessage id="gamer.id.card.btn.close" />
              </button>
            </Styled.ButtonHolder>
          </div>
        </Modal>

      </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    showQrModal: state.showQrModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchHideQrModal: () => dispatch(hideQrModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
