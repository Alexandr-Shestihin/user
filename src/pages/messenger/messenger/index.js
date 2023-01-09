import React, {Component} from "react";
import styled from "styled-components";
import {ContentBox, Container} from "../../../components/UI";
import {connect} from "react-redux";
import {LinearProgress} from "@material-ui/core";
import {API, API_ROUTER} from "../../../api";
import {toast} from "react-toastify";
import {setActiveChat, presetChatMessage} from "../../../redux/actions";

import Users from "../users";
import Chat from "../chat";
import Info from "../info";

const Row = styled.div`
        height: calc(100vh - 110px);
        display: flex;
        margin: 0 -5px;
    `,
    Col = styled.div`
        padding: 0 5px;
        width: 25%;
        
        &.main {
            width: ${props => props.showInfo ? '50%' : '75%'}
        }
        
        @media (max-width: 991px) {
            &.stage {
                display: none;
            }
            
            &.stage-active {
                width: 100%;
                display: block;
            }
        }
    `;

class Messenger extends Component {

    state = {
        showInfo: false,
        stage: 'users',
        chats: []
    };

    infoHandler = value => this.setState({showInfo: value || !this.state.showInfo});

    changeStage = stage => this.setState({stage})

    componentDidMount() {
        const params = {
            ...API_ROUTER.chat.getUserChats
        };

        API.request(params, true)
            .then(({chats}) => {
                this.setState({chats})
            })
            .catch(err => toast.error(err.data && err.data.message))
    }

    updateLastMessages = (text, userID, chatID) => {
        const {chats} = this.state;

        chats.forEach(chat => {
            if (chat.uuid === chatID) {
                chat.lastMessage.text = text;
                chat.lastMessage.user.uuid = userID
            }
        });

        this.setState({chats})
    };

    render() {
        const {showInfo, chats, stage} = this.state;
        const {userData, activeChat} = this.props;

        if (!userData)
            return (
                <Container>
                    <ContentBox>
                        <LinearProgress />
                    </ContentBox>
                </Container>
            );

        return (
            <Container>
                <Row>
                    <Col className={`stage stage-${stage === 'users' ? 'active' : ''}`}>
                        <Users
                            chats={chats}
                            changeStage={this.changeStage}
                            userData={userData}
                            activeChat={activeChat}
                            setActiveChat={this.props.setActiveChat}/>
                    </Col>
                    <Col className={`main stage stage-${stage === 'chat' ? 'active' : ''}`} showInfo={showInfo}>
                        <Chat
                            userData={userData}
                            className={stage}
                            showInfo={showInfo}
                            activeChat={activeChat}
                            changeStage={this.changeStage}
                            infoHandler={this.infoHandler}
                            updateLastMessages={this.updateLastMessages}
                            chat={chats.find(chat => chat.uuid === activeChat)}/>
                    </Col>
                    {showInfo &&
                        <Col className={`stage stage-${stage === 'info' ? 'active' : ''}`}>
                            <Info
                                userData={userData}
                                className={stage}
                                changeStage={this.changeStage}
                                chat={chats.find(chat => chat.uuid === activeChat)}/>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        userData: state.userData,
        activeChat: state.activeChat,
        shouldPresetMessage: state.presetChatMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveChat: chat => dispatch(setActiveChat(chat)),
        disablePresetChatMessage: () => dispatch(presetChatMessage(false))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);