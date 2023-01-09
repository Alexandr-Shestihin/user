import React from "react";
import {Styled} from './style';
import {FormattedMessage} from "react-intl";
import {useHistory} from "react-router-dom";
import classNames from 'classnames';
import {Button, ButtonRow, Table} from "../../../../components/UI";
import {getAvatar} from "../../../../helpers";
import LangDecoder from "../../../../components/lang-decoder";

export function Leaderboard({battle, statistics}) {
    const history = useHistory();
    const [pLeft, pRight] = battle.participants;
    const [dLeft, dRight] = statistics.details;
    const tableModel = [
        {
            key: 'player',
            value: <FormattedMessage id="cityBattle.leaderboard.table.player" />
        },
        {
            key: 'winrate',
            value: <FormattedMessage id="cityBattle.leaderboard.table.winrate" />,
            valueModifier: '%'
        },
        {
            key: 'gpm',
            value: <FormattedMessage id="cityBattle.leaderboard.table.gpm" />
        }
    ]
    const lTableData = dLeft.leaderboard.map(player => ({
        player: (
            <Styled.Player
                onClick={e => {
                    e.preventDefault()
                    history.push(`/id/${player.user.url}`)
                }}
                image={getAvatar(player.user.avatars)}
                href={`/id/${player.user.url}`}>
                <div className={classNames('picture', {
                    'top-gamer': player.user.topGamer
                })} />
                <div className="name">
                    {player.user.nickname}
                </div>
            </Styled.Player>
        ),
        winrate: player.statistics.winrate,
        gpm: player.statistics.gpm
    }))
    const rTableData = dRight.leaderboard.map(player => ({
        player: (
            <Styled.Player
                onClick={e => {
                    e.preventDefault()
                    history.push(`/id/${player.user.url}`)
                }}
                image={getAvatar(player.user.avatars)}
                href={`/id/${player.user.url}`}>
                <div className={classNames('picture', {
                    'top-gamer': player.user.topGamer
                })} />
                <div className="name">
                    {player.user.nickname}
                </div>
            </Styled.Player>
        ),
        winrate: player.statistics.winrate,
        gpm: player.statistics.gpm
    }))

    return (
        <Styled.Wrapper>
            <Styled.Title>
                <FormattedMessage id="cityBattle.leaderboard" />
            </Styled.Title>
            <Styled.Row>
                <Styled.Col>
                    <Styled.City>
                        {pLeft.participant.images?.main &&
                            <div className="image">
                                <img src={pLeft.participant.images?.main} alt={pLeft.participant.name} />
                            </div>
                        }
                        <div className="name">
                            <LangDecoder data={pLeft.participant} target="name"/>
                        </div>
                    </Styled.City>
                    <Table tableModel={tableModel} tableData={lTableData} variant="topFive" ranked/>
                    {!!lTableData.length &&
                        <ButtonRow>
                            <Button
                                variant="secondary"
                                action={() => history.push(`/city-battle/${battle.url}/details/${pLeft.participant.name}`)}
                                label={<FormattedMessage id="global.buttons.details" />}/>
                        </ButtonRow>
                    }
                </Styled.Col>
                <Styled.Col>
                    <Styled.City>
                        {pRight.participant.images?.main &&
                            <div className="image">
                                <img src={pRight.participant.images?.main} alt={pRight.participant.name} />
                            </div>
                        }
                        <div className="name">
                            <LangDecoder data={pRight.participant} target="name"/>
                        </div>
                    </Styled.City>
                    <Table tableModel={tableModel} tableData={rTableData} variant="topFive" ranked/>
                    {!!rTableData.length &&
                        <ButtonRow>
                            <Button
                                variant="secondary"
                                action={() => history.push(`/city-battle/${battle.url}/details/${pRight.participant.name}`)}
                                label={<FormattedMessage id="global.buttons.details" />}/>
                        </ButtonRow>
                    }
                </Styled.Col>
            </Styled.Row>
        </Styled.Wrapper>
    )
}