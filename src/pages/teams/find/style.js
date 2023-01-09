import styled from "styled-components";
import {ContentBox, InnerBox} from "../../../components/UI";

export const Styled = {
    Title: styled(InnerBox)`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
        
        .group {
            display: flex;
            align-items: center;

            @media (max-width: 767px) {
                margin-bottom: 8px;
            }
        }

        .message {
            font-weight: 500;
            font-size: 16px;
            line-height: 30px;
            color: #D5CBFF;
            margin-right: 12px;
            position: relative;
            top: 1px;
        }
    `,
    Params: styled.div`
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin: 20px 0 12px;
        width: 100%;

        @media (max-width: 767px) {
            flex-direction: column;
            align-items: flex-start;
        }

        .title {
            p {
                font-weight: 500;
                font-size: 16px;
                line-height: 24px;
                color: #D5CBFF;
                margin: 0 0 8px;
            }
        }
        
        .search {
            @media (max-width: 767px) {
                width: 100%;
                margin-top: 16px;
            }
        }

        input {
            background: #2B244A;
            border-radius: 3px;
            padding: 0 16px;
            height: 46px;
            width: 262px;
            border: none;

            @media (max-width: 767px) {
                width: 100%;
            }
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
    TableTeamHolder: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
    `,
    TableTeam: styled.a`
        display: flex;
        align-items: center;
        text-decoration: none;
        white-space: nowrap;

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
    TableCaptain: styled.a`
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
    NoResult: styled.div`
        font-size: 14px;
        font-weight: 500;
    `,
    TeamsRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
    `,
    TeamsCol: styled.div`
        padding: 0 5px;

        &:first-child {
            width: 25%;

            @media (max-width: 991px) {
                width: 100%;
                order: 1;
            }
        }

        &:last-child {
            width: 75%;

            @media (max-width: 991px) {
                width: 100%;
            }
        }
    `,
    FilterContainer: styled(ContentBox)`
        padding: 20px 10px;
    `,
    FilterTitle: styled(InnerBox)`
        margin: 0;
        padding: 10px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        span {
            font-weight: bold;
            font-size: 18px;
            line-height: 26px;
            color: #D5CBFF;
        }
    `,
    FilterBox: styled(InnerBox)`
        padding: 15px 10px;
        margin: 10px 0 0;
        
        .title {
            font-weight: 500;
            font-size: 16px;
            color: #D5CBFF;
        }
        
        .form-group {
            margin-top: 15px;
            
            label {
                font-size: 14px;
                color: #FFFFFF;
                margin: 0 0 4px;
                display: block;
            }
        }
    `,
}