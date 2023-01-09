import React from "react";
import styled from "styled-components";
import {
    ContentBox,
    InnerBox,
    TitleRow,
    TitleRowTitle,
    Button,
    ProgressCircle
} from "../../components/UI";

const StyledTitleRow = styled(TitleRow)`
        @media (max-width: 767px) {
            flex-wrap: wrap;
        }
    `,
    StyledTitleRowTitle = styled(TitleRowTitle)`
        @media (max-width: 767px) {
            width: 100%;
            margin: 0 0 10px;
        }
    `,
    TitleRank = styled.div`
        font-weight: 500;
        font-size: 21px;
        
        @media (max-width: 1199px) {
            font-size: 18px;
        }
        
        @media (max-width: 767px) {
            width: 50%;
            order: 1;
            text-align: center;
        }
    `,
    TitleAddress = styled.div`
        font-weight: 500;
        font-size: 21px;
        color: #FFBE3F;
        
        @media (max-width: 1199px) {
            font-size: 18px;
        }
        
        @media (max-width: 767px) {
            width: 100%;
            margin: 0 0 10px;
            text-align: center;
            font-size: 14px;
        }
    `,
    TitleGamers = styled.div`
        font-weight: 500;
        font-size: 21px;
        
        @media (max-width: 1199px) {
            font-size: 18px;
        }
        
         @media (max-width: 767px) {
            width: 50%;
            order: 1;
            text-align: center;
            font-size: 14px;
        }
    `,
    RatingsRow = styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    RatingsCol = styled.div`
        padding: 0 5px;
        
        &:first-child {
            width: 33.3333%;
            
            @media (max-width: 767px) {
                width: 100%;
            }
        }
        
        &:last-child {
            width: 66.6666%;
            
            @media (max-width: 767px) {
                width: 100%;
            }
        }
    `,
    CircleBox = styled(InnerBox)`
        .title {
            font-weight: 500;
            font-size: 18px;
            margin: 0 0 16px;
            text-align: center;
        }
        
        .circle {
            width: 150px;
            margin: 0 auto;
        }
    `,
    ContentIBox = styled(InnerBox)`
        background: transparent;
        padding-top: 18px;
        padding-bottom: 0;
        
        .title {
            font-weight: 500;
            font-size: 21px;
            margin: 0 0 16px;
        }
        
        .sub-title {
            font-size: 18px;
            margin: 0 0 16px;
        }
        
        .message {
            font-size: 14px;
            line-height: 1.5;
        }
    `,
    ButtonHolder = styled.div`
        display: flex;
        justify-content: flex-end;
        margin: 20px 0 0;
        
        @media (max-width: 767px) {
            justify-content: flex-start;
        }
    `;

export default function Ratings() {
    return (
        <ContentBox>
            <StyledTitleRow>
                <StyledTitleRowTitle>Rating CS:GO</StyledTitleRowTitle>
                <TitleRank>1200 in</TitleRank>
                <TitleAddress>Kiev, Ukraine</TitleAddress>
                <TitleGamers>of 10 568 Gamers</TitleGamers>
            </StyledTitleRow>
            <RatingsRow>
                <RatingsCol>
                    <CircleBox>
                        <div className="title">You’re in the top</div>
                        <div className="circle">
                            <ProgressCircle value={34}/>
                        </div>
                    </CircleBox>
                </RatingsCol>
                <RatingsCol>
                    <ContentIBox>
                        <div className="title">Rise in rankings</div>
                        <div className="sub-title">Lorem ipsum dolor sit amet</div>
                        <div className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui pharetra tellus quisque sit id facilisis. Lacinia venenatis dignissim rhoncus adipiscing.</div>
                        <ButtonHolder>
                            <Button
                                label="Go deeper"
                                variant="secondary"
                                action={() => console.log("Go deeper")}/>
                        </ButtonHolder>
                    </ContentIBox>
                </RatingsCol>
            </RatingsRow>
        </ContentBox>
    )
}