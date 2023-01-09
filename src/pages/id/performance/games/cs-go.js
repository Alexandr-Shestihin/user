import React from "react";
import {useHistory} from "react-router-dom";
import {ContentBox, TitleRowTitle, InnerBox, ProgressCircle, Button} from "../../../../components/UI";
import Styled from "../style";
import PropTypes from "prop-types";
import GameSwitcher from "../../../../components/game-switcher";
import {FormattedMessage} from "react-intl";

export default function PerformanceCSGO({performance, selectedGame, gamesAvailable, setSelectedGame}) {
    const history = useHistory();

    if (!performance || !performance.all)
        return false;

    const {all} = performance;

    return (
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
                    {/*<Styled.PerformanceData>*/}
                    {/*    <FormattedMessage id="id.performance.cs.rating" tagName="div" />*/}
                    {/*    <div>{all.rating}</div>*/}
                    {/*</Styled.PerformanceData>*/}
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.totalWins" tagName="div" />
                        <div>{all.wins}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.totalLoses" tagName="div" />
                        <div>{all.loses}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.totalDamage" tagName="div" />
                        <div>{all.damage}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.roundsPlayed" tagName="div" />
                        <div>{all.rounds}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.matchesPlayed" tagName="div" />
                        <div>{all.matches}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.moneyEarned" tagName="div" />
                        <div>{all.money}</div>
                    </Styled.PerformanceData>
                </Styled.PerformanceCol>
                <Styled.PerformanceCol>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.totalKills" tagName="div" />
                        <div>{all.kills}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.totalDeaths" tagName="div" />
                        <div>{all.deaths}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.kd" tagName="div" />
                        <div>{all.kd}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.ard" tagName="div" />
                        <div>{all.adr}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.kpr" tagName="div" />
                        <div>{all.kpr}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.cs.hoursPlayed" tagName="div" />
                        <div>{all.hours}</div>
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
                            <FormattedMessage id="id.performance.cs.winRate" />
                        </Styled.ProgressTitle>
                        <ProgressCircle
                            value={all?.winrate?.toFixed(1)}/>
                    </InnerBox>
                </Styled.ProgressCol>
                <Styled.ProgressCol>
                    <InnerBox>
                        <Styled.ProgressTitle>
                            <FormattedMessage id="id.performance.cs.headshotRate" />
                        </Styled.ProgressTitle>
                        <ProgressCircle
                            value={all?.headshotRate?.toFixed(1)}/>
                    </InnerBox>
                </Styled.ProgressCol>
                <Styled.ProgressCol>
                    <InnerBox>
                        <Styled.ProgressTitle>
                            <FormattedMessage id="id.performance.cs.accuracy" />
                        </Styled.ProgressTitle>
                        <ProgressCircle
                            value={all?.accuracy?.toFixed(1)}/>
                    </InnerBox>
                </Styled.ProgressCol>
            </Styled.ProgressRow>
        </ContentBox>
    )
}

PerformanceCSGO.propTypes = {
    performance: PropTypes.object, // performance object
    selectedGame: PropTypes.string,
    gamesAvailable: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired
};