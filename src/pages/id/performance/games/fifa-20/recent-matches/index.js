import React from "react";
import styled from "styled-components";
import {InnerBox, Table} from "../../../../../../components/UI";
import {FormattedMessage, useIntl} from "react-intl";
import {useSelector} from "react-redux";
import {getAvatar} from "../../../../../../helpers";
import {useHistory} from "react-router-dom";

const Styled = {
    Title: styled(InnerBox)`
        margin: 0 0 10px;
        padding: 10px 15px;
        text-align: center;
        font-weight: bold;
        font-size: 21px;
        color: #D5CBFF;
    `,
    Results: styled.div`
        > span {
            font-weight: bold;
            font-size: 14px;
            
            &.win {
                color: #14C911;
            }
            
            &.lose {
                color: #EB5757;
            }
        }
    `,
    Versus: styled.div`
        display: flex;
        align-items: center;
        
        .div {
            padding: 0 10px;
        }
    `,
    Player: styled.a`
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        color: #fff;
        
        &:hover {
            text-decoration: underline;
        }
        
        .name {
            .current {
                color: #EDA211;
            }
        }
        
        .picture {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
            background-size: cover;
            border-radius: 50%;
            position: relative;
            
            &.top-gamer {
                &:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: -1px;
                    left: -1px;
                    right: -1px;
                    bottom: -1px;
                    border: 1px solid #EDA211;
                    border-radius: 50%;
                }
            }
        }
    `,
    Team: styled.div`
        padding-top: 4px;
        display: flex;
        align-items: center;
        
        .image {
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8px;
            
            img {
                display: block;
                max-width: 100%;
                max-height: 100%;
            }
        }
    `
}

const RecentMatches = ({matches, tournaments}) => {
    const intl = useIntl()
    const userData = useSelector(store => store.userData)
    const history = useHistory()

    const tableModel = [
        {
            key: 'matchName',
            value: intl.formatMessage({id: 'id.performance.fifa20.table.matchName'})
        },
        {
            key: 'date',
            value: intl.formatMessage({id: 'id.performance.fifa20.table.date'})
        },
        {
            key: 'result',
            value: intl.formatMessage({id: 'id.performance.fifa20.table.result'})
        },
        {
            key: 'score',
            value: intl.formatMessage({id: 'id.performance.fifa20.table.score'})
        },
        {
            key: 'type',
            value: intl.formatMessage({id: 'id.performance.fifa20.table.type'})
        },
        {
            key: 'tournamentName',
            value: intl.formatMessage({id: 'id.performance.fifa20.table.tournamentName'})
        }
    ]

    const getMatchName = results => {
        const [left, right] = results;

        if (!userData) {
            return false;
        }

        return (
            <Styled.Versus>
                <div>
                    <Styled.Player
                        href={'/id/' + left.user.url}
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            history.push('/id/' + left.user.url)
                        }}
                        image={getAvatar(left.user.avatars)}>
                        {/*<div className={`picture ${left.user.topGamer && 'top-gamer'}`}/>*/}
                        <div className="name">
                            <span className={left.user.uuid === userData.uuid ? 'current' : ''}>
                                {left.user.nickname}
                            </span>
                        </div>
                    </Styled.Player>
                    <Styled.Team>
                        <div className="image">
                            <img src={left.team.image} alt={left.team.name}/>
                        </div>
                        <div className="name">
                            {left.team.name}
                        </div>
                    </Styled.Team>
                </div>
                <div className="div">
                    —
                </div>
                <div>
                    <Styled.Player
                        href={'/id/' + right.user.url}
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            history.push('/id/' + right.user.url)
                        }}
                        image={getAvatar(right.user.avatars)}>
                        {/*<div className={`picture ${right.user.topGamer && 'top-gamer'}`}/>*/}
                        <div className="name">
                            <span className={right.user.uuid === userData.uuid ? 'current' : ''}>
                                {right.user.nickname}
                            </span>
                        </div>
                    </Styled.Player>
                    <Styled.Team>
                        <div className="image">
                            <img src={right.team.image} alt={right.team.name}/>
                        </div>
                        <div className="name">
                            {right.team.name}
                        </div>
                    </Styled.Team>
                </div>
            </Styled.Versus>
        )
    }

    const getScores = results => {
        const [left, right] = results;

        let score = `${left.score} : ${right.score}`

        if (left.penalty && right.penalty) {
            score += ` (${left.penaltyScore}:${right.penaltyScore})`
        }

        return score;
    }

    const getResult = results => {
        const [left, right] = results;

        if (!userData) {
            return false;
        }

        const currentUser = [left, right].find(u => u.user.uuid === userData.uuid)
        const opponent = [left, right].find(u => u.user.uuid !== userData.uuid)

        let res = 'N'
        let className = '';

        if (currentUser.score > opponent.score) {
            res = 'W'
            className = 'win'
        }

        else if (currentUser.score < opponent.score) {
            res = 'L';
            className = 'lose'
        }

        else if (currentUser.penalty && opponent.penalty){
            if (currentUser.penaltyScore > opponent.penaltyScore) {
                res = 'W'
                className = 'win'
            }

            if (currentUser.penaltyScore < opponent.penaltyScore) {
                res = 'L';
                className = 'lose'
            }
        }

        return (
            <Styled.Results>
                <span className={className}>
                    {res}
                </span>
            </Styled.Results>
        )
    }

    const tableData = matches
        .filter(match => match.confirmed)
        .sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map(match => {
            const tournament = tournaments.find(t => t.uuid === match.tournamentUuid)

            return {
                matchName: getMatchName(match.results),
                date: match.createdAt.split(' ')[0].split('-').reverse().join('.'),
                result: getResult(match.results),
                scores: getScores(match.results),
                type: tournament.type,
                tournamentName: tournament.name,
                onRowClick: () => history.push('/fifa/match/' + match.uuid)
            }
        })

    return (
        <div>
            <Styled.Title>
                <FormattedMessage id="id.performance.fifa20.recentMatches" />
            </Styled.Title>
            <Table
                clickable
                tableModel={tableModel}
                tableData={tableData} />
        </div>
    )
}

export default RecentMatches