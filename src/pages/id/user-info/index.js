import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {InnerBox, ContentBox, Button, Modal, ModalTitle, ButtonRow} from "../../../components/UI";
import {ROUTER} from "../../../config";
import {Box, LinearProgress} from "@material-ui/core";
import {setActiveChat, presetChatMessage} from "../../../redux/actions";
import {getAvatar, offerToPlay, addFriend, isAuthenticated} from "../../../helpers";
import GameSwitcher from "../../../components/game-switcher";
import Styled from "./style";
import {API, API_ROUTER} from "../../../api";
// import {TopGamerIcon} from "../../../assets/svg/top-gamer-icon";

const quoteIcon = () => (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.368 9.496C2.624 9.496 2.012 9.268 1.532 8.812C1.076 8.332 0.848 7.72 0.848 6.976C0.848 6.04 1.232 5.02 2 3.916C2.792 2.788 3.836 1.792 5.132 0.927999L5.672 1.468C5.168 1.996 4.772 2.488 4.484 2.944C4.196 3.4 4.052 3.772 4.052 4.06C4.052 4.228 4.1 4.384 4.196 4.528C4.316 4.672 4.484 4.828 4.7 4.996C5.036 5.26 5.3 5.536 5.492 5.824C5.684 6.112 5.78 6.496 5.78 6.976C5.78 7.72 5.552 8.332 5.096 8.812C4.64 9.268 4.064 9.496 3.368 9.496ZM10.352 9.496C9.608 9.496 8.996 9.268 8.516 8.812C8.06 8.332 7.832 7.72 7.832 6.976C7.832 6.04 8.216 5.02 8.984 3.916C9.776 2.788 10.82 1.792 12.116 0.927999L12.656 1.468C12.152 1.996 11.756 2.488 11.468 2.944C11.18 3.4 11.036 3.772 11.036 4.06C11.036 4.228 11.084 4.384 11.18 4.528C11.3 4.672 11.468 4.828 11.684 4.996C12.02 5.26 12.284 5.536 12.476 5.824C12.668 6.112 12.764 6.496 12.764 6.976C12.764 7.72 12.536 8.332 12.08 8.812C11.624 9.268 11.048 9.496 10.352 9.496Z" fill="white"/>
    </svg>
);

