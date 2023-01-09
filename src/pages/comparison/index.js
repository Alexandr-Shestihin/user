import React, {useEffect, useState} from "react";
import {API_ROUTER, API} from "../../api";
import classNames from 'classnames';
import {useHistory} from "react-router-dom";
import {ContentBox, Container, SideBarRowRight, ButtonRow, Button} from "../../components/UI";
import NewUsers from "../../components/widgets-new-users";
import {Styled} from './style'
import {models} from "../ratings/models";
import {FormattedMessage} from "react-intl";
import WarningNotification from "../../components/warning-notification";
import {LinearProgress} from "@material-ui/core";
import {getAvatar} from "../../helpers";
import {useSelector} from "react-redux";

const RenderUser = ({player}) => {
    const userData = useSelector(state => state.userData)

    if (!player)
        return null

    const {user} = player?.game

    return (
        <>
            <Styled.UserName className={userData?.uuid === user.uuid ? 'self' : ''}>
                {user.nickname}
            </Styled.UserName>
            <Styled.UserCard>
                <Styled.UserAvatar image={getAvatar(user.avatars)}/>
                {user.online && <Styled.UserOnlineStatus/>}
            </Styled.UserCard>
        </>
    )
}

const RenderUsers = ({model, players}) => {
    const out = [];

    for (let i = 0; i < 5; i++) {
        out.push(
            <Styled.TableInnerCol key={i} className={!players[i] ? 'empty' : ''}>
                <Styled.TableHeader>
                    <RenderUser player={players[i]} />
                </Styled.TableHeader>
                {model.map((item, itemIndex) => {
                    const thisValue = players[i] && players[i][item.key];

                    let isBest = true;
                    let isWorst = true;

                    if (thisValue) {
                        players.forEach(inner => {
                            if (thisValue > inner[item.key]) {
                                isWorst = false
                            }

                            if (thisValue < inner[item.key]) {
                                isBest = false
                            }
                        })
                    }

                    return (
                        <Styled.TableItem
                            key={item.key}
                            className={classNames({
                                worst: thisValue && isWorst,
                                best: thisValue && isBest
                            })}>
                            <div className="modal-helper">
                                {model[itemIndex].value}
                            </div>
                            {thisValue}&nbsp;
                        </Styled.TableItem>
                    )
                })}
            </Styled.TableInnerCol>
        )
    }

    return (
        <Styled.TableInnerRow>
            {out}
        </Styled.TableInnerRow>
    )
}

const TableLabels = ({model}) => {
    return (
        <>
            <Styled.TableHeader />
            {model.map(item => (
                <Styled.TableItem key={item.key}>
                    <FormattedMessage id={item.value} />
                </Styled.TableItem>
            ))}
        </>
    )
}

export default function Comparison() {
    const history = useHistory()
    const [players, setPlayers] = useState(null)
    const selectedGame = sessionStorage.getItem('compareGame')
    const getGameModel = () => {
        return selectedGame ? models[selectedGame] : null
    }

    useEffect(() => {
        const playersID = JSON.parse(sessionStorage.getItem('compare'))

        if (playersID) {
            const params = {
                ...API_ROUTER.comparison.getList,
                data: {
                    games: playersID
                }
            }

            API.request(params, true)
                .then(({comparisons}) => setPlayers(comparisons))
                .catch(err => console.log(err))
        }
    }, [])

    if (!selectedGame) {
        const message = (
            <>
                <FormattedMessage id="compare.nothing" tagName="p" />
                <ButtonRow>
                    <Button
                        label={<FormattedMessage id="compare.selectPlayers" />}
                        action={() => history.push('/ratings')} />
                </ButtonRow>
            </>
        )
        return (
            <Container>
                <WarningNotification message={message} />
            </Container>
        )
    }

    if (!players) {
        return (
            <Container>
                <ContentBox>
                    <LinearProgress />
                </ContentBox>
            </Container>
        )
    }

    return (
        <Container>
            <SideBarRowRight>
                <div>
                    <ContentBox>
                        <Styled.Section>
                            <Styled.SectionTitle>
                                <Styled.Label>
                                    <FormattedMessage id="compare.table.title" />
                                </Styled.Label>
                                <Styled.Tabs>
                                    <div className="active">
                                        <FormattedMessage id="global.timers.allTime" />
                                    </div>
                                </Styled.Tabs>
                            </Styled.SectionTitle>
                            <Styled.Table>
                                <Styled.TableMainRow>
                                    <Styled.TableMainCol>
                                        <TableLabels model={getGameModel()} />
                                    </Styled.TableMainCol>
                                    <Styled.TableMainCol>
                                        <RenderUsers model={getGameModel()} players={players}/>
                                    </Styled.TableMainCol>
                                </Styled.TableMainRow>
                            </Styled.Table>
                            <Styled.TableLegend>
                                <div className="item">
                                    <div className="item__label item__label--green" />
                                    <div className="item__name">
                                        <FormattedMessage id="compare.theBest" />
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="item__label item__label--red" />
                                    <div className="item__name">
                                        <FormattedMessage id="compare.theWorst" />
                                    </div>
                                </div>
                            </Styled.TableLegend>
                        </Styled.Section>
                    </ContentBox>
                </div>
                <div>
                    <NewUsers />
                </div>
            </SideBarRowRight>
        </Container>
    )
}