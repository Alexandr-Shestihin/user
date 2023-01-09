import React, {useState} from 'react';
import {connect} from "react-redux";
import {showQrModal} from "../../../../redux/actions";

import s from './style.module.css'
import bg from '../../../../assets/images/bg.png'
import user from '../../../../assets/images/Photo.png'
import edit from '../../../../assets/images/edit.svg'
import alert from '../../../../assets/images/08-gray.svg'
import qr from '../../../../assets/images/09-gray.svg'
import line from "../../../../assets/images/Layer 10.png";

const ProfileHeader = ({ dispatchShowQrModal }) => {
    const openModal = (e) => {
        e.preventDefault();
        dispatchShowQrModal();
    }

    return (
        <div className={s.profile_header}
             style={{background: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            <img src={line} alt="" className={s.line_header}/>
            <div className={s.profile_header__content}>
                <img className={s.profile__img} src={user} alt=""/>
                <div className={s.profile__info}>
                    <div className={s.profile_info__item}>
                        <img src={edit} alt="" className={s.edit}/>
                        <h2>RUBY_N</h2>
                    </div>

                    <div className={s.profile_info__item}>
                        <p>18 FOLLOWERS</p>
                    </div>

                    <div className={s.line}/>
                    <div className={s.profile_info__item}>
                        <img src={edit} alt="" className={s.edit}/>
                        <p>EDIT PROFILE</p>
                    </div>
                    <div className={s.profile_info__item}>
                        <img src={edit} alt="" className={s.edit}/>
                        <p>EDIT BANNER</p>
                    </div>


                </div>
                <div className={s.profile__icons}>
                    <img src={alert} alt=""/>
                    <img src={qr} alt="" onClick={openModal}/>
                </div>
            </div>

        </div>);
};

const mapStateToProps = () => {};
const mapDispatchToProps = dispatch => {
    return {
        dispatchShowQrModal: () => dispatch(showQrModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