export default function UserInfo({data, isCurrentUser, selectedGame, gamesAvailable, setSelectedGame}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {idCard} = useParams()
    const [modalStatus, setModalStatus] = useState(false)
    const [QRState, setQRState] = useState(false)
    const [QRCode, setQRCode] = useState(false)
    const reverseDate = (date) => date.split('-').reverse().join('-')

    // positions
    const positions = data.positions.find(item => item.game.code === selectedGame);

    // offer to play
    const runOfferToPlay = userUuid => {
        offerToPlay(userUuid)
            .then(({chat}) => {
                dispatch(setActiveChat(chat.uuid))
                dispatch(presetChatMessage(true))
                history.push(ROUTER.messenger)
            })
            .catch(err => toast.error(err.data && err.data.message))
    };

    // add friend
    const runAddFriend = userUuid => {
        addFriend(userUuid)
            .then(({message}) => toast.success(message))
            .catch(err => toast.error(err.data && err.data.message))
    };

    const renderDetails = () => {
        return (
            <div>
                {data.citizenship &&
                    <div className="dataRow row-type">
                        <div><FormattedMessage id="id.citizenship"/>:</div>
                        <div>{data.citizenship}</div>
                    </div>
                }
                {(data.city || data.country) &&
                    <div className="dataRow row-type">
                        <div><FormattedMessage id="id.lives"/>:</div>
                        <div>
                            {data.city ? data.city : ''}
                            {data.city && data.country && ', '}
                            {data.country ? data.country : ''}
                        </div>
                    </div>
                }
                {data.birthDate &&
                    <div className="dataRow row-type">
                        <div><FormattedMessage id="id.birthday"/>:</div>
                        <div>{reverseDate(data.birthDate)}</div>
                    </div>
                }
                {data.age > 0 &&
                    <div className="dataRow row-type">
                        <div><FormattedMessage id="id.age"/>:</div>
                        <div>{data.age} y.o.</div>
                    </div>
                }
            </div>
        )
    }

    useEffect(() => {
        if (data && idCard === 'idCard' && isCurrentUser) {
            setModalStatus(true)
        }
    }, [data, idCard, isCurrentUser])

    return (
        <>
            <ContentBox>
                <Styled.Row>
                    <Styled.Col>
                        <Styled.StyledInnerBox>
                            <Styled.Content>
                                <div className="nickname">
                                    {data.nickname}
                                    {/*{data.topGamer && <TopGamerIcon />}*/}
                                </div>
                                <Styled.AvatarHolder>
                                    <Styled.Avatar
                                        className={data.topGamer ? 'top-gamer' : ''}
                                        image={getAvatar(data.avatars)}/>
                                    {data.online && <Styled.OnlineStatus/>}
                                </Styled.AvatarHolder>
                                <div className="username">
                                    {data.firstName ? data.firstName : ''} {data.lastName ? data.lastName : ''}
                                </div>
                                <div className="role">
                                    <FormattedMessage id="global.roles.gamer" />
                                </div>
                            </Styled.Content>
                        </Styled.StyledInnerBox>
                    </Styled.Col>
                    <Styled.Col>
                        <Styled.StyledInnerBox>
                            <Styled.Content>
                                <div className="sectionTitle">
                                    <FormattedMessage id="id.about"/>
                                </div>
                                {renderDetails()}
                            </Styled.Content>
                        </Styled.StyledInnerBox>
                    </Styled.Col>
                    <Styled.Col>
                        <Styled.StyledInnerBox>
                            <Styled.Content>
                                {positions &&
                                    <>
                                        <div className="sectionTitle withSwitcher">
                                            <div><FormattedMessage id="id.rating"/>:&nbsp;</div>
                                            <GameSwitcher
                                                selectedGame={selectedGame}
                                                gamesAvailable={gamesAvailable}
                                                setSelectedGame={setSelectedGame}
                                                dropdownPosition="right"
                                            />
                                        </div>
                                        <div>
                                            {positions.world &&
                                                <div className="dataRow">
                                                    <div><FormattedMessage id="id.world"/>:</div>
                                                    <div>{positions.world}</div>
                                                </div>
                                            }
                                            {positions.country &&
                                                <div className="dataRow">
                                                    <div><FormattedMessage id="id.country"/>:</div>
                                                    <div>{positions.country}</div>
                                                </div>
                                            }
                                            {positions.city &&
                                                <div className="dataRow">
                                                    <div><FormattedMessage id="id.city"/>:</div>
                                                    <div>{positions.city}</div>
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
                                <div className={`sectionTitle ${positions && 'next'}`}>
                                    <FormattedMessage id="id.gamePass"/>
                                </div>
                                <div className="dataRow">
                                    <div style={{minWidth: '0px', padding: '0px'}}>
                                        {data.topGamer && <div className="pg">PG: </div>}
                                    </div>
                                    <div>{data.passport}</div>
                                </div>
                                {isAuthenticated() && isCurrentUser &&
                                    <div className="id-card">
                                        <ButtonRow>
                                            <Button
                                                label={<FormattedMessage id="idCard.openCard" /> }
                                                action={() => setModalStatus(true)}/>
                                        </ButtonRow>
                                    </div>
                                }
                            </Styled.Content>
                        </Styled.StyledInnerBox>
                    </Styled.Col>

                    {data.about &&
                        <Styled.Col className="about">
                            <InnerBox>
                                <Styled.About>
                                    {quoteIcon()}
                                    {data.about}
                                </Styled.About>
                            </InnerBox>
                        </Styled.Col>
                    }
                    {!isCurrentUser && isAuthenticated() &&
                        <Styled.Col className="controls">
                            <Button
                                action={() => runAddFriend(data.uuid)}
                                label={<FormattedMessage id="id.addFriend"/>}/>
                            <Button
                                action={() => console.log('Follow')}
                                variant="secondary"
                                label={<FormattedMessage id="id.follow"/>}/>
                            <Button
                                action={() => runOfferToPlay(data.uuid)}
                                variant="secondary"
                                label={<FormattedMessage id="id.offerToPlay"/>}/>
                        </Styled.Col>
                    }
                </Styled.Row>
            </ContentBox>
            <Modal
                closeButton
                onEntering={() => setQRState(false)}
                onClose={() => setModalStatus(false)}
                open={modalStatus}>
                <ModalTitle>
                    <FormattedMessage id="idCard.title" />
                </ModalTitle>
                <Styled.Content>
                    <div className="nickname">
                        {data.nickname}
                        {/*{data.topGamer && <TopGamerIcon />}*/}
                    </div>
                    <Styled.AvatarHolder>
                        <Styled.Avatar
                            className={data.topGamer ? 'top-gamer' : ''}
                            image={getAvatar(data.avatars)}/>
                        {data.online && <Styled.OnlineStatus/>}
                    </Styled.AvatarHolder>
                    <div className="username">
                        {data.firstName ? data.firstName : ''} {data.lastName ? data.lastName : ''}
                    </div>
                    <Styled.Content>
                        <div className="dataRow center">
                            <div style={{minWidth: '0px', padding: '0px'}}>
                                {data.topGamer && <div className="pg">PG: </div>}
                            </div>
                            <div>{data.passport}</div>
                        </div>
                    </Styled.Content>
                </Styled.Content>
                {!QRState &&
                    <Box mt={2}>
                        <ModalTitle>
                            <FormattedMessage id="idCard.info" />
                        </ModalTitle>
                        <Styled.Content>
                            {renderDetails()}
                        </Styled.Content>
                    </Box>
                }
                {QRState &&
                    <Styled.Content>
                        <Box mt={2}>
                            <div className="logos">
                                {data.eventLogo &&
                                    <div className="logo">
                                        <img src={data.eventLogo} alt="passport"/>
                                    </div>
                                }
                                <div className="logo">
                                    <img src="https://passport.fra1.digitaloceanspaces.com/prod/uploads/events/logo-qrcode/passport.jpg" alt="passport"/>
                                </div>
                                {data.partnerLogo &&
                                    <div className="logo">
                                        <img src={data.partnerLogo} alt="passport"/>
                                    </div>
                                }
                            </div>
                        </Box>
                        <Box mt={2}>
                            <div className="qr">
                                {QRCode ? <img src={QRCode} alt="QR code"/> : <LinearProgress/>}
                            </div>
                        </Box>
                    </Styled.Content>
                }
                <ButtonRow direction="center">
                    <Button
                        label={QRState ? <FormattedMessage id="idCard.hideQR" /> : <FormattedMessage id="idCard.showQR" />}
                        action={() => {
                            setQRState(!QRState)

                            if (!QRCode) {
                                API.request({...API_ROUTER.getQRCode})
                                    .then(({idPassQrCode}) => setQRCode(idPassQrCode))
                                    .catch(err => console.log(err))
                            }
                        }}/>
                </ButtonRow>
            </Modal>
        </>
    )
}

UserInfo.propTypes = {
    data: PropTypes.object.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    selectedGame: PropTypes.string,
    gamesAvailable: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired
};