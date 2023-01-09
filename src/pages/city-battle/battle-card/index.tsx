import React, {FunctionComponent} from "react";
import {useHistory} from "react-router-dom";
import {ArrowButton, ButtonRow} from "../../../components/UI";
import LangDecoder from "../../../components/lang-decoder";
import {IBattle, IParticipant} from "../types";
import {Styled} from "./style";
import {useIntl} from "react-intl";

const formatDate = (date: string) => date.split('-').reverse().join('.')

const renderParticipant = (participant: IParticipant) => {
    if (!participant)
        return false

    return (
        <Styled.Participant>
            {participant.participant.images && participant.participant.images.main &&
                <div className="image">
                    <img src={participant.participant.images.main} alt={participant.participant.name} />
                </div>
            }
            <div className="name">
                <LangDecoder data={participant.participant} target="name"/>
            </div>
        </Styled.Participant>
    )
}

const renderParticipants = (participants: IParticipant[]) => {
    const [left, right] = participants;

    return (
        <Styled.ParticipantsRow>
            {renderParticipant(left)}
            <div className="vs">
                <div>VS</div>
            </div>
            {renderParticipant(right)}
        </Styled.ParticipantsRow>
    )
}

interface Props {
    battle: IBattle;
    variant?: 'slider'
}

const BattleCard: FunctionComponent<Props> = ({battle, variant= ''}) => {
    const {participants} = battle;
    const history = useHistory();
    const intl = useIntl();

    return (
        <Styled.Card className={variant}>
            <div className="title">
                <LangDecoder data={battle} target="name"/>
            </div>
            <div className="date">
                {`${formatDate(battle.startDate)} - ${formatDate(battle.endDate)}`}
            </div>
            <div className="game">{battle.game}</div>
            {!!participants.length && renderParticipants(participants)}
            <ButtonRow direction="right">
                <ArrowButton
                    label={intl.formatMessage({id: "cityBattle.details"})}
                    action={() => history.push(`/city-battle/${battle.url}`)}/>
            </ButtonRow>
        </Styled.Card>
    )
}

export default BattleCard