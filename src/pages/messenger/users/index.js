import React, {Component} from "react";
import {getAvatar} from "../../../helpers";
import {Styled} from './style';
import {FormattedMessage, injectIntl} from "react-intl";

const searchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M15.502 14H14.708L14.432 13.726C15.407 12.589 16 11.115 16 9.49997C16 5.90997 13.09 2.99997 9.5 2.99997C5.91 2.99997 3 5.90997 3 9.49997C3 13.09 5.91 16 9.5 16C11.115 16 12.588 15.408 13.725 14.434L14.001 14.708V15.5L18.999 20.491L20.49 19L15.502 14ZM9.5 14C7.014 14 5 11.986 5 9.49997C5 7.01497 7.014 4.99997 9.5 4.99997C11.985 4.99997 14 7.01497 14 9.49997C14 11.986 11.985 14 9.5 14Z" fill="white"/>
    </svg>
);

class Users extends Component {

    state = {
        filter: ''
    };

    onFilter = e => this.setState({filter: e.target.value});

    render() {
        const {filter} = this.state;
        const {userData, chats, activeChat, setActiveChat, intl, changeStage} = this.props;
        const filteredChats = chats.filter(chat => {
            const {users} = chat;
            const opponent = users.find(user => user.uuid !== userData.uuid);
            return opponent?.nickname.toLowerCase().includes(filter.toLowerCase())
        });

        return (
            <Styled.ContentBox>
                <div>
                    <Styled.Header>
                        <Styled.HeaderImage image={getAvatar(userData.avatars)}/>
                        <FormattedMessage id="messenger.title" tagName="span" />
                    </Styled.Header>
                    <Styled.Search>
                        <div className="icon">{searchIcon()}</div>
                        <input
                            type="text"
                            placeholder={intl.formatMessage({id: "messenger.search"})}
                            onChange={this.onFilter}/>
                    </Styled.Search>
                </div>
                <Styled.Items>
                    <Styled.ItemsScroller>
                        {filteredChats.map(chat => {
                            const opponent = chat.users.find(user => user.uuid !== userData.uuid);
                            const {lastMessage} = chat;
                            let lastMessageUser = null;
                            if (lastMessage) {
                                lastMessageUser = lastMessage.user.uuid === userData.uuid
                                    ? <FormattedMessage id="messenger.selfMessage" />
                                    : null
                            }

                            return (
                                <Styled.Item
                                    key={chat.uuid}
                                    isActive={chat.uuid === activeChat}
                                    onClick={() => {
                                        setActiveChat(chat.uuid)
                                        changeStage('chat')
                                    }}
                                    image={getAvatar(opponent.avatars)}>
                                    <div className="icon">
                                        <div className="image"/>
                                        {opponent.online && <div className="status"/>}
                                    </div>
                                    <div className="info">
                                        <div className="name">{opponent.nickname}</div>
                                        {lastMessage &&
                                            <div className="last-message">
                                                {lastMessageUser &&
                                                    <strong>{lastMessageUser}: </strong>
                                                }
                                                <div className="body" dangerouslySetInnerHTML={{__html: lastMessage.text}}/>
                                            </div>
                                        }
                                    </div>
                                    {chat.uuid === activeChat && <div className="active"/>}
                                </Styled.Item>
                            )
                        })}
                    </Styled.ItemsScroller>
                </Styled.Items>
            </Styled.ContentBox>
        )
    }
}

export default injectIntl(Users)