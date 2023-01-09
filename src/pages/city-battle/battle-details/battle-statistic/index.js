import React from "react";
import {useSelector} from "react-redux";
import {Info, Vote, Details} from "./style";
import {FormattedMessage} from "react-intl";
import LangDecoder from "../../../../components/lang-decoder";
import {TYPE_OPTIONS} from "../../../../config";
import {API, API_ROUTER} from "../../../../api";

const progressLine = (name, valueLeft, valueRight) => {
    const modifier = name === 'winrate' ? '%' : ''
    let pLeft = +valueLeft;
    let pRight = +valueRight;

    if (pLeft > 100 || pRight > 100) {
        pLeft = pLeft / 10;
        pRight = pRight / 10;
    }

    return (
        <Details.Line key={name}>
            <div className="name">
                <FormattedMessage id={`cityBattle.details.${name}`} />
            </div>
            <div className="lines">
                <div className="base">
                    <div className="progress left" style={{width: pLeft + '%'}}/>
                </div>
                <div className="base">
                    <div className="progress right" style={{width: pRight + '%'}}/>
                </div>
            </div>
            <div className="values">
                <div className="value value-left">{valueLeft + modifier}</div>
                <div className="value value-right">{valueRight + modifier}</div>
            </div>
        </Details.Line>
    )
}

const likeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0)">
            <path d="M1.75 23H4.25C5.215 23 6 22.215 6 21.25V9.75C6 8.785 5.215 8 4.25 8H1.75C0.785 8 0 8.785 0 9.75V21.25C0 22.215 0.785 23 1.75 23Z" fill="#201941"/>
            <path d="M12.781 0.75C11.781 0.75 11.281 1.25 11.281 3.75C11.281 6.126 8.98 8.038 7.5 9.023V21.411C9.101 22.152 12.306 23.25 17.281 23.25H18.881C20.831 23.25 22.491 21.85 22.821 19.93L23.941 13.43C24.361 10.98 22.481 8.75 20.001 8.75H15.281C15.281 8.75 16.031 7.25 16.031 4.75C16.031 1.75 13.781 0.75 12.781 0.75Z" fill="#201941"/>
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="24" height="24" fill="white"/>
            </clipPath>
        </defs>
    </svg>
)

const Votes = ({battle, voted, updateHandler}) => {
    const userData = useSelector(store => store.userData)
    const [left, right] = battle.participants
    const vote = (battle, participant) => {
        const params = {
            ...API_ROUTER.battles.voteForParticipant,
            pathKeys: {
                battle,
                participant
            }
        }

        API.request(params, true)
            .then(() => updateHandler())
            .catch(err => console.log(err))
    }

    return (
        <>
            <Vote.Holder>
                {!voted && userData &&
                    <div className="flex-group">
                        <button type="button" onClick={() => vote(battle.uuid, left.participant.uuid)}>
                            <LangDecoder data={left.participant} target="name"/>
                            <div className="icon">{likeIcon()}</div>
                        </button>
                        <div className="vs">
                            <FormattedMessage id="cityBattle.vote.question" />
                        </div>
                        <button type="button" onClick={() => vote(battle.uuid, right.participant.uuid)}>
                            <LangDecoder data={right.participant} target="name"/>
                            <div className="icon">{likeIcon()}</div>
                        </button>
                    </div>
                }
                {voted &&
                    <div className="flex-group flex-group-results">
                        <div className="result">
                            <div className="votes votes-left">
                                {left?.votes?.count}
                            </div>
                            <div className="view">
                                <div className="progress progress-left" style={{width: left?.votes?.percent + '%'}}/>
                                <div className="txt">
                                    {left?.votes?.percent + '%'}
                                </div>
                            </div>
                        </div>
                        <div className="vs vs-result">
                            <FormattedMessage id="cityBattle.vote.results" tagName="strong"/>
                        </div>
                        <div className="result">
                            <div className="votes votes-right">
                                {right?.votes?.count}
                            </div>
                            <div className="view">
                                <div className="progress progress-right" style={{width: right?.votes?.percent + '%'}}/>
                                <div className="txt">
                                    {right?.votes?.percent + '%'}
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Vote.Holder>
        </>
    )
}

const Participant = ({participant, statistics}) => {
    const {images} = participant
    const timeSpent = sec => sec ? (sec / 60 / 60).toFixed(0) : ''
    const getType = key => {
        const target = TYPE_OPTIONS.find(item => item.value === key);
        return target ? <FormattedMessage id={target.label} /> : 'Undefined...';
    }

    return (
        <Info.Card>
            <div className="city">
                <LangDecoder data={participant} target="name"/>
            </div>
            <div className="country">{getType(participant.type)}</div>
            {images.main &&
                <div className="image">
                    <img src={images.main} alt="participant" />
                </div>
            }
            <hr />
            <div className="details">
                <div className="details-row">
                    <div className="details-col">
                        <FormattedMessage id="cityBattle.stat.allParticipants" />:
                    </div>
                    <div className="details-col">{statistics.participant.totalPlayers}</div>
                </div>
                <div className="details-row">
                    <div className="details-col">
                        <FormattedMessage id="cityBattle.stat.gamesPlayed" />:
                    </div>
                    <div className="details-col">{statistics.participant.totalGames}</div>
                </div>
                <div className="details-row">
                    <div className="details-col">
                        <FormattedMessage id="cityBattle.stat.timeSpent" />:
                    </div>
                    <div className="details-col">
                        {timeSpent(statistics?.participant?.timeSpent)}
                    </div>
                </div>
                <div className="details-row">
                    <div className="details-col">
                        <FormattedMessage id="cityBattle.stat.rating" />:
                    </div>
                    <div className="details-col">{statistics.participant.rating}</div>
                </div>
            </div>
        </Info.Card>
    )
}

export const Statistic = ({battle, voted, statistics, updateHandler}) => {
    const {details} = statistics;
    const [pLeft, pRight] = battle.participants;
    const [dLeft, dRight] = details;
    const sLeft = Object.entries(dLeft.statistics);
    const sRight = Object.entries(dRight.statistics);

    if (!pLeft || !pRight)
        return false;

    return (
        <Info.Wrapper>
            <Info.CardHolder>
                <Participant participant={pLeft.participant} statistics={dLeft}/>
                <div className="vs">VS</div>
                <Participant participant={pRight.participant} statistics={dRight}/>
            </Info.CardHolder>
            <Votes battle={battle} voted={voted} updateHandler={updateHandler}/>
            <Details.Wrapper>
                <Details.Title>
                    <FormattedMessage id="cityBattle.detailsStatistics" />
                </Details.Title>
                <Details.Legend>
                    <div className="marker left"/>
                    <div className="name">{pLeft.participant.name}</div>
                    <div className="spacer">/</div>
                    <div className="marker right"/>
                    <div className="name">{pRight.participant.name}</div>
                </Details.Legend>
                {sLeft.map((item, index) => {
                    const [key, value] = item;
                    const [,rightValue] = sRight[index];
                    return progressLine(key, value.toFixed(0), rightValue.toFixed(0));
                })}
            </Details.Wrapper>
        </Info.Wrapper>
    )
}