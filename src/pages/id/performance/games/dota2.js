import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useIntl} from "react-intl";
import {toast} from "react-toastify";
import {LinearProgress} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import {ContentBox, TitleRowTitle, InnerBox, ProgressCircle, Button, Table} from "../../../../components/UI";
import Styled from "../style";
import PropTypes from "prop-types";
import GameSwitcher from "../../../../components/game-switcher";
import {API, API_ROUTER} from "../../../../api";

export default function PerformanceDota2({performance, selectedGame, gamesAvailable, setSelectedGame, userUuid}) {
    const history = useHistory();
    const Intl = useIntl();
    const tabs = [
        Intl.formatMessage({id: "id.performance.dota.overview"}),
        Intl.formatMessage({id: "id.performance.dota.heroes"})
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [heroesData, setHeroesData] = useState(null);

    useEffect(() => {

        const params = {
            ...API_ROUTER.games.dota2.getHeroesStatistic,
            pathKeys: {
                userUuid: userUuid
            }
        }

        API.request(params)
            .then(({heroes}) => setHeroesData(heroes))
            .catch(err => toast.error(err.data && err.data.message))

    }, [userUuid])

    if (!performance || !performance.all)
        return false;

    // performance data
    const {all} = performance;

    // heroes
    const heroes = () => {
        if (!heroesData) return <LinearProgress/>;

        if (!heroesData.length) return <Styled.NoTableData>No data...</Styled.NoTableData>

        const tableModel = [
            {
                key: 'hero',
                value: 'Heroes'
            },
            {
                key: 'matches',
                value: 'Matches',
                sortable: true
            },
            {
                key: 'winrate',
                value: 'Winrate',
                sortable: true,
                valueModifier: '%'
            },
            {
                key: 'kda',
                value: 'KDA',
                sortable: true
            },
            {
                key: 'xpm',
                value: 'XPM',
                sortable: true
            },
            {
                key: 'gpm',
                value: 'GPM',
                sortable: true
            }
        ]

        const tableData = heroesData.map(item => ({
                hero: (
                    <Styled.TableHero>
                        <img src={item.avatars?.small} alt={item.name} />
                        {item.name}
                    </Styled.TableHero>
                ),
                matches: item.matches,
                winrate: item.winrate,
                kda: item.kda,
                xpm: item.xpm,
                gpm: item.gpm
            })
        )

        return (
            <>
                <Styled.PerformanceTitle>The most played heroes</Styled.PerformanceTitle>
                <Table tableModel={tableModel} tableData={tableData} variant="dotaHeroes"/>
            </>
        )
    }

    // overview
    const overview = () => (
        <>
            <Styled.PerformanceTitle>
                <FormattedMessage id="id.performance" />
            </Styled.PerformanceTitle>
            <Styled.PerformanceRow>
                <Styled.PerformanceCol>
                    {/*<Styled.PerformanceData>*/}
                    {/*    <FormattedMessage id="id.performance.dota.rating" tagName="div" />*/}
                    {/*    <div>{all.rating}</div>*/}
                    {/*</Styled.PerformanceData>*/}
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.dota.kills" tagName="div" />
                        <div>{all.kills}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.dota.assists" tagName="div" />
                        <div>{all.assists}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.dota.deaths" tagName="div" />
                        <div>{all.deaths}</div>
                    </Styled.PerformanceData>
                </Styled.PerformanceCol>
                <Styled.PerformanceCol>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.dota.matches" tagName="div" />
                        <div>{all.matches}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.dota.lastHits" tagName="div" />
                        <div>{all.lastHits}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <FormattedMessage id="id.performance.dota.denies" tagName="div" />
                        <div>{all.denies}</div>
                    </Styled.PerformanceData>
                    <Styled.PerformanceData>
                        <div>XPM</div>
                        <div>{all.xpm}</div>
                    </Styled.PerformanceData>
                </Styled.PerformanceCol>
            </Styled.PerformanceRow>
            <Styled.PerformanceControls>
                <div/>
                {/*<ArrowButton*/}
                {/*    label="Deep weapon insights"*/}
                {/*    variant="secondary"*/}
                {/*    action={() => console.log('Deep weapon insights')}/>*/}
                <Button
                    label={<FormattedMessage id="id.performance.seeInRating" />}
                    action={() => history.push(`/ratings/${selectedGame}`)}/>
            </Styled.PerformanceControls>
            <Styled.ProgressRow>
                <Styled.ProgressCol>
                    <InnerBox>
                        <Styled.ProgressTitle>
                            <FormattedMessage id="id.performance.dota.winRate" />
                        </Styled.ProgressTitle>
                        <ProgressCircle
                            value={all?.winrate?.toFixed(1)}/>
                    </InnerBox>
                </Styled.ProgressCol>
                <Styled.ProgressCol>
                    <InnerBox>
                        <Styled.ProgressTitle>
                            <FormattedMessage id="id.performance.dota.kda" />
                        </Styled.ProgressTitle>
                        <ProgressCircle
                            fakeProgress
                            value={all?.kda?.toFixed(2)}/>
                    </InnerBox>
                </Styled.ProgressCol>
                <Styled.ProgressCol>
                    <InnerBox>
                        <Styled.ProgressTitle>
                            <FormattedMessage id="id.performance.dota.gpm" />
                        </Styled.ProgressTitle>
                        <ProgressCircle
                            fakeProgress
                            value={all?.gpm?.toFixed(0)}/>
                    </InnerBox>
                </Styled.ProgressCol>
            </Styled.ProgressRow>
        </>
    )

    // return
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
                    {tabs.map(item =>
                        <div
                            key={item}
                            className={activeTab === item ? 'active' : ''}
                            onClick={() => setActiveTab(item)}>
                            {item}
                        </div>
                    )}
                </Styled.Tabs>
            </Styled.StyledTitleRow>
            {activeTab === tabs[0] ? overview() : heroes()}
        </ContentBox>
    )
}

PerformanceDota2.propTypes = {
    performance: PropTypes.object, // performance object
    selectedGame: PropTypes.string,
    gamesAvailable: PropTypes.array.isRequired,
    setSelectedGame: PropTypes.func.isRequired
};