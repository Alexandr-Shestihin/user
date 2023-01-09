import React from 'react';
import s from './style.module.css'
import ProfileHeader from "./profile_header";
import ProfileAction from "./profile_actions";

import {Button, Modal, ModalSubTitle, ModalTitle} from "../../../components/UI";
import qr from '../../../assets/images/09-gray.svg'
import {FormattedMessage} from "react-intl";
import {Styled} from "../../../components/auth-modal/style";
import {
    hideQrModal
} from "../../../redux/actions";
import {connect} from "react-redux";

const Profile = ({ showQrModal, dispatchHideQrModal }) => {
    return (
        <div className={s.profile}>
            <ProfileHeader/>
            <ProfileAction/>

            <Modal className="modal__wrapper" isTransparent={true} open={showQrModal} onClose={dispatchHideQrModal}>
                <div className="modal">
                    <ModalTitle>
                        <FormattedMessage id="gamer.id.card" />
                    </ModalTitle>
                    <div className="qr">
                        <img className="qr__img" src={qr} alt="QR code"/>
                    </div>
                    <Styled.ButtonHolder>
                        <button className="form__submit" onClick={dispatchHideQrModal}><FormattedMessage id="gamer.id.card.btn.close" /></button>
                    </Styled.ButtonHolder>
                </div>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        showQrModal: state.showQrModal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchHideQrModal: () => dispatch(hideQrModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
