import React, {useEffect, useState} from 'react';
import "../../assets/styles/burger.scss";
import {FormattedMessage, injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    showMenu,
    hideMenu, userOffline, setUserData
} from "../../redux/actions";
import {API, API_ROUTER} from "../../api";
import store from "../../redux/store";
import {ROUTER} from "../../config";


const BurgerMenu = ({history, match, showMenu, dispatchShowMenu, dispatchHideMenu}) => {

    const logOut = (e, hideOnClick) => {
        e.preventDefault();

        const params = {
            ...API_ROUTER.auth.logOut
        };

        API.request(params, true)
            .then(() => {
                sessionStorage.removeItem('token');
                localStorage.removeItem('token');
                store.dispatch(userOffline());
                store.dispatch(setUserData(null));
                dispatchHideMenu();
                history.push(ROUTER.login);
            })
            .catch(err => console.log(err))
    };

    return (
        <div className={` burgerMenu__wrapper ${showMenu ? "burgerMenu__wrapper-show" : "burgerMenu__wrapper-hide"}`}>

            <ul className="burgerMenu__inner">
                <li className="burgerMenu__item-head">
                    <button className="burgerMenu__close" onClick={dispatchHideMenu}>X</button>
                </li>
                <li className="burgerMenu__item">
                    <a className="burgerMenu__item-content" href="/" onClick={logOut}>
                        <FormattedMessage id="settings.nav.logout" />
                    </a>
                </li>
            </ul>

        </div>
    );
};

const mapStateToProps = state => {
    return {
        showMenu: state.showMenu
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchShowMenu: () => dispatch(showMenu()),
        dispatchHideMenu: () => dispatch(hideMenu()),
    };
};


export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(BurgerMenu)));
