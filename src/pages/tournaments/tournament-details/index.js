import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom"
import {Grid, LinearProgress} from "@material-ui/core";
import {Container, ContentBox, Button, Table} from "../../../components/UI";
import {API, API_ROUTER} from "../../../api";
import {Styled} from "./style";
import {FormattedMessage} from "react-intl";
import noImage from "../../../assets/no-image.png";
import {getAvatar} from "../../../helpers";
import classNames from "classnames";
import {useSelector} from "react-redux";
import Flag from "react-world-flags";
import {toast} from "react-toastify";

const getDate = inputDate => {
    const date = new Date(inputDate)
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${d < 10 ? `0${d}` : d}.${m < 10 ? `0${m}` : m}.${y} ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
}

const TournamentInfo = ({details, myTeams, updateHandler}) => {
    const userData = useSelector(store => store.userData)

    const getProgress = (min, max) => {
        if (min === 0) return 0;

        return (min / (max || min) * 100).toFixed(0)
    }

    const isClosed = () => {
        const now = new Date();
        const closeRegDate = new Date(details.close_reg_date);

        return now.getTime() > closeRegDate.getTime()
    }

    const canJoin = () => {
        const {is_team} = details;

        if (!details._members || !userData) {
            return false
        }

        // as player
        if (!is_team) {
            return details._members.every(item => item.user.uuid !== userData.uuid)
        }

        // as team
        if (!myTeams) {
            return false
        }

        const thisGame = details._game.code;
        const thisGameTeam = myTeams.find(item => item.isCapitan && (item.team.game === thisGame))
        return (thisGameTeam && details._members.every(item => item.team.team.uuid !== thisGameTeam?.team?.uuid)) || false
    }

    const apply = () => {
        const {is_team} = details;

        // apply as player
        if (!is_team) {
            return API.request({
                ...API_ROUTER.tournaments.joinTournament,
                pathKeys: {
                    tournament: details.uuid,
                    member: userData.uuid
                }
            }, true)
                .then(() => updateHandler())
                .catch(err => toast.error(err.data && err.data.message));
        }

        // apply as team
        const thisGame = details._game.code;
        const thisGameTeam = myTeams.find(item => item.isCapitan && (item.team.game === thisGame))

        return API.request({
                ...API_ROUTER.tournaments.joinTournament,
                pathKeys: {
                    tournament: details.uuid,
                    member: thisGameTeam.team.uuid
                }
            }, true)
            .then(() => updateHandler())
            .catch(err => toast.error(err.data && err.data.message));

    }

    return (
        <Styled.Section>
            <Styled.Info>
                <Grid container spacing={4}>
                    <Grid container item md={3}>
                        <div className="image">
                            <img src={details.logo?.url || noImage} alt="tournament"/>
                        </div>
                    </Grid>
                    <Grid container item md={5}>
                        <div className="details">
                            <div className="details__item">
                                <FormattedMessage id="tournaments.details.info.game" tagName="strong" />
                                <div>
                                    {details._game.name}
                                </div>
                            </div>
                            <div className="details__item">
                                <FormattedMessage id="tournaments.details.info.platform" tagName="strong" />
                                <div>
                                    {details._platform.title}
                                </div>
                            </div>
                            <div className="details__item">
                                <FormattedMessage id="tournaments.details.info.type" tagName="strong" />
                                <div>
                                    {details.is_online ? 'Online' : 'Offline'}
                                </div>
                            </div>
                            <div className="details__item">
                                <strong>Registration closes:</strong>
                                <div>
                                    {getDate(details.close_reg_date)}
                                </div>
                            </div>
                            <div className="details__item">
                                <FormattedMessage id="tournaments.details.info.starts" tagName="strong" />
                                <div>
                                    {getDate(details.date_start)}
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid container item md={4}>
                        <div className="register">
                            <div className="progress">
                                <div
                                    className="active"
                                    style={{minWidth: `${getProgress(details.players_count, details.limits)}%`}}>
                                    {getProgress(details.players_count, details.limits)}%
                                </div>
                            </div>
                            <div className="players">
                                {`${details.players_count} / ${details.limits || '∞'}`} {details.is_team ? 'Teams' : 'Players'}
                            </div>
                            {isClosed()
                                ? <Button
                                    disabled
                                    label="Registration is closed"
                                    action={() => console.log('closed')} />
                                : <Button
                                    disabled={!canJoin()}
                                    label={details.is_team ? 'Apply my team' : 'Apply'}
                                    action={() => apply()} />
                            }
                        </div>
                    </Grid>
                </Grid>
            </Styled.Info>
        </Styled.Section>
    )
}

const ShortInfo = ({details}) => {
    return (
        <>
            {details.description &&
                <Styled.Section>
                    <Styled.SectionTitle>
                        <FormattedMessage id="tournaments.details.description" />
                    </Styled.SectionTitle>
                    <Styled.SectionBody>
                        {details.description}
                    </Styled.SectionBody>
                </Styled.Section>
            }
            {details.rules_text &&
                <Styled.Section>
                    <Styled.SectionTitle>
                        <FormattedMessage id="tournaments.details.rules" />
                    </Styled.SectionTitle>
                    <Styled.SectionBody>
                        {details.rules_text}
                    </Styled.SectionBody>
                </Styled.Section>
            }
        </>
    )
}

