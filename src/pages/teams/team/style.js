import {InnerBox} from "../../../components/UI";
import styled from "styled-components";

export const Styled = {
    Title: styled(InnerBox)`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 15px;
        margin: 0 0 10px;
        
        .name {
            font-weight: bold;
            font-size: 21px;
            line-height: 31px;
            color: #D5CBFF;
        }
        
        .game {
            font-weight: bold;
            font-size: 21px;
            line-height: 31px;
            color: #EDA211;
            text-transform: uppercase;
        }
    `,
    Image: styled(InnerBox)`
        width: 100%;
        height: 100%;
        
        .holder {
            width: 100px;
            height: 100px;
            max-width: 100%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
    `,
    Description: styled(InnerBox)`
        height: 100%;
        width: 100%;
        
        strong {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            color: #D5CBFF;
            display: block;
            margin: 0 0 16px;
        }
        
        p {
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            color: #FFFFFF;
        }
    `,
    Row: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px 10px;
    `,
    Col: styled.div`
        padding: 0 5px;
        width: 100%;
        
        & + & {
            @media (max-width: 767px) {
                margin-top: 10px;
            }
        }
        
        &.w-25 {
            width: 25%;
            
            @media (max-width: 767px) {
                width: 100%;
            }
        }

        &.w-50 {
            width: 50%;

            @media (max-width: 767px) {
                width: 100%;
            }
        }

        &.w-75 {
            width: 75%;

            @media (max-width: 767px) {
                width: 100%;
            }
        }
        
        &.control-sm {
            display: none;

            @media (max-width: 767px) {
                display: block;
            }
        }

        &.control-lg {
            @media (max-width: 767px) {
                display: none;
            }
        }
    `,
    SectionTitle: styled.div`
        font-size: 14px;
        line-height: 21px;
        color: #D5CBFF;
        margin: 0 0 4px;
    `,
    InnerBox: styled(InnerBox)`
        height: 100%;
    `,
    TableCountry: styled.div`
        display: flex;
        align-items: center;

        img {
            max-height: 24px;
            max-width: 24px;
            margin-right: 4px;
        }

        span {
            font-weight: 500;
            font-size: 14px;
            line-height: 27px;
            color: #fff;
        }
    `,
    TableDate: styled.div`
        span {
            font-weight: 500;
            font-size: 14px;
            line-height: 27px;
            color: #fff;
        }
    `,
    Controls: styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        @media (max-width: 767px) {
            justify-content: flex-start;
            margin: 20px 0;
        }
        
        button + button {
            margin-left: 16px;
        }
    `,
    LineUp: styled(InnerBox)`
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px 15px;
        margin: 0 0 10px;
        
        @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
        }
    `,
    Stage: styled.div`
        
        & + & {
            margin-left: 32px;

            @media (max-width: 767px) {
                margin-left: 0;
                margin-top: 12px;
            }
        }
        
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        
        color: ${props => props.active ? '#EDA211' : '#D5CBFF'}
    `,
    PlayersRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    PlayerCol: styled.div`
        padding: 0 5px;
        width: 20%;
        
        @media (max-width: 1199px) {
            width: 25%;
        }

        @media (max-width: 991px) {
            width: 33.3333%;
        }

        @media (max-width: 767px) {
            width: 50%;
        }
    `,
    Player: styled(InnerBox)`
        position: relative;
        transition: all .3s ease;
        cursor: pointer;
        width: ${props => props.inModal ? '160px' : '100%'};
        margin: ${props => props.inModal ? '0 auto' : '0'};
        
        &:hover {
            background: rgba(255,255,255,.1);
        }
        
        .control-holder {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 1;
        }
        
        .nickname {
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            text-align: center;
            color: #D5CBFF;
            margin: 0 0 8px;
        }

        .username {
            margin: 8px 0 0;
            font-size: 14px;
            text-align: center;
            color: #FFFFFF;
            
            &.captain {
                color: #EDA211;
            }
        }
    `,
    AvatarHolder: styled.div`
        width: 70px;
        height: 70px;
        margin: 0 auto;
        position: relative;
        
        .flag {
            position: absolute;
            bottom: 2px;
            right: 2px;
            
            img {
                width: 18px;
            }
        }
    `,
    Avatar: styled.div`
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        background: ${props => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
        background-size: cover;
        
        &.historic {
            filter: grayscale(1);
        }
        
        &.top-gamer {
            border: 2px solid #EDA211;
        }
    `,
    OnlineStatus: styled.div`
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #14C911;
        border: 2px solid #201941;
        position: absolute;
        top: -2px;
        right: 2px;
    `,
    NoResults: styled.div`
        font-size: 14px;
        font-weight: 500;
        padding-left: 20px;
    `,
    TableFooter: styled(InnerBox)`
        margin: 10px 0 0;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 500;
        font-size: 14px;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
        
        span {
            color: #D5CBFF;
        }
        
        button {
            border: none;
            border-radius: 0;
            cursor: pointer;
            background: transparent;
            padding: 0;
            color: #fff;
            opacity: .5;
            font-weight: 500;
            outline: none;
            
            &.skipper {
                pointer-events: none;
            }
            
            &.active {
                opacity: 1;
                pointer-events: none;
            }
        }
        
        button + button {
            margin-left: 15px;
        }
        
        .show {
            display: flex;
            align-items: center;
            
            @media (max-width: 767px) {
                margin-top: 10px;
            }
        }
        
        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .controls {
            display: flex;
            align-items: center;
            margin-left: 15px;
        }
    `,
    TableGamer: styled.a`
        display: flex;
        align-items: center;
        cursor: pointer;
        text-decoration: none;
        color: #fff;
        
        &:hover {
            text-decoration: underline;
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
    TableActions: styled.div`
        display: flex;
        justify-content: flex-end;
        
        span {
            cursor: pointer;
            display: block;
            font-weight: 500;
            color: #D5CBFF;
            
            + span {
                margin-left: 8px;    
            }
            
            &:hover {
                text-decoration: underline;
            }
        }
    `
}