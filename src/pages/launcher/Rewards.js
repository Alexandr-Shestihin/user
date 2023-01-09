import React from "react";
import styled from "styled-components";
import Achievements from "../../components/achievements-steam";
import {
    ButtonRow,
    Button,
    ArrowButton,
    ContentBox,
    InnerBox,
    TitleRow,
    TitleRowTitle
} from "../../components/UI";
import clockIcon from '../../assets/icons/clock.svg';
import availableIcon from '../../assets/icons/available.svg';
import dollarIcon from '../../assets/icons/dollar.svg';

const RewardsRow = styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px 30px;
    `,
    RewardsCol = styled.div`
        padding: 0 5px;
        width: 33.3333%;
        
        @media (max-width: 767px) {
            width: 100%;
            
            & + & {
                margin-top: 10px;
            }
        }
    `,
    RewardsItem = styled(InnerBox)`
        .title {
            font-weight: 500;
            font-size: 18px;
            margin: 0 0 16px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .list-holder {
            margin: 0 0 16px;
        }
        
        .icon-list {
            display: flex;
            align-items: center;
            
            span {
                font-size: 14px;
            }
        }
        
        .icon {
            margin-right: 12px;
            display: flex;
            align-items: center;
            flex-shrink: 0;
        }
        
        .icon-list + .icon-list {
            margin-top: 12px;
        }
        
        .content {
            font-size: 14px;
            line-height: 1.5;
        }
    `,
    StyledTitleRow = styled(TitleRow)`
        @media (max-width: 767px) {
            button {
                display: none;
            }
        }
    `;

export default function Rewards() {
    return (
        <ContentBox>
            <StyledTitleRow>
                <TitleRowTitle>Get more rewards</TitleRowTitle>
                <ArrowButton label="View all" action={() => console.log('view all')}/>
            </StyledTitleRow>
            <RewardsRow>
                <RewardsCol>
                    <RewardsItem>
                        <div className="title">Play 50 games (34 left)</div>
                        <div className="list-holder">
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={dollarIcon} alt="dollar icon"/>
                                </div>
                                <span>500  GG</span>
                            </div>
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={clockIcon} alt="clock icon"/>
                                </div>
                                <span>5 days left</span>
                            </div>
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={availableIcon} alt="available icon"/>
                                </div>
                                <span>available: 34</span>
                            </div>
                        </div>
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                        <ButtonRow>
                            <Button
                                label="Details"
                                action={() => console.log('Details')}/>
                        </ButtonRow>
                    </RewardsItem>
                </RewardsCol>
                <RewardsCol>
                    <RewardsItem>
                        <div className="title">Daily bonus</div>
                        <div className="list-holder">
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={dollarIcon} alt="dollar icon"/>
                                </div>
                                <span>500  GG</span>
                            </div>
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={clockIcon} alt="clock icon"/>
                                </div>
                                <span>5 days left</span>
                            </div>
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={availableIcon} alt="available icon"/>
                                </div>
                                <span>available: 34</span>
                            </div>
                        </div>
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                        <ButtonRow>
                            <Button
                                label="Join"
                                variant="secondary"
                                action={() => console.log('Join')}/>
                        </ButtonRow>
                    </RewardsItem>
                </RewardsCol>
                <RewardsCol>
                    <RewardsItem>
                        <div className="title">Play 50 games (34 left)</div>
                        <div className="list-holder">
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={dollarIcon} alt="dollar icon"/>
                                </div>
                                <span>500  GG</span>
                            </div>
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={clockIcon} alt="clock icon"/>
                                </div>
                                <span>5 days left</span>
                            </div>
                            <div className="icon-list">
                                <div className="icon">
                                    <img src={availableIcon} alt="available icon"/>
                                </div>
                                <span>available: 34</span>
                            </div>
                        </div>
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                        <ButtonRow>
                            <Button
                                label="Join"
                                variant="secondary"
                                action={() => console.log('Join')}/>
                        </ButtonRow>
                    </RewardsItem>
                </RewardsCol>
            </RewardsRow>
            <Achievements/>
        </ContentBox>
    )
}