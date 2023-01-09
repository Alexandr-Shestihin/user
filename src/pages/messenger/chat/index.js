import React, {Component} from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {presetChatMessage} from "../../../redux/actions/messenger";
import {API, API_ROUTER} from "../../../api";
import iconInfo from "../img/iconInfo";
import iconBack from "../img/iconBack";
import {getAvatar} from "../../../helpers";
import {Styled} from './style';

class Chat extends Component {

    state = {
        message: '',
        messages: [],
        messagesCounter: 0
    };

    refresher = null;
    stopRefresh = false;
    messagesContainer = React.createRef();

    componentDidUpdate(prevProps) {
        if (prevProps.activeChat !== this.props.activeChat) {
            this.setState({
                message: '',
                messages: []
            });
            this.stopRefresh = true;
            setTimeout(() => {
                this.stopRefresh = false;
            }, 1000)
        }
    }

    componentDidMount() {
        const {shouldPresetMessage, intl} = this.props

        if (shouldPresetMessage) {
            this.setState({
                message: intl.formatMessage({id: "messenger.letsPlay"})
            })
        }

        this.getMessages();
        this.refresher = setInterval(() => {
            this.getMessages()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.refresher)
        this.props.disablePresetChatMessage()
    }

    getMessages() {
        const {activeChat} = this.props;

        if (!activeChat) return;

        const params = {
            ...API_ROUTER.chat.getChatMessages,
            pathKeys: {
                chatUuid: activeChat
            }
        };

        API.request(params)
            .then(({messages}) => {
                if (!this.stopRefresh) {
                    this.upgradeMessages(messages)
                }
            })
            .catch(err => console.log(err))
    }

    upgradeMessages = messages => {
        const {userData, activeChat} = this.props;
        const sorted = messages.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
        const upgraded = sorted.map(message => {
            return ({
                ...message,
                isSelf: message.user.uuid === userData.uuid
            })
        });
        const lastMessage = upgraded[upgraded.length - 1];

        this.setState({messages: upgraded});
        this.scrollToBottom(upgraded.length);
        this.props.updateLastMessages(lastMessage.text, lastMessage.user.uuid, activeChat);
    };

    sendMessage() {
        const {message} = this.state;
        const {activeChat} = this.props;
        const params = {
            ...API_ROUTER.chat.sendMessage,
            pathKeys: {
                chatUuid: activeChat
            },
            data: {
                text: message
            }
        };

        this.setState({message: ''});
        API.request(params).catch(err => console.log(err))
    }

    onEnterPress = (e) => {
        if(e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            this.sendMessage();
        }
    };

    onInput = e => this.setState({message: e.target.value});

    scrollToBottom(count) {
        const {messagesCounter} = this.state;
        if (count !== messagesCounter) {
            this.setState({messagesCounter: count});
            this.messagesContainer.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    render() {
        const {message, messages} = this.state;
        const {chat, userData, activeChat, showInfo, changeStage, infoHandler, intl} = this.props;
        const opponent = (chat && chat.users.find(user => user.uuid !== userData.uuid)) || {};

        if (!activeChat)
            return <Styled.ContentBox/>;

        return (
            <Styled.ContentBox>
                <Styled.Header>
                    <Styled.UserInfo image={getAvatar(opponent.avatars)}>
                        <div className="back" onClick={() => changeStage('users')}>
                            {iconBack()}
                        </div>
                        <div className="icon">
                            <div className="image"/>
                            {opponent.online && <div className="status"/>}
                        </div>
                        <div className="name">{opponent.nickname}</div>
                    </Styled.UserInfo>
                    <Styled.Controls>
                        <Styled.Control
                            active={showInfo}
                            className="desktop"
                            onClick={infoHandler}>
                            {iconInfo()}
                        </Styled.Control>
                        <Styled.Control
                            active={showInfo}
                            className="mobile"
                            onClick={() => {
                                infoHandler(true)
                                changeStage('info')
                            }}>
                            {iconInfo()}
                        </Styled.Control>
                    </Styled.Controls>
                </Styled.Header>
                <Styled.Messages>
                    {messages.map(message => {
                        return (
                            <Styled.Message key={message.uuid} className={message.isSelf ? 'self' : ''}>
                                <div className="body" dangerouslySetInnerHTML={{__html: message.text}} />
                            </Styled.Message>
                        )
                    })}
                    <div ref={this.messagesContainer}/>
                </Styled.Messages>
                <Styled.Input>
                    <TextareaAutosize
                        value={message}
                        placeholder={intl.formatMessage({id: "messenger.writeMessage"})}
                        onChange={this.onInput}
                        onKeyDown={this.onEnterPress}/>
                </Styled.Input>
            </Styled.ContentBox>
        )
    }
}

const mapStateToProps = state => {
    return {
        shouldPresetMessage: state.presetChatMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        disablePresetChatMessage: () => dispatch(presetChatMessage(false))
    };
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Chat));