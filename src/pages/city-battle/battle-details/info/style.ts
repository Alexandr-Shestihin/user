import styled from "styled-components";
import {InnerBox} from '../../../../components/UI/index';

import iconDota2 from '../../../../assets/games/dota2.png'

export const Styled = {
    InfoWrapper: styled.div`
        width: 500px;
        max-width: 100%;
        margin: 0 auto;
        
        @media (max-width: 1199px) {
            width: 350px;
        }
    `,
    Container: styled(InnerBox)`
        padding: 20px 30px 30px;
        text-align: center;
        position: relative;
        
        @media (max-width: 767px) {
            padding: 20px;
        }
        
        &.dota2::before {
            content: '';
            display: block;
            width: 116px;
            height: 116px;
            background: url(${iconDota2}) no-repeat center center;
            background-size: cover;
            position: absolute;
            top: 30px;
            right: 30px;
            
            @media (max-width: 767px) {
                position: static;
                margin: 0 auto 20px;
            }
        }
    `,
    Title: styled.div`
        font-weight: bold;
        font-size: 24px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: #EDA211;
        margin: 0 0 12px;
        
        @media (max-width: 767px) {
            font-size: 21px;
        }
    `,
    Date: styled.div`
        font-weight: bold;
        font-size: 21px;
        color: #D5CBFF;
        margin: 0 0 12px;
        
        @media (max-width: 767px) {
            font-size: 18px;
        }
    `,
    FinalMatch: styled.div`
        font-weight: 500;
        font-size: 16px;
        margin: 20px 0;
        
        strong {
            font-size: 21px;
        }
    `,
    Description: styled.div`
        font-size: 14px;
        margin: 20px 0;
        
        @media (max-width: 1199px) {
            br {
                display: none;
            }
        }
    `,
    SocialIcons: styled.div`
        display: flex;
        justify-content: center;
        margin: 30px 0;
        
        a {
            background: rgba(255,255,255,.05);
            border-radius: 3px;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            & + a {
                margin-left: 10px;
            }
            
            svg {
                display: block;
            }
        }
    `,
    RewardsTitle: styled.div`
        font-weight: bold;
        font-size: 21px;
        margin: 0 0 10px;
    `,
    RewardsSlider: styled.div`
        .slick-slide {
            img {
                display: block;
                max-width: 70px;
                margin: 0 auto;
            }
        }
        
        .slick-arrow::before {
            display: none !important;
        }
        
        .slick-disabled {
            opacity: .5;
        }
    `
}