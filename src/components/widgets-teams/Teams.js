import React from "react";
import styled from "styled-components";
import {ContentBox, InnerBox, ButtonRow, ArrowButton} from "../UI";
import HRIcon from '../../assets/HellRaisers.png';

const Title = styled.div`
        font-weight: 500;
        font-size: 21px;
        color: #D5CBFF;
        margin: 0 0 20px;
        text-align: center;
        
        @media (max-width: 767px) {
            font-size: 18px;
        }
    `,
    InnerTitle = styled.div`
        font-weight: 500;
        font-size: 18px;
        margin: 0 0 20px;
        text-align: center;
    `,
    Image = styled.div`
        width: 106px;
        margin: 0 auto;

        & + & {
            margin-top: 20px;
        }
        
        &.muted {
            img {
                filter: grayscale(100%);
            }
        }
        
        img {
            display: block;
            max-width: 100%;
        }
    `,
    StyledInnerBox = styled(InnerBox)`
        & + & {
            margin-top: 10px;
        }
    `,
    StyledContentBox = styled(ContentBox)`
        padding: 30px 20px;
    `;

export default function Teams() {
    return (
        <StyledContentBox>
            <Title>Team</Title>
            <StyledInnerBox>
                <InnerTitle>Current teams</InnerTitle>
                <div>
                    <Image>
                        <img src={HRIcon} alt="team"/>
                    </Image>
                    <Image>
                        <img src={HRIcon} alt="team"/>
                    </Image>
                </div>
            </StyledInnerBox>
            <StyledInnerBox>
                <InnerTitle>Previous teams</InnerTitle>
                <div>
                    <Image className="muted">
                        <img src={HRIcon} alt="team"/>
                    </Image>
                    <Image className="muted">
                        <img src={HRIcon} alt="team"/>
                    </Image>
                </div>
            </StyledInnerBox>
            <ButtonRow direction="center">
                <ArrowButton action={() => console.log('view all')} label="View all"/>
            </ButtonRow>
        </StyledContentBox>
    )
}