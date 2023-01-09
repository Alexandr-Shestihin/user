import styled from "styled-components";
import {InnerBox} from "../../../components/UI";

export const Styled = {
    Header: styled(InnerBox)`
        padding: 10px 20px;
        margin: 0 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #D5CBFF;
        
        .game {
            font-weight: bold;
            font-size: 16px;
        }
        
        .link {
            flex-shrink: 0;
            margin-left: 16px;
            cursor: pointer;
            color: #D5CBFF;
            font-weight: 500;
            font-size: 16px;
            line-height: 24px;
            
            &:hover {
                text-decoration: underline;
            }
        }
    `,
    Section: styled.div`
        margin: 0 0 10px;
    `,
    SectionTitle: styled(InnerBox)`
        margin: 0 0 1px;
        padding: 10px 20px;
        font-weight: bold;
        font-size: 18px;
    `,
    SectionBody: styled(InnerBox)`
        padding: 20px;
        font-weight: 500;
        font-size: 14px;
    `,
    Info: styled(InnerBox)`
        .image {
            height: 140px;
            width: 100%;
            background: #201941;
            border-radius: 3px;
            padding: 10px;

            display: flex;
            align-items: center;
            justify-content: center;

            img {
                max-width: 100%;
                max-height: 100%;
                display: block;
            }
        }

        .details {
            &__item {
                display: flex;

                > strong {
                    font-weight: normal;
                    font-size: 14px;
                    color: #D5CBFF;
                    margin-right: 10px;
                }

                > div {
                    font-weight: 500;
                    font-size: 14px;
                }

                & + .details__item {
                    margin-top: 10px;
                }
            }
        }

        .register {
            width: 100%;
            padding: 15px;
            border: 1px solid rgba(213, 203, 255, .2);
            border-radius: 3px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .players {
                font-weight: 500;
                font-size: 14px;
                margin: 15px 0;
                color: #D5CBFF;
            }

            .progress {
                height: 30px;
                width: 100%;
                border: 1px solid rgba(213, 203, 255, .2);
                border-radius: 15px;
                display: flex;
                overflow: hidden;

                .active {
                    background: rgba(213, 203, 255, .2);
                    padding: 0 15px;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 30px;
                    color: #FFFFFF;
                    border-radius: 15px;
                    overflow: hidden;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            
            button {
                width: 100%;
            }
        }
    `,
    Tabs: styled(InnerBox)`
        margin: 0 0 10px;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    `,
    Tab: styled.div`
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        line-height: 21px;
        color: #D5CBFF;
        
        &.is-active {
            color: #EDA211;
        }
        
        & + & {
            margin-left: 30px;
        }
    `,
    NoResults: styled.div`
        font-size: 14px;
        font-weight: 500;
        padding-left: 20px;
    `,
    Player: styled.a`
        display: flex;
        align-items: center;
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
        
        .picture {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            background: ${(props) => props.image ? `#eee url(${props.image}) no-repeat center center` : '#eee'};
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
        
        .name {
            white-space: nowrap;
            
            &.current {
                color: #EDA211;
            }
        }
    `,
    Country: styled.div`
        display: flex;
        align-items: center;

        img {
            max-height: 24px;
            max-width: 24px;
            margin-right: 8px;
        }

        span {
            font-weight: 500;
            font-size: 14px;
            line-height: 27px;
            color: #fff;
        }
    `,
    RoundTitle: styled(InnerBox)`
        margin: 0 0 1px;
        padding: 10px 20px;
        font-weight: bold;
        font-size: 14px;
        display: flex;
        
        span {
            cursor: pointer;
        }
        
        .is-active {
            color: #EDA211;
        }
    `,
    Match: styled.div`
        display: flex;
        margin-top: 2px;
        cursor: pointer;

        &:hover {
            .item {
                background: rgba(63, 49, 124, .75);
            }
        }
        
        .vs {
            width: 6%;
            line-height: 40px;
            text-align: center;
            font-weight: 500;
            color: #D5CBFF;
        }
        
        .item {
            width: 37%;
            flex-shrink: 0;
            background: rgba(63, 49, 124, .25);
            transition: all .3s ease;
            line-height: 40px;
            white-space: nowrap;
            font-weight: 500;
            font-size: 14px;
            display: flex;
            
            &-name {
                width: 100%;
                padding: 0 20px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                
                &.current {
                    color: #EDA211;
                }
            }
            
            &-score {
                width: 40px;
                background: rgba(63, 49, 124, .25);
                flex-shrink: 0;
                text-align: center;
                border-left: 1px solid #201941;
                border-right: 1px solid #201941;
            }
            
            &-result {
                width: 40px;
                background: rgba(63, 49, 124, .25);
                flex-shrink: 0;
                text-align: center;
                border-left: 1px solid #201941;
                border-right: 1px solid #201941;
                
                &.winner {
                    color: #14C911
                }
                
                &.loser {
                    color: #EB5757
                }
            }
        }
        
        .starts {
            width: 20%;
            line-height: 40px;
            font-weight: 500;
            font-size: 14px;
            padding: 0 16px;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        
        .item.left {
            .item-name {
                border-right: 1px solid #201941;
            }
        }

        .item.right {
            .item-name {
                border-left: 1px solid #201941;
                text-align: right;
            }
        }
        
        
    `,
    Team: styled.a`
        padding-top: 4px;
        display: flex;
        align-items: center;
        color: #fff;
        text-decoration: none;
        
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
        
        .name {

            &.current {
                color: #EDA211;
            }
            
            &:hover {
                text-decoration: underline;
            }
        }
    `
};