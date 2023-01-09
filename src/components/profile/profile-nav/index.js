import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {FormattedMessage} from "react-intl";

import {ROUTER} from "../../../config";
import store from "../../../redux/store";
import {userOffline, setUserData, scrollTo} from "../../../redux/actions";
import {API, API_ROUTER} from "../../../api";
import {ContentBox} from "../../UI";
import Lock from "../../lock";
import {Styled} from "./style";

function NavLink({ label, to, activeOnlyWhenExact, handleClick, scrollTo, skipLight}) {
    const hideOnClick = typeof handleClick === 'function';
    const useScroll = typeof scrollTo === 'function';
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <li className={match && !skipLight ? "active" : ""}>
            <Link to={to} onClick={() => {
                hideOnClick && handleClick();
                useScroll && scrollTo()
            }}>
                {label}
            </Link>
        </li>
    );
}

export function ProfileNavItems(hideOnClick, history) {
    const userData = store.getState().userData;
    const logOut = (e, history, hideOnClick) => {
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
                hideOnClick();
                history.push(ROUTER.homepage);
            })
            .catch(err => console.log(err))
    };
    const scrollToGames = () => {
        store.dispatch(scrollTo('games'));
        setTimeout(() => {
            store.dispatch(scrollTo(null));
        });
    };

    if (!userData) return;

    return (
        <>
            <NavLink
                label={<FormattedMessage id="settings.nav.profile" />}
                to={`/id/${userData.id}`} handleClick={hideOnClick}/>
            <NavLink
                label={<FormattedMessage id="settings.nav.settings" />}
                to={ROUTER.profile.settings} handleClick={hideOnClick}/>
            <NavLink
                label={<FormattedMessage id="settings.nav.games" />}
                to={ROUTER.profile.settings}
                handleClick={hideOnClick}
                scrollTo={scrollToGames}
                skipLight/>
            <li className="locked">
                <a href="/#"><FormattedMessage id="settings.nav.verification" /><Lock/></a>
            </li>
            <li className="locked">
                <a href="/#"><FormattedMessage id="settings.nav.finance" /><Lock/></a>
            </li>
            <NavLink
                label={<FormattedMessage id="settings.nav.password" />}
                to={ROUTER.profile.password} handleClick={hideOnClick}/>
            <li>
                <a href="/" onClick={e => logOut(e, history, hideOnClick)}>
                    <FormattedMessage id="settings.nav.logout" />
                </a>
            </li>
        </>
    )
}

const ProfileNav = ({history}) => {
    return (
        <ContentBox>
            <Styled.Nav>
                {ProfileNavItems(null, history)}
            </Styled.Nav>
        </ContentBox>
    )
};

export default withRouter(ProfileNav)
