import React from "react";
// import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
// import Slider from "react-slick";
import {LinearProgress} from "@material-ui/core";
import {
    IconFacebook,
    IconTelegram,
    IconTwitter,
    IconVK
} from "../../../components/social-icons";
import {Styled} from "./style";
// import BattleCard from "../battle-card";
import {FormattedMessage, useIntl} from "react-intl";
import ShareLink from "../../../components/share-link";
// import {getAvatar} from "../../../helpers";
// import classNames from "classnames";
import {ArrowButton, Table} from "../../../components/UI";
import {TYPE_OPTIONS} from "../../../config";

// const SlickArrow = ({currentSlide, slideCount, children, ...props}) => <button {...props}>{children}</button>
//
// const sliderSettings = {
//     dots: false,
//     infinite: false,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: (
//         <SlickArrow>
//             <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M0.112875 4.104V2.84H7.98488V0.856L12.4809 3.464L7.98488 6.088V4.104H0.112875Z" fill="white"/>
//             </svg>
//         </SlickArrow>
//     ),
//     prevArrow: (
//         <SlickArrow>
//             <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12.8871 4.104V2.84H5.01512V0.856L0.519124 3.464L5.01512 6.088V4.104H12.8871Z" fill="white"/>
//             </svg>
//         </SlickArrow>
//     ),
//     responsive: [
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 1
//             }
//         },
//         {
//             breakpoint: 768,
//             settings: {
//                 slidesToShow: 1,
//                 slidesToScroll: 1
//             }
//         }
//     ]
// }

const formatDate = date => date.split('-').reverse().join('.')

const renderParticipant = (participant, side) => {
    return (
        <div className={`participant participant-${side}`}>
            {participant.images && participant.images.main &&
                <div className="image">
                    <img src={participant.images.main} alt={participant.images.main} />
                </div>
            }
            <div className="name">
                {participant.name}
            </div>
        </div>
    )
}

const RenderTable = battles => {
    const history = useHistory()
    const tableModel = [
        {
            key: 'name',
            value: <FormattedMessage id="cityBattle.currentTable.name" />
        },
        {
            key: 'date',
            value: <FormattedMessage id="cityBattle.currentTable.date" />
        },
        {
            key: 'actions',
            value: <FormattedMessage id="cityBattle.currentTable.actions" />
        }
    ]
    const tableData = battles.map(({battle}) => {
        const {participants} = battle;
        const [left, right] = participants;

        return ({
            name: (
                <Styled.TableName>
                    <div className="item">
                        {left?.participant?.images?.main &&
                            <div className="img">
                                <img src={left?.participant?.images?.main} alt={left?.participant?.name} />
                            </div>
                        }
                        <div className="name">{left?.participant?.name}</div>
                    </div>
                    <div className="vs">-</div>
                    <div className="item">
                        {right?.participant?.images?.main &&
                            <div className="img">
                                <img src={right?.participant?.images?.main} alt={right?.participant?.name}/>
                            </div>
                        }
                        <div className="name">{right?.participant?.name}</div>
                    </div>
                </Styled.TableName>
            ),
            date: <div className="no-wrap">{formatDate(battle.startDate)} - {formatDate(battle.endDate)}</div>,
            actions: (
                <ArrowButton
                    action={() => history.push('/city-battle/' + battle.url)}
                    variant="secondary"
                    label={<FormattedMessage id="global.buttons.details"/>}
                />
            )
        })
    })

    return (
        <>
            <Styled.TableTitle>
                <FormattedMessage id="cityBattle.tableTitle" />
            </Styled.TableTitle>
            <Table tableData={tableData} tableModel={tableModel}/>
        </>
    )
}

const RenderCard = ({battle, index}) => {
    const [left, right] = battle.participants
    const intl = useIntl()
    const history = useHistory()
    const getType = key => {
        const target = TYPE_OPTIONS.find(item => item.value === key);
        return target ? intl.formatMessage({id : target.label}) : 'Undefined...';
    }

    if (!left || !right)
        return false

    return (
        <Styled.CardHolder>
            <Styled.Card
                onClick={() => history.push('/city-battle/' + battle.url)}
                className={index === 0 && 'lg'}
                image={battle.images?.main}>
                <div className="content-holder">
                    <div className="game">{battle.game}</div>
                    <div className="vs">
                        {`${getType(left.participant.type)} vs ${getType(right.participant.type)}`}
                    </div>
                    <div className="date">
                        {`${formatDate(battle.startDate)} - ${formatDate(battle.endDate)}`}
                    </div>
                </div>
                <div className="social">
                    <ShareLink type="facebook">
                        <IconFacebook fill="#D5CBFF"/>
                    </ShareLink>
                    <ShareLink type="twitter">
                        <IconTwitter fill="#D5CBFF"/>
                    </ShareLink>
                    <ShareLink type="vk">
                        <IconVK fill="#D5CBFF"/>
                    </ShareLink>
                    <ShareLink type="telegram">
                        <IconTelegram fill="#D5CBFF"/>
                    </ShareLink>
                </div>
                {renderParticipant(left.participant, 'left')}
                {renderParticipant(right.participant, 'right')}
            </Styled.Card>
        </Styled.CardHolder>
    )
}

const MostPopular = ({currentBattles, popularBattles}) => {

    if (!popularBattles.length) {
        return (
            <Styled.Title>
                <FormattedMessage id="cityBattle.noActiveBattles" />
            </Styled.Title>
        )
    }

    return (
        <>
            <Styled.Title>
                <FormattedMessage id="cityBattle.mostPopular" />
            </Styled.Title>

            {!popularBattles
                ? <LinearProgress />
                : (
                    <Styled.Cards>
                        {popularBattles.map(
                            (battle, index) => <RenderCard
                                key={battle.uuid}
                                battle={battle}
                                index={index}
                            />)
                        }
                    </Styled.Cards>
                )
            }

            {!!currentBattles.length && RenderTable(currentBattles)}

            {/*{!!previousEvents.length &&*/}
            {/*    <>*/}
            {/*        <Styled.Previous>*/}
            {/*            <FormattedMessage id="cityBattle.previousTournaments" />*/}
            {/*        </Styled.Previous>*/}
            {/*        <Styled.Slider>*/}
            {/*            <Slider {...sliderSettings}>*/}
            {/*                {previousEvents.map(battle => (*/}
            {/*                    <div className="slide-holder" key={battle.battle.uuid}>*/}
            {/*                        <BattleCard battle={battle.battle} variant="slider"/>*/}
            {/*                    </div>*/}
            {/*                ))}*/}
            {/*            </Slider>*/}
            {/*        </Styled.Slider>*/}
            {/*    </>*/}
            {/*}*/}
        </>
    )
}

export default MostPopular