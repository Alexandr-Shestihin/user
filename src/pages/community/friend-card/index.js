import React from "react";
import {addFriend, getAvatar, offerToPlay} from "../../../helpers";
import {Button} from "../../../components/UI";
import {messageIcon} from "../icons";
import {StyledFriendCard} from './style'
import {toast} from "react-toastify";
import {setActiveChat} from "../../../redux/actions/messenger";
import {ROUTER} from "../../../config";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useIntl} from "react-intl";

export const FriendCard = ({user}) => {
    const intl = useIntl()
    const history = useHistory()
    const dispatch = useDispatch()
    const countriesList = useSelector(store => store.countriesList)
    const getCountry = code => {
        const country = countriesList.find(item => item.value === code)
        return country ? country.label : code;
    }

    // add friend
    const runAddFriend = userUuid => {
        addFriend(userUuid)
            .then(({message}) => toast.success(message))
            .catch(err => toast.error(err.data && err.data.message))
    };

    // offer to play
    const runOfferToPlay = userUuid => {
        offerToPlay(userUuid)
            .then(({chat}) => {
                dispatch(setActiveChat(chat.uuid));
                history.push(ROUTER.messenger)
            })
            .catch(err => toast.error(err.data && err.data.message))
    };

    return (
        <StyledFriendCard.Item>
            <StyledFriendCard.Avatar
                onClick={() => history.push('/id/' + user.url)}
                className={user.topuser ? 'top-user' : ''}
                image={getAvatar(user.avatars)}>
                <div className="image"/>
                {user.online && <div className="status"/>}
            </StyledFriendCard.Avatar>
            <StyledFriendCard.Info>
                <div className="nickname">{user.nickname}</div>
                <div className="description">{user.fullName}</div>
                <div className="description">
                    {user.city ? user.city : ''}
                    {user.city && user.country && ', '}
                    {user.country ? getCountry(user.country) : ''}
                </div>
                <div className="description">
                    {user.about}
                </div>
                <StyledFriendCard.Controls>
                    <Button
                        label={intl.formatMessage({id: "community.addFriend"})}
                        variant="secondary"
                        action={() => runAddFriend(user.uuid)} />
                    <Button
                        label={messageIcon()}
                        variant="secondary"
                        action={() => runOfferToPlay(user.uuid)} />
                </StyledFriendCard.Controls>
            </StyledFriendCard.Info>
        </StyledFriendCard.Item>
    )
}