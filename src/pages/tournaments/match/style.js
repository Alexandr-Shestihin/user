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
    Body: styled(InnerBox)`
        padding: 10px 20px;
    `,
    MatchNumber: styled.div`
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #D5CBFF;
        margin: 0 0 28px;
    `,
    DetailsRow: styled.div`
        margin: 0 -5px 50px;
        display: flex;
    `,
    DetailsCol: styled.div`
        width: 20%;
        padding: 0 5px;
        font-size: 14px;
        line-height: 21px;
        font-weight: 500;
        
        strong {
            display: block;
            font-weight: bold;
            text-transform: uppercase;
        }
    `,
    BattleRow: styled.div`
        display: flex;
        margin: 0 -5px;
    `,
    BattleCol: styled.div`
        padding: 0 5px;
        width: 40%;
        
        &.vs {
            width: 20%;
            display: flex;
            justify-content: center;
            padding-top: 60px;
            
            span {
                font-weight: bold;
                font-size: 24px;
                line-height: 36px;
                color: #D5CBFF;
            }
        }
        
        .team {
            
            &-image {
                width: 150px;
                height: 150px;
                padding: 15px;
                margin: 0 auto 10px;
                background: rgba(255,255,255,.05);
                display: flex;
                align-items: center;
                justify-content: center;
                
                img {
                    display: block;
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            
            &-name {
                font-weight: bold;
                font-size: 18px;
                line-height: 27px;
                text-align: center;
                color: #D5CBFF;
                margin: 0 0 12px;
            }
        }
    `,
    StatusControl: styled.div`
        white-space: nowrap;
        font-weight: 500;
        color: #fff;
        font-size: 14px;
        
        .not-ready {
            opacity: .5;
        }
        
        .confirm {
            color: #EDA211;
            text-decoration: underline;
            cursor: pointer;
            
            &:hover {
                text-decoration: none;
            }
        }
    `,
    Polls: styled.div`
        max-width: 640px;
        margin: 24px auto 0;
    `,
    PollRow: styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 0 -10px;
    `,
    PollCol: styled.div`
        width: 25%;
        padding: 0 10px;
        margin: 0 0 30px;
        
        .item.is-voter {
            cursor: pointer;
            
            &:hover {
                .image {
                    filter: grayscale(0)
                }
            }
        }
        
        .item.is-banned {
            pointer-events: none;
            
            .image {
                opacity: .5;
                filter: grayscale(1) blur(1px);
            }
        }
        
        .item.is-picked {
            pointer-events: none;

            .image {
                filter: grayscale(0);
            }
            
            button {
                pointer-events: auto;
            }
            
            .details {
                pointer-events: auto;
                margin: 0 0 8px;
                
                &-item {
                    text-align: center;

                    a {
                        text-decoration: underline;
                        cursor: pointer;
                        font-weight: 500;
                        color: #D5CBFF;
                        font-size: 14px;
                    }
                }
            }
        }
        
        .name {
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            text-transform: uppercase;
            margin: 0 0 4px;
            text-align: center;
            
            .red {
                b {
                    color: #E50808
                }
            }
            
            .green {
                b {
                    color: #14C911
                }
            }
        }
        
        .image {
            height: 90px;
            background-size: cover !important;
            transition: all .3s ease;
            position: relative;
            filter: grayscale(1);
        }
    `,
    Side: styled.div`
        display: flex;
        justify-content: center;
        margin: 0 0 24px;
        
        .team {
            color: #EDA211;
        }
    `
}