const Tabs = ({details}) => {
    const options = ['information', 'participants', 'matches'];
    const history = useHistory();
    let {activeTab} = useParams();

    if (!activeTab) {
        activeTab = 'information'
    }

    return (
        <>
            <Styled.Tabs>
                {options.map(item =>
                    <Styled.Tab
                        key={item}
                        className={activeTab === item ? 'is-active' : ''}
                        onClick={() => history.push(`/tournaments/tournament/${details.url}/${item}`)}>
                        <FormattedMessage id={`tournaments.details.info.tabs.${item}`} />
                    </Styled.Tab>
                )}
            </Styled.Tabs>
            {activeTab === 'information' &&
                <ShortInfo details={details} />
            }
            {activeTab === 'participants' &&
                <RenderMembers members={details._members} isTeam={details.is_team} />
            }
            {activeTab === 'matches' &&
                <RenderMatches details={details} />
            }
        </>
    )
}

const RenderMatches = ({details: {uuid}}) => {
    const [list, setList] = useState(null)
    const [activeGroup, setActiveGroup] = useState(null)

    // useEffect(() => {
    //     API.request({
    //         ...API_ROUTER.tournaments.createStage,
    //         pathKeys: {
    //             tournament: uuid
    //         },
    //         data: {
    //             "name": "test",
    //             "type": "single-elimination",
    //             "start_date": "2021-03-21T19:04:07.773Z",
    //             "end_date": "2021-03-21T19:04:07.773Z",
    //             "number": 1,
    //             "is_manual_placement": false
    //         }
    //     })
    //         .then(res => setList(res))
    //         .catch(err => toast.error(err.data && err.data.message));
    // }, [uuid])

    useEffect(() => {
        API.request({
            ...API_ROUTER.tournaments.getStageList,
            pathKeys: {
                tournament: uuid
            }
        })
            .then(res => {
                setList(res)
                setActiveGroup(res[0])
            })
            .catch(err => toast.error(err?.data?.message || 'Something went wrong...'));
    }, [uuid])

    if (!list) {
        return <LinearProgress />
    }

    if (!list.length) {
        return (
            <Styled.NoResults>
                No matches here...
            </Styled.NoResults>
        )
    }

    return (
        <Styled.Section>
            {/*<Styled.RoundTitle>*/}
            {/*    {list.map(stage => (*/}
            {/*        <div*/}
            {/*            key={stage.uuid}*/}
            {/*            className={activeGroup?.uuid === stage.uuid ? 'is-active' : ''}*/}
            {/*            style={{width: `${100/list.length}%`}}>*/}
            {/*            <span onClick= {() => setActiveGroup(stage)}>{stage.name}</span>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</Styled.RoundTitle>*/}
            {activeGroup && <RenderStage key={activeGroup.uuid} uuid={activeGroup.uuid}/>}
        </Styled.Section>
    )
};

const RenderStage = ({uuid}) => {
    const userData = useSelector(store => store.userData);
    const history = useHistory();
    const [rounds, setRounds] = useState(null);

    useEffect(() => {
        setRounds(null)
        API.request({
            ...API_ROUTER.tournaments.getStageRounds,
            pathKeys: {
                stage: uuid
            }})
            .then(res => setRounds(res))
            .catch(err => console.error(err))
        }, [uuid])

    if (!rounds) {
        return (
            <Styled.Section>
                <LinearProgress />
            </Styled.Section>
        )
    }

    return rounds.map(item => {
        const {uuid, name, matches} = item;

        return (
            <Styled.Section key={uuid}>
                <Styled.RoundTitle>
                    {name}
                </Styled.RoundTitle>
                {matches.map(item => {
                    const {_placements: [left, right]} = item;
                    const hasWinner = left.is_winner || right.is_winner
                    const isMyTeam = members => {
                        if (!members)
                            return false

                        return members.find(item => item.uuid === userData?.uuid);
                    }

                    return (
                        <Styled.Match key={item.uuid} onClick={() => history.push(`/tournaments/match/${item.uuid}`)}>
                            <div className="item left">
                                <div className={classNames('item-name', {
                                    current: isMyTeam(left?.member?.team?.members)
                                })}>
                                    {left?.member?.team?.team?.name || 'TBD'}
                                </div>
                                <div className={classNames({
                                    'item-result': true,
                                    'winner': left.is_winner,
                                    'loser': !left.is_winner
                                })}>
                                    {hasWinner && (left.is_winner ? 'W' : 'L')}
                                </div>
                                <div className="item-score">
                                    {hasWinner ? left.scores : '-' }
                                </div>
                            </div>
                            <div className="vs">vs</div>
                            <div className="item right">
                                <div className="item-score">
                                    {hasWinner ? right.scores : '-'}
                                </div>
                                <div className={classNames({
                                    'item-result': true,
                                    'winner': right.is_winner,
                                    'loser': !right.is_winner
                                })}>
                                    {hasWinner && (right.is_winner ? 'W' : 'L')}
                                </div>
                                <div className={classNames('item-name', {
                                    current: isMyTeam(right?.member?.team?.members)
                                })}>
                                    {right?.member?.team?.team?.name || 'TBD'}
                                </div>
                            </div>
                            <div className="starts">
                                {item.is_completed
                                    ? 'Finished'
                                    : getDate(item.start_date)
                                }
                            </div>
                        </Styled.Match>
                    )
                })}
            </Styled.Section>
        )
    })
}

