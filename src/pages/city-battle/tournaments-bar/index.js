import React from "react";
import BattleCard from '../battle-card';
import {Styled} from "./style";
import {FormattedMessage} from "react-intl";

export default function TournamentsBar({currentBattles, ongoingBattles}) {
    if (!currentBattles.length && !ongoingBattles.length) {
        return (
            <Styled.Wrapper>
                <Styled.Group>
                    <Styled.Title>
                        <FormattedMessage id="cityBattle.noOngoingBattlesBattle" />
                    </Styled.Title>
                </Styled.Group>
            </Styled.Wrapper>
        )
    }

    return (
        <Styled.Wrapper>
            {!!ongoingBattles.length &&
                <Styled.Group>
                    <Styled.Title>
                        <FormattedMessage id="cityBattle.futureTournaments" />
                    </Styled.Title>
                    {ongoingBattles.map(battle => (
                        <BattleCard
                            battle={battle}
                            key={battle.uuid}/>
                    ))}
                </Styled.Group>
            }
            {!!currentBattles.length &&
                <Styled.Group>
                    <Styled.Title>
                        <FormattedMessage id="cityBattle.currentTournaments" />
                    </Styled.Title>
                    {currentBattles.map(battle => (
                        <BattleCard
                            battle={battle.battle}
                            key={battle.battle.uuid}/>
                    ))}
                </Styled.Group>
            }
        </Styled.Wrapper>
    )
}