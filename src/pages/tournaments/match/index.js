import React, {useEffect, useState} from "react";
import {ContentBox, Container, Table, Button} from "../../../components/UI";
import {useHistory, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {API, API_ROUTER} from "../../../api";
import {Box, LinearProgress} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import {Styled} from "./style";
import {toast} from "react-toastify";
import classNames from 'classnames';

import noImage from '../../../assets/justin-bober.svg';
import dust2 from "../../../assets/cs-go-maps/de_dust2.png";
import inferno from "../../../assets/cs-go-maps/de_inferno.png";
import mirage from "../../../assets/cs-go-maps/de_mirage.png";
import nuke from "../../../assets/cs-go-maps/de_nuke.png";
import overpass from "../../../assets/cs-go-maps/de_overpass.png";
import train from "../../../assets/cs-go-maps/de_train.png";
import vertigo from "../../../assets/cs-go-maps/de_vertigo.png";

const MAPS = {
    dust2,
    inferno,
    mirage,
    nuke,
    overpass,
    train,
    vertigo
}

const RenderTable = ({members, ready, matchUuid, updateHandler}) => {
    const userData = useSelector(store => store.userData);

    const statusControl = targetUuid => {
        if (ready[targetUuid]) {
            return <span>confirmed</span>;
        }

        if (userData && userData.uuid === targetUuid) {
            return <span className="confirm" onClick={() => userReady(matchUuid)}>confirm</span>
        }

        return <span className="not-ready">not ready</span>;
    }

    const userReady = matchUuid => {
        API.request({
            ...API_ROUTER.tournaments.userReady,
            pathKeys: {
                matchUuid
            }
        }, true)
            .then(() => updateHandler())
            .catch(err => toast.error(err.data && err.data.message))
    }

    const tableModel = [
        {
            key: 'gamer',
            value: 'Gamer'
        },
        {
            key: 'status',
            value: 'Status'
        },
    ]

    const tableData = members.map(item => {
        return ({
            gamer: item.nickname,
            status: (
                <Styled.StatusControl>
                    {statusControl(item.uuid)}
                </Styled.StatusControl>
            )
        })
    })

    return (
        <Table tableModel={tableModel} tableData={tableData} />
    )
}

const MatchStage = ({details}) => {
    const hasChildren = !!details._childs.lenght;
    const map = details.details.cs_map;
    const connectionDetails = details.details.cs_connection;

    const steamLink = (connectionDetails) => {
        if (!connectionDetails) {
            return ''
        }

        return `steam://connect/${connectionDetails.ip}/${connectionDetails.password}`
    }

    const startMatch = (connectionDetails) => {
        if (!connectionDetails) {
            return API.request({
                ...API_ROUTER.tournaments.startMatch,
                    pathKeys: {
                        csMatchUuid: details.uuid
                    }
                }, true)
                .then(() => window.location.reload())
                .catch(err => toast.error(err.data && err.data.message))
        }
    }

    return (
        <Styled.Polls>
            <Styled.PollRow>
                {!hasChildren &&
                    <Styled.PollCol>
                        <div
                            className="item is-picked">
                            <div className="name">
                                {map}
                            </div>
                            <div className="image" style={{background: `url(${MAPS[map]})`}} />
                            <Box mt={1}>
                                {!connectionDetails
                                    ? <Button
                                        fullWidth
                                        label="Start Match"
                                        action={() => startMatch()}/>
                                    : (
                                        <div>
                                            <div className="details">
                                                <div className="details-item">
                                                    <a href={steamLink(connectionDetails)}>Join match</a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Box>
                        </div>
                    </Styled.PollCol>
                }
            </Styled.PollRow>
        </Styled.Polls>
    )
};

const PickStage = ({pollUuid, rightTeam, rightMembers, leftTeam, leftMembers, updateHandler}) => {
    const userData = useSelector(item => item.userData);
    const [state, setState] = useState({
        options: [],
        voter: {},
        isBan: false,
        isPick: true,
        status: ''
    })

    const isVoter = userData?.uuid === state.voter?.uuid

    const getVoterTeam = () => {
        const {voter} = state;

        if (!voter)
            return;

        const isRight = rightMembers.find(item => item.uuid === voter.uuid)
        const isLeft = leftMembers.find(item => item.uuid === voter.uuid)
        return (isLeft && leftTeam.name) || (isRight && rightTeam.name) || 'zzzzz....';
    }

    const handleVote = (item, isVoter, isBan, isPick) => {
        if (!isVoter) {
            return
        }

        // pick
        if (isPick) {
            return API.request({
                    ...API_ROUTER.tournaments.polls.pick,
                    pathKeys: {
                        option: item.uuid
                    }
                }, true)
                .then((res) => setState({
                    options: res.options,
                    voter: res.voter,
                    isBan: !res.vote,
                    isPick: res.vote,
                    status: res.status
                }))
                .catch(err => console.error(err))
        }

        // ban
        if (isBan) {
            return API.request({
                ...API_ROUTER.tournaments.polls.ban,
                pathKeys: {
                    option: item.uuid
                }
            }, true)
                .then((res) => setState({
                    options: res.options,
                    voter: res.voter,
                    isBan: !res.vote,
                    isPick: res.vote,
                    status: res.status
                }))
                .catch(err => console.error(err))
        }
    }

    useEffect(() => {
        const worker = () => {
            API.request({
                ...API_ROUTER.tournaments.polls.getPoll,
                pathKeys: {
                    poll: pollUuid
                }
            })
                .then((res) => setState({
                    options: res.options,
                    voter: res.voter,
                    isBan: !res.vote,
                    isPick: res.vote,
                    status: res.status
                }))
                .catch(err => console.error(err))
        }

        worker();
        const interval = setInterval(() => worker(), 5000)
        return () => clearInterval(interval)
    }, [pollUuid])

    // check for finish, then reload match
    if (state.status === 'closed') {
        updateHandler()
    }

    return (
        <Styled.Polls>
            {!!state.options.length && (
                <Styled.Side>
                    <span className="team">
                        <strong>{getVoterTeam()}</strong>
                    </span>
                    &nbsp;
                    <span className={`action ${state.isBan ? 'ban' : 'pick'}`}> - <strong>{state.isBan ? 'BAN' : 'PICK'}</strong></span>
                </Styled.Side>
            )}
            <Styled.PollRow>
                {state.options.map(item => {
                    return (
                        <Styled.PollCol key={item.uuid}>
                            <div
                                onClick={() => handleVote(item, isVoter, state.isBan, state.isPick)}
                                className={classNames({
                                item: true,
                                'is-voter': isVoter,
                                'is-banned': !item.canVote && !item.win,
                                'is-picked': !item.canVote && item.win
                                })}>
                                <div className="name">
                                    {item.option}
                                    {!item.canVote && !item.win && <span className="red"> - <b>BAN</b></span>}
                                    {!item.canVote && item.win && <span className="green"> - <b>PICK</b></span>}
                                </div>
                                <div className="image" style={{background: `url(${MAPS[item.option]})`}} />
                            </div>
                        </Styled.PollCol>
                    )
                })}
            </Styled.PollRow>
        </Styled.Polls>
    )
}

const RenderDetails = ({details, updateHandler}) => {
    const history = useHistory()
    const userData = useSelector(store => store.userData);
    const [left, right] = details._placements;
    const leftTeam = left.member.team.team;
    const rightTeam = right.member.team.team;
    const leftMembers = left.member.team.members;
    const rightMembers = right.member.team.members;

    const isPollExists = !!details.poll;
    const isPollFinished = details.poll?.is_finished;

    const canPlay = leftMembers.find(item => item.uuid === userData?.uuid) || rightMembers.find(item => item.uuid === userData?.uuid);

    const getDate = inputDate => {
        const date = new Date(inputDate)
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();

        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${d < 10 ? `0${d}` : d}.${m < 10 ? `0${m}` : m}.${y} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    const isStarted = inputDate => {
        const when = new Date(inputDate);
        const now = new Date();

        return !(now.getTime() < when.getTime())
    }

    const matchStatus = () => {

        if (details.is_completed) {
            return 'Completed'
        }

        return isStarted(details.start_date) ? 'Started' : 'Upcoming'
    }

    const matchResults = () => {
        const [left, right] = details._placements;

        return `${left.scores} : ${right.scores}`;
    }
    
    if (!userData) {
        return null;
    }

    return (
        <div>
            <Styled.Header>
                <div className="game">
                    {details.round_name}
                </div>
                <div className="link" onClick={() => history.push('/tournaments')}>
                    <FormattedMessage id="tournaments.details.allTournament" tagName="span" />
                </div>
            </Styled.Header>
            <Styled.Body>
                <Styled.MatchNumber>
                    {/*Match №*/}
                    {' '}
                </Styled.MatchNumber>
                <Styled.DetailsRow>
                    <Styled.DetailsCol>
                        <strong>DATE</strong>
                        {details.start_date && getDate(details.start_date)}
                    </Styled.DetailsCol>
                    <Styled.DetailsCol>
                        <strong>DISCIPLINE</strong>
                        {details.game_name}
                    </Styled.DetailsCol>
                    <Styled.DetailsCol>
                        <strong>Status</strong>
                        {matchStatus()}
                    </Styled.DetailsCol>
                    <Styled.DetailsCol>
                        <strong>stage</strong>
                        {details.stage_name}
                    </Styled.DetailsCol>
                    <Styled.DetailsCol>
                        <strong>round</strong>
                        {details.round_name}
                    </Styled.DetailsCol>
                </Styled.DetailsRow>
                <Styled.BattleRow>
                    <Styled.BattleCol>
                        <div className="team">
                            <div className="team-image">
                                <img src={leftTeam?.image?.url || noImage} alt={leftTeam.name} />
                            </div>
                            <div className="team-name">
                                {leftTeam.name}
                            </div>
                            {!isPollExists && <RenderTable
                                members={leftMembers}
                                ready={left.ready_users}
                                matchUuid={details.uuid}
                                updateHandler={updateHandler}/>}
                        </div>
                    </Styled.BattleCol>
                    <Styled.BattleCol className="vs">
                        <span>
                            {isPollFinished ? matchResults() : 'VS'}
                        </span>
                    </Styled.BattleCol>
                    <Styled.BattleCol>
                        <div className="team">
                            <div className="team-image">
                                <img src={rightTeam?.image?.url || noImage} alt={rightTeam.name} />
                            </div>
                            <div className="team-name">
                                {rightTeam.name}
                            </div>
                            {!isPollExists &&
                                <RenderTable
                                    members={rightMembers}
                                    ready={right.ready_users}
                                    matchUuid={details.uuid}
                                    updateHandler={updateHandler}/>
                            }
                        </div>
                    </Styled.BattleCol>
                </Styled.BattleRow>
                {isPollExists
                    && !isPollFinished
                    && <PickStage
                            matchUuid={details.uuid}
                            pollUuid={details.poll.uuid}
                            updateHandler={updateHandler}
                            rightTeam={rightTeam}
                            rightMembers={rightMembers}
                            leftTeam={leftTeam}
                            leftMembers={leftMembers}/>
                }
                {isPollFinished && canPlay && !details.is_completed &&
                    <MatchStage details={details}/>
                }
            </Styled.Body>
        </div>
    )
}

const Match = () => {
    const [details, setDetails] = useState(null)
    const {matchUuid} = useParams()
    const getData = matchUuid => {
        API.request({
            ...API_ROUTER.tournaments.getMatchDetails, pathKeys: { matchUuid }
        })
            .then((res) => setDetails(res))
            .catch(err => toast.error(err.data && err.data.message))
    }

    useEffect(() => {
        const watcher = setInterval(() => getData(matchUuid), 15000)
        getData(matchUuid)

        return () => clearInterval(watcher)
    }, [matchUuid])

    return (
        <Container>
            <ContentBox>
                {!details ? <LinearProgress /> : <RenderDetails details={details} updateHandler={() => getData(matchUuid)}/>}
            </ContentBox>
        </Container>
    )
}

export default Match