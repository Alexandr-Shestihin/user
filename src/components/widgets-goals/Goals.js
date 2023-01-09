import React from "react";
import styled from "styled-components";
import {ContentBox, InnerBox, ButtonRow, ArrowButton} from "../UI";

const renderStar = () => (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.50002 0L8.53027 3.92121L13 4.58356L9.78504 7.66941L10.5173 12L6.50002 9.9859L2.48282 12L3.215 7.66941L0 4.58356L4.46981 3.92121L6.50002 0Z" fill="#EDA211"/>
    </svg>
);

const StyledInnerBox = styled(InnerBox)`
        & + & {
            margin-top: 10px;
        }
        
        @media (max-width: 767px) {
            padding: 10px;
        }
    `,
    Title = styled.div`
        display: flex;
        align-items: center;
        
        div {
            font-weight: 500;
            font-size: 18px;
            white-space: nowrap;
            
            @media (max-width: 991px) {
                font-size: 16px;
            }
            
            @media (max-width: 767px) {
                font-size: 14px;
            }
        }
        
        .icon {
            width: 28px;
            height: 28px;
            background: #201941;
            border: 2px solid #3F317C;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            
            display: flex;
            align-items: center;
            justify-content: center;
            
            svg {
                position: relative;
                left: 1px;
            }
        }
    `,
    Data = styled.div`
        font-size: 14px;
        margin-top: 16px;
    `,
    StyledContentBox = styled(ContentBox)`
        padding: 30px 20px;
        
        &.mobile {
            display: none;
            
            .row {
                display: flex;
                flex-wrap: wrap;
                margin: 0 -5px;
            }
            
            .col {
                width: 25%;
                height: 100%;
                padding: 0 5px;
                
                @media (max-width: 767px) {
                    width: 50%;
                    margin-top: 10px;
                    
                    &:nth-child(1),
                    &:nth-child(2) {
                        margin-top: 0;
                    }
                }
            }
            
            @media (max-width: 991px) {
                display: block;
            }
        }
        
        &.desktop {
            display: block;
            
            .col + .col {
                margin-top: 10px;
            }
            
            @media (max-width: 991px) {
                display: none;
            }
        }
   `;

export default function Goals({hideOnMobile}) {
    return (
        <StyledContentBox className={hideOnMobile ? 'desktop' : 'mobile'}>
            <div className="row">
                <div className="col">
                    <StyledInnerBox>
                        <Title>
                            <div className="icon">
                                {renderStar()}
                            </div>
                            <div>Rating:</div>
                        </Title>
                        <Data>1200 in Kiev</Data>
                        <Data>12 at the KNTEO</Data>
                        <ButtonRow direction="right">
                            <ArrowButton
                                label="Details"
                                action={() => console.log('Details')}/>
                        </ButtonRow>
                    </StyledInnerBox>
                </div>
                <div className="col">
                    <StyledInnerBox>
                        <Title>
                            <div className="icon">
                                {renderStar()}
                            </div>
                            <div>Wallet:</div>
                        </Title>
                        <Data>503 EUR</Data>
                        <Data>127 GG</Data>
                        <ButtonRow direction="right">
                            <ArrowButton
                                label="Details"
                                action={() => console.log('Details')}/>
                        </ButtonRow>
                    </StyledInnerBox>
                </div>
                <div className="col">
                    <StyledInnerBox>
                        <Title>
                            <div className="icon">
                                {renderStar()}
                            </div>
                            <div>CS GO</div>
                        </Title>
                        <Data>Games: 98765</Data>
                        <Data>Won: 656</Data>
                        <ButtonRow direction="right">
                            <ArrowButton
                                label="Details"
                                action={() => console.log('Details')}/>
                        </ButtonRow>
                    </StyledInnerBox>
                </div>
                <div className="col">
                    <StyledInnerBox>
                        <Title>
                            <div className="icon">
                                {renderStar()}
                            </div>
                            <div>Time spent</div>
                        </Title>
                        <Data>Total: 98765Hh</Data>
                        <Data>Last week: 12h</Data>
                        <ButtonRow direction="right">
                            <ArrowButton
                                label="Details"
                                action={() => console.log('Details')}/>
                        </ButtonRow>
                    </StyledInnerBox>
                </div>
            </div>
        </StyledContentBox>
    )
}