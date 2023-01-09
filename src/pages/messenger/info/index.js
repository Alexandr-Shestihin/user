import React from "react";
import {useHistory} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import {getAvatar} from "../../../helpers";
import {Styled} from './style';
import iconBack from "../img/iconBack";

export default function Info({userData, changeStage, chat}) {
    const userInfo = (chat && chat.users.find(user => user.uuid !== userData.uuid)) || {};
    const history = useHistory();

    return (
        <Styled.ContentBox>
            <Styled.UserInfo>
                <div className="back" onClick={() => changeStage('chat')}>
                    {iconBack()}
                </div>
                <div className="nickname">{userInfo.nickname}</div>
                <Styled.AvatarHolder>
                    <Styled.Avatar image={getAvatar(userInfo.avatars)}/>
                    {userInfo.online && <Styled.OnlineStatus/>}
                </Styled.AvatarHolder>
                <div className="username">
                    {userInfo.firstName ? userInfo.firstName : ''} {userInfo.lastName ? userInfo.lastName : ''}
                </div>
                <div className="role">
                    <FormattedMessage id="global.roles.gamer" />
                </div>
            </Styled.UserInfo>
            <Styled.PassportLink onClick={() => history.push(`/id/${userInfo.id}`)}>
                <FormattedMessage id="messenger.passport" />
            </Styled.PassportLink>
        </Styled.ContentBox>
    )
}