const RenderMembers = ({members, isTeam}) => {
    const history = useHistory()
    const userData = useSelector(store => store.userData)
    const countriesList = useSelector(store => store.countriesList)

    if (!members?.length) {
        return (
            <Styled.NoResults>
                <FormattedMessage id="tournaments.details.members.noMembers" />
            </Styled.NoResults>
        )
    }

    const getPlayerModel = () => [
        {
            key: 'rank',
            value: '#'
        },
        {
            key: 'player',
            value: <FormattedMessage id="tournaments.details.members.table.player" />,
        },
        {
            key: 'country',
            value: <FormattedMessage id="tournaments.details.members.table.country" />
        }
    ]

    const getTeamModel = () => [
        {
            key: 'rank',
            value: '#'
        },
        {
            key: 'team',
            value: 'Team'
        },
        {
            key: 'country',
            value: 'Country'
        },
        {
            key: 'players',
            value: 'Players'
        },
    ]

    const getPlayerData = members => members.map((item, index) => {
        const {user} = item;
        const isCurrent = user.uuid === userData?.uuid;
        const country = countriesList
            ? countriesList.find(item => item.value === user.country)
            : null

        return ({
            rank: index + 1,
            player: (
                <Styled.Player
                    onClick={e => {
                        e.preventDefault()
                        history.push(`/id/${user.id}`)
                    }}
                    image={getAvatar(user.avatars)}
                    href={`/id/${user.id}`}>
                    <div className={classNames('picture', {
                        'top-gamer': user.topGamer
                    })} />
                    <div className={classNames('name', {
                        current: isCurrent
                    })}>
                        {user.nickname}
                    </div>
                </Styled.Player>
            ),
            country: (
                <Styled.Country>
                    <Flag code={user.country} />
                    <span>{country ? country.label : ''}</span>
                </Styled.Country>
            )
        })
    }).reverse()

    const getTeamData = members => members.map((item, index) => {
        const {team: {team, members}} = item;
        const isMyTeam = members.find(item => item.uuid === userData?.uuid)
        const country = countriesList
            ? countriesList.find(item => item.value === team.country.toUpperCase())
            : null

        return ({
            rank: index + 1,
            team: (
                <Styled.Team href={`/teams/team/${team.url}`} target="_blank">
                    <div className="image">
                        <img src={team?.image?.url || noImage} alt={team.name}/>
                    </div>
                    <div className={classNames('name', {
                        current: isMyTeam
                    })}>
                        {team.name}
                    </div>
                </Styled.Team>
            ),
            country: (
                <Styled.Country>
                    <Flag code={team.country} />
                    <span>{country ? country.label : ''}</span>
                </Styled.Country>
            ),
            members: members?.length || ''
        })
    }).reverse()

    return <Table
        tableModel={isTeam ? getTeamModel() : getPlayerModel()}
        tableData={isTeam ? getTeamData(members) : getPlayerData(members)} />
}

const RenderDetails = ({details, myTeams, updateHandler}) => {
    const history = useHistory();

    return (
        <>
            <Styled.Header>
                <div className="game">
                    {details.name}
                </div>
                <div className="link" onClick={() => history.push('/tournaments')}>
                    <FormattedMessage id="tournaments.details.allTournament" tagName="span" />
                </div>
            </Styled.Header>
            <TournamentInfo details={details} myTeams={myTeams} updateHandler={updateHandler}/>
            <Tabs details={details} />
        </>
    )
}

const TournamentDetails = () => {
    const [details, setDetails] = useState(null)
    const [myTeams, setMyTeams] = useState(null)
    const {tournamentUuid} = useParams()
    const userData = useSelector(store => store.userData)

    const getData = tournamentUuid => {
        // get tournament details
        setDetails(null)
        API.request({
            ...API_ROUTER.tournaments.getTournamentDetails, pathKeys: { tournamentUuid }
        })
            .then((res) => setDetails(res))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getData(tournamentUuid)
    }, [tournamentUuid])

    useEffect(() => {
        // get my teams
        if (userData && details?.is_team) {
            API.request({
                ...API_ROUTER.teams.getMyTeams,
                pathKeys: {
                    userUuid: userData.uuid
                }
            })
                .then(res => setMyTeams(res.list))
                .catch(err => console.error(err))
        }
    }, [userData, details])

    return (
        <Container>
            <ContentBox>
                {!details ? <LinearProgress /> : <RenderDetails details={details} myTeams={myTeams} updateHandler={() => getData(tournamentUuid)}/>}
            </ContentBox>
        </Container>
    )
}

export default TournamentDetails
