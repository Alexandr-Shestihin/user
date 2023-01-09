import React, {useCallback, useEffect, useState} from "react"
import {FormattedMessage, useIntl} from "react-intl";
import styled from "styled-components";
import {
    Button,
    ButtonRow, CheckBox,
    DateInput,
    InnerBox,
    Input,
    Label,
    Modal,
    ModalTitle,
    Select
} from "../../../../../../components/UI";
import {Box, Grid} from "@material-ui/core";
import {getValueFromSelect} from "../../../../../../helpers";
import {API, API_ROUTER} from "../../../../../../api";
import {debounce} from "lodash";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const Styled = {
    Group: styled(InnerBox)`
        padding: 20px 20px 30px;
        
        & + & {
            margin-top: 10px;
        }
    `,
    CheckHolder: styled.div`
        height: 30px;
        display: flex;
        align-items: center;
    `,
    ScoreDiv: styled.div`
        text-align: center;
        line-height: 30px;
        font-weight: bold;
    `
}

// const TOURNAMENT_TYPE_OPTIONS = [
//     {
//         label: 'Offline',
//         value: 'offline'
//     },
//     {
//         label: 'Online',
//         value: 'online'
//     }
// ]

const AddResultsModal = ({isOpen, closeHandler, tournaments, teams}) => {
    const intl = useIntl()
    const userData = useSelector(store => store.userData)

    const [selectedTournament, setSelectedTournament] = useState([])
    const [matchDate, setMatchDate] = useState(new Date())
    // const [tournamentType, setTournamentType] = useState([TOURNAMENT_TYPE_OPTIONS[0]])
    const [opponentsList, setOpponentsList] = useState([])
    const [searchString, setSearchString] = useState('')
    const [opponent, setOpponent] = useState([])
    const [myTeam, setMyTeam] = useState([])
    const [opponentTeam, setOpponentTeam] = useState([])
    const [additionalTime, setAdditionalTime] = useState(false)
    const [penalty, setPenalty] = useState(false)
    const [score, setScore] = useState({
        me: '',
        opponent: ''
    })
    const [penaltyScore, setPenaltyScore] = useState({
        me: '',
        opponent: ''
    })
    const [homeMatch, setHomeMatch] = useState({
        me: false,
        opponent: false
    })
    const [errors, setErrors] = useState({})

    const debouncedSearch = useCallback(debounce(searchString => searchRequest(searchString), 600), [])

    useEffect(() => {
        if (searchString) {
            debouncedSearch(searchString);
        }
    }, [searchString]);

    const onModalOpen = () => {
        setSelectedTournament([])
        setMatchDate(new Date())
        // setTournamentType([TOURNAMENT_TYPE_OPTIONS[0]])
        setOpponentsList([])
        setSearchString('')
        setOpponent([])
        setMyTeam([])
        setOpponentTeam([])
        setAdditionalTime(false)
        setPenalty(false)
        setScore({
            me: '',
            opponent: ''
        })
        setPenaltyScore({
            me: '',
            opponent: ''
        })
        setHomeMatch({
            me: false,
            opponent: false
        })
        setErrors({})
    }

    const getTournamentOptions = tournaments => tournaments
            // .filter(item => item.level === getValueFromSelect(tournamentType))
            .map(item => ({
                label: item.name,
                value: item.uuid
            }))

    const getTeamsOptions = teams => teams.map(item => ({
            label: item.name,
            value: item.uuid
        }))

    const selectHandler = (value, selectName) => {
        if (selectName === 'tournament') {
            setSelectedTournament(value)
        }

        if (selectName === 'opponent') {
            setOpponent(value)
        }

        // if (selectName === 'tournamentType') {
        //     setTournamentType(value)
        // }

        if (selectName === 'myTeam') {
            setMyTeam(value)
        }

        if (selectName === 'opponentTeam') {
            setOpponentTeam(value)
        }
    }

    const searchRequest = searchString => {
        API.request({
                ...API_ROUTER.user.search,
                urlParams: {
                    q: searchString
                }
            })
            .then(({users}) => setOpponentsList(users.map(item => ({
                label: `${item.nickname} (${item.fullName})`,
                value: item.uuid
            }))))
            .catch(err => console.error(err))
    }

    const handleHomeMatch = side => {
        const myState = side === 'me' ? !homeMatch.me : homeMatch.me
        const opponentsState = side === 'opponent' ? !homeMatch.opponent : homeMatch.opponent

        if (side === 'me') {
            setHomeMatch({
                me: myState,
                opponent: myState && opponentsState ? false : opponentsState
            })
        }

        if (side === 'opponent') {
            setHomeMatch({
                opponent: opponentsState,
                me: opponentsState && myState ? false : myState
            })
        }
    }

    const handleScore = e => {
        const {name, value} = e.target;

        setScore({
            ...score,
            [name]: value.replace(/[^0-9]+/g, '')
        })
    }

    const handlePenaltyScore = e => {
        const {name, value} = e.target;

        setPenaltyScore({
            ...penaltyScore,
            [name]: value.replace(/[^0-9]+/g, '')
        })
    }

    const submit = async () => {
        const validate = {
            ...errors,
            selectedTournament: !selectedTournament.length ? 'This field is required' : '',
            opponent: !opponent.length ? 'This field is required' : '',
            myTeam: !myTeam.length ? 'This field is required' : '',
            opponentTeam: !opponentTeam.length ? 'This field is required' : '',
            myScore: !score.me.length ? 'Required' : '',
            opponentScore: !score.opponent.length ? 'Required' : '',
            myPenaltyScore: penalty && !penaltyScore.me.length ? 'Required': '',
            opponentPenaltyScore: penalty && !penaltyScore.opponent.length ? 'Required': ''
        }

        const valid = Object.values(validate).every(err => !err)
        setErrors(validate)

        // submit
        if (valid) {
            const tournamentUuid = getValueFromSelect(selectedTournament)
            let matchUuid = null;

            // create match
            await API.request(
                {
                    ...API_ROUTER.fifa.createNewMatch,
                    pathKeys: {
                        tournamentUuid
                    },
                    data: {
                        date: matchDate,
                        translation: "",
                        invite: ''
                        // invite: getValueFromSelect(opponent)
                    }
                }, true)
                .then(({match}) => matchUuid = match.uuid)
                .catch(err => console.error(err))

            await API.request({
                    ...API_ROUTER.fifa.addMatchResult,
                    pathKeys: { matchUuid },
                    data: {
                        user: userData.uuid,
                        team: getValueFromSelect(myTeam),
                        home: homeMatch.me ? 1 : 0,
                        additionalTime: additionalTime ? 1 : 0,
                        penalty: penalty ? 1 : 0,
                        penaltyScore: penaltyScore.me || 0,
                        score: score.me || 0
                    }
                }, true)
                .catch(err => console.error(err))

            await API.request({
                    ...API_ROUTER.fifa.addMatchResult,
                    pathKeys: { matchUuid },
                    data: {
                        user: getValueFromSelect(opponent),
                        team: getValueFromSelect(opponentTeam),
                        home: homeMatch.opponent ? 1 : 0,
                        additionalTime: additionalTime ? 1 : 0,
                        penalty: penalty ? 1 : 0,
                        penaltyScore: penaltyScore.opponent || 0,
                        score: score.opponent || 0
                    }
                }, true)
                .catch(err => console.error(err))

            closeHandler()
            toast.success(<FormattedMessage id="id.performance.notifications.matchAdded" />)
        }
    }

    return (
        <Modal
            closeButton
            fullWidth
            onEntering={onModalOpen}
            open={isOpen}
            onClose={closeHandler}>
            <ModalTitle>
                <FormattedMessage id="id.performance.fifa20.addResultsModal.title" />
            </ModalTitle>
            <Styled.Group>
                {/*<Box width={1}>*/}
                {/*    <Select*/}
                {/*        clearable*/}
                {/*        values={tournamentType}*/}
                {/*        label={<FormattedMessage id="id.performance.fifa20.addResultsModal.form.tournamentType" tagName="label"/>}*/}
                {/*        options={TOURNAMENT_TYPE_OPTIONS}*/}
                {/*        onChange={value => selectHandler(value, 'tournamentType')}/>*/}
                {/*</Box>*/}
                <Box width={1}>
                    <Select
                        clearable
                        values={selectedTournament}
                        error={errors.selectedTournament}
                        label={<FormattedMessage id="id.performance.fifa20.addResultsModal.form.tournament" tagName="label"/>}
                        options={getTournamentOptions(tournaments)}
                        onChange={value => selectHandler(value, 'tournament')}/>
                </Box>
                <Box width={1} mt={2}>
                    <Label>
                        <FormattedMessage id="id.performance.fifa20.addResultsModal.form.matchDate" />
                    </Label>
                    <DateInput
                        selected={matchDate}
                        onChange={e => setMatchDate(e)} />
                </Box>
                <Box width={1} mt={2}>
                    <Select
                        clearable
                        values={opponent}
                        error={errors.opponent}
                        placeholder={intl.formatMessage({id: 'id.performance.fifa20.addResultsModal.form.searchUser'})}
                        label={<FormattedMessage id="id.performance.fifa20.addResultsModal.form.opponent" tagName="label"/>}
                        options={opponentsList}
                        searchFn={e => setSearchString(e.state.search)}
                        onChange={value => selectHandler(value, 'opponent')}/>
                </Box>
            </Styled.Group>
            <Styled.Group>
                <Box>
                    <Grid container spacing={4}>
                        <Grid container item xs={9}>
                            <Box width={1}>
                                <Select
                                    clearable
                                    values={myTeam}
                                    error={errors.myTeam}
                                    label={<FormattedMessage id="id.performance.fifa20.addResultsModal.form.myTeam" tagName="label"/>}
                                    options={getTeamsOptions(teams)}
                                    onChange={value => selectHandler(value, 'myTeam')}/>
                            </Box>
                        </Grid>
                        <Grid container item xs={3}>
                            <Box width={1}>
                                <Label>
                                    <div className="no-wrap">
                                        <FormattedMessage id="id.performance.fifa20.addResultsModal.form.homeMatch"/>
                                    </div>
                                </Label>
                                <Styled.CheckHolder>
                                    <CheckBox
                                        onChange={() => handleHomeMatch('me')}
                                        checked={homeMatch.me}>
                                    </CheckBox>
                                </Styled.CheckHolder>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container spacing={4}>
                        <Grid container item xs={9}>
                            <Box width={1}>
                                <Select
                                    clearable
                                    values={opponentTeam}
                                    error={errors.opponentTeam}
                                    label={<FormattedMessage id="id.performance.fifa20.addResultsModal.form.opponentTeam" tagName="label"/>}
                                    options={getTeamsOptions(teams)}
                                    onChange={value => selectHandler(value, 'opponentTeam')}/>
                            </Box>
                        </Grid>
                        <Grid container item xs={3}>
                            <Box width={1}>
                                <Label>
                                    &nbsp;
                                </Label>
                                <Styled.CheckHolder>
                                    <CheckBox
                                        onChange={() => handleHomeMatch('opponent')}
                                        checked={homeMatch.opponent}>
                                    </CheckBox>
                                </Styled.CheckHolder>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={2}>
                    <CheckBox
                        onChange={() => setAdditionalTime(!additionalTime)}
                        checked={additionalTime}>
                        <FormattedMessage id="id.performance.fifa20.addResultsModal.form.additionalTime"/>
                    </CheckBox>
                </Box>
                <Box mt={2}>
                    <CheckBox
                        onChange={() => setPenalty(!penalty)}
                        checked={penalty}>
                        <FormattedMessage id="id.performance.fifa20.addResultsModal.form.penalty"/>
                    </CheckBox>
                </Box>
                <Box mt={2}>
                    <Label>
                        <FormattedMessage id="id.performance.fifa20.addResultsModal.form.score"/>
                    </Label>
                    <Grid container spacing={4}>
                        <Grid container item xs={3}>
                            <Box>
                                <Input
                                    value={score.me}
                                    error={errors.myScore}
                                    onChange={handleScore}
                                    name="me"/>
                            </Box>
                        </Grid>
                        <Grid container item xs={1}>
                            <Styled.ScoreDiv>
                                :
                            </Styled.ScoreDiv>
                        </Grid>
                        <Grid container item xs={3}>
                            <Box>
                                <Input
                                    value={score.opponent}
                                    error={errors.opponentScore}
                                    onChange={handleScore}
                                    name="opponent"/>
                            </Box>
                        </Grid>
                    </Grid>
                    {penalty &&
                        <Box mt={2}>
                            <Label>
                                <FormattedMessage id="id.performance.fifa20.addResultsModal.form.penaltyScore"/>
                            </Label>
                            <Grid container spacing={4}>
                                <Grid container item xs={3}>
                                    <Box>
                                        <Input
                                            value={penaltyScore.me}
                                            error={errors.myPenaltyScore}
                                            onChange={handlePenaltyScore}
                                            name="me"/>
                                    </Box>
                                </Grid>
                                <Grid container item xs={1}>
                                    <Styled.ScoreDiv>
                                        :
                                    </Styled.ScoreDiv>
                                </Grid>
                                <Grid container item xs={3}>
                                    <Box>
                                        <Input
                                            value={penaltyScore.opponent}
                                            error={errors.opponentPenaltyScore}
                                            onChange={handlePenaltyScore}
                                            name="opponent"/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </Box>
            </Styled.Group>
            <Box>
                <ButtonRow direction="right">
                    <Button
                        label={<FormattedMessage id="id.performance.fifa20.results.addResult"/>}
                        action={submit} />
                </ButtonRow>
            </Box>
        </Modal>
    )
}

export default AddResultsModal