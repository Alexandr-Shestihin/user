import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import {FormattedMessage} from "react-intl";
import {LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {ContentBox, TitleRowTitle, Button, InnerBox, ProgressCircle} from "../../../../../components/UI";
import Styled from "../../style";
import {API, API_ROUTER} from "../../../../../api";
import GameSwitcher from "../../../../../components/game-switcher";
import RecentMatches from "./recent-matches";
import AddResultsModal from "./add-result";


export default function PerformanceFIFA20({performance, selectedGame, gamesAvailable, setSelectedGame}) {
    const history = useHistory();
    const userData = useSelector(store => store.userData)

    const [resultsModalState, setResultsModalState] = useState(false)
    const [matchesReady, setMatchesReady] = useState(false)
    const [tournamentsReady, setTournamentsReady] = useState(false)
    const [matches, setMatches] = useState([])
    const [teams, setTeams] = useState([])
    const [tournaments, setTournaments] = useState([])

    const all = performance?.all;

    const getRecentMatches = () => {
        let recent = []
        if (matches && userData) {
            matches.forEach(match => {
                if (match.confirmed) {
                    if (match.results.some(item => item.user.uuid === userData.uuid)) {
                        recent.push(match)
                    }
                }
            })
        }

        return recent;
    }

    const recentMatches = getRecentMatches();

    useEffect(() => {

        // get matches
        API.request({...API_ROUTER.fifa.getMatches}, true)
            .then(({matchList}) => {
                setMatches(matchList)
                setMatchesReady(true)
            })
            .catch(err => console.error(err))

        // get tournaments
        API.request({...API_ROUTER.fifa.getTournaments}, true)
            .then(({items}) => {
                setTournaments(items)
                setTournamentsReady(true)
            })
            .catch(err => console.error(err))

        // get teams
        API.request({...API_ROUTER.fifa.getTeams}, true)
            .then(({items}) => {
                setTeams(items)
            })
            .catch(err => console.error(err))

    }, [])

    if (!all) {
        return false;
    }

    return (
        <>
            {userData &&
                <ContentBox>
                    <Styled.AddResults>
                        <div className="copy">
                            <FormattedMessage id="id.performance.fifa20.results.addResultCopy" />
                        </div>
                        <Button
                            action={() => setResultsModalState(true)}
                            label={<FormattedMessage id="id.performance.fifa20.results.addResult"/>}/>
                    </Styled.AddResults>
                </ContentBox>
            }
            <ContentBox>
                <Styled.StyledTitleRow>
                    <TitleRowTitle>
                        <GameSwitcher
                            selectedGame={selectedGame}
                            gamesAvailable={gamesAvailable}
                            setSelectedGame={setSelectedGame}/>
                    </TitleRowTitle>
                    <Styled.Tabs>
                        <div className="active">
                            <FormattedMessage id="global.timers.allTime" />
                        </div>
                    </Styled.Tabs>
                </Styled.StyledTitleRow>
                <Styled.PerformanceTitle>
                    <FormattedMessage id="id.performance" />
                </Styled.PerformanceTitle>
                <Styled.PerformanceRow>
                    <Styled.PerformanceCol>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.matches" tagName="div" />
                            <div>{all.matches}</div>
                        </Styled.PerformanceData>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.wins" tagName="div" />
                            <div>{all.wins}</div>
                        </Styled.PerformanceData>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.loses" tagName="div" />
                            <div>{all.loses}</div>
                        </Styled.PerformanceData>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.draws" tagName="div" />
                            <div>{all.draws}</div>
                        </Styled.PerformanceData>
                    </Styled.PerformanceCol>
                    <Styled.PerformanceCol>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.goals" tagName="div" />
                            <div>{all.goals}</div>
                        </Styled.PerformanceData>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.misses" tagName="div" />
                            <div>{all.misses}</div>
                        </Styled.PerformanceData>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.diff" tagName="div" />
                            <div>{+(all.goals || 0) - +(all.misses || 0)}</div>
                        </Styled.PerformanceData>
                        <Styled.PerformanceData>
                            <FormattedMessage id="id.performance.fifa20.rating" tagName="div" />
                            <div>{all.rating}</div>
                        </Styled.PerformanceData>
                    </Styled.PerformanceCol>
                </Styled.PerformanceRow>
                <Styled.PerformanceControls>
                    <div/>
                    <Button
                        label={<FormattedMessage id="id.performance.seeInRating" />}
                        action={() => history.push(`/ratings/${selectedGame}`)}/>
                </Styled.PerformanceControls>
                <Styled.ProgressRow>
                    <Styled.ProgressCol>
                        <InnerBox>
                            <Styled.ProgressTitle>
                                <FormattedMessage id="id.performance.fifa20.winrate" />
                            </Styled.ProgressTitle>
                            <ProgressCircle
                                value={all?.winrate?.toFixed(1)}/>
                        </InnerBox>
                    </Styled.ProgressCol>
                </Styled.ProgressRow>
            </ContentBox>
            {userData && !!recentMatches.length &&
                <ContentBox>
                    {
                        matchesReady && tournamentsReady
                            ? <RecentMatches matches={recentMatches} tournaments={tournaments}/>
                            : <LinearProgress />
                    }
                </ContentBox>
            }
            <AddResultsModal
                teams={teams}
                tournaments={tournaments}
                closeHandler={() => setResultsModalState(false)}
                isOpen={resultsModalState}/>
        </>
    )
}

PerformanceFIFA20.propTypes = {
    performance: PropTypes.object,
    selectedGame: PropTypes.string,
    gamesAvailable: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired
};