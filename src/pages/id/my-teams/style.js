import styled from "styled-components";
import {InnerBox, TitleRow} from "../../../components/UI";

export const Styled = {
    MainTitle: styled(TitleRow)`
        justify-content: flex-start;
        h2 {
            width: auto;
        }
    `,
    NoTeams: styled(InnerBox)`
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
        
        .message {
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
        }
        
        .buttons {
            display: flex;

            @media (max-width: 767px) {
                margin-top: 20px;
            }
            
            button + button {
                margin-left: 16px;
            }
        }
    `,
    Looking: styled(InnerBox)`
        margin: 10px 0 0;
        
        label {
            font-weight: bold;
            font-size: 18px;
            color: #fff;
            padding-left: 30px;
        }
        
        .message {
            margin: 12px 0 0;
            font-size: 14px;
            padding-left: 30px;
        }
    `,
    Requests: styled.div`
        margin: 20px 0;
    `,
    TeamTitle: styled.div`
        margin: 20px 0 10px;
        font-weight: bold;
        font-size: 18px;
        line-height: 27px;
        color: #EDA211;
    `,
    TeamRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        
        > div {
            padding: 10px 5px;
            width: 25%;
            
            @media (max-width: 991px) {
                width: 33.3333%;
            }

            @media (max-width: 767px) {
                width: 50%;
            }
        }
    `,
    TeamItem: styled(InnerBox)`
        width: 100%;
        height: 100%;
        cursor: pointer;
        transition: all .3s ease;

        &:hover {
            background: rgba(255,255,255,.1);
        }
        
        img {
            display: block;
            margin: 0 auto 10px;
            max-width: 100%;
            height: 80px;
            
            &.ex {
                filter: grayscale(1);
            }
        }
        
        span {
            display: block;
            text-align: center;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
        }
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
    TableTeam: styled.a`
        display: flex;
        align-items: center;
        text-decoration: none;

        &:hover {
            span {
                text-decoration: underline;
            }
        }

        img {
            max-height: 18px;
            max-width: 18px;
            margin-right: 4px;
        }

        span {
            font-weight: 500;
            font-size: 14px;
            line-height: 27px;
            color: #fff;
        }
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
    RequestsLabel: styled(InnerBox)`
        margin: 0 0 10px;
        padding: 10px 20px;
        font-weight: bold;
        font-size: 18px;
        color: #D5CBFF;
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