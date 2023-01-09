import React from "react";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";

import {Container} from "../UI";
import store from "../../redux/store";
import {showAuthModal, showRegisterModal} from "../../redux/actions/auth";
import {RootState} from "../../redux/store";
import {ROUTER} from "../../config";
import {Styled} from "./style";
import LangSwitcher from "../lang-switcher";

import logoLG from '../../assets/logo-lg.png';
import logoSM from '../../assets/logo-sm.png';

export default function PublicHeader() {
    const isUserOnline = useSelector<RootState>(state => state.userOnline);
    const history = useHistory();
    const toHomepage = (e: React.FormEvent) => {
        e.preventDefault()
        history.push(isUserOnline ? '/ratings' : ROUTER.homepage)
    }

    return (
        <Styled.Header>
            <Container>
                <div className="top">
                    <a href="/" className="title" onClick={e => toHomepage(e)}>
                        <div className="logo logo-sm">
                            <img src={logoSM} alt="passport.gg" />
                        </div>
                        <div className="logo logo-lg">
                            <img src={logoLG} alt="passport.gg" />
                        </div>
                    </a>
                    <Styled.FlexGroup>
                        <LangSwitcher/>
                        {!isUserOnline &&
                        <Styled.Button
                            className="login"
                            onClick={() => store.dispatch(showAuthModal())}>
                            <FormattedMessage id="global.buttons.login" />
                        </Styled.Button>
                        }
                    </Styled.FlexGroup>
                </div>
                <div className="bottom">
                    <FormattedMessage id="publicHeader.h1" tagName="h1" />
                    <FormattedMessage id="publicHeader.subtitle" tagName="div" />
                    <Styled.Button
                        onClick={() => {
                            store.dispatch(showRegisterModal());
                            store.dispatch(showAuthModal())
                        }}>
                        <FormattedMessage id="global.buttons.signUp" />
                    </Styled.Button>
                </div>
            </Container>
        </Styled.Header>
    )
}