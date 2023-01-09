import styled from "styled-components";
import {InnerBox} from '../../../../components/UI/index';

export const Info = {
    Wrapper: styled(InnerBox)`
        padding: 20px 30px 30px;
        margin-top: 10px;
        
        @media (max-width: 767px) {
            padding: 20px;
        }
        
        .vs {
            font-weight: bold;
            font-size: 24px;
            text-align: center;
            color: #EDA211;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 12px;
            flex-shrink: 0;
            
            @media (max-width: 767px) {
                margin: 10px 0;
            }
        }
    `,
    CardHolder: styled.div`
        display: flex;
        justify-content: space-between;
        
        @media (max-width: 767px) {
            flex-direction: column;
        }
    `,
    Card: styled.div`
        background: #201941;
        border-radius: 3px;
        padding: 30px 20px 20px;
        width: 40%;
        
        @media (max-width: 767px) {
            width: 100%;
        }
        
        .city {
            font-weight: bold;
            font-size: 24px;
            text-align: center;
            margin: 0 0 4px;
        }
        
        .country {
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            margin: 0 0 10px;
        }
        
        .image {
            width: 114px;
            height: 114px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            
            img {
                display: block;
                max-height: 100%;
                max-width: 100%;
            }
        }
        
        hr {
            margin: 20px 0;
            border: none;
            height: 1px;
            background: #D5CBFF;
            opacity: 0.1;
        }
        
        .details {
       
            &-row {
                display: flex;
                
                @media (max-width: 1199px) {
                    margin: 0 -15px;
                }
                
                & + .details-row {
                    margin-top: 4px;
                }
            }
            
            &-col {
                padding: 0 15px;
                
                &:first-child {
                    font-weight: 600;
                    font-size: 14px;
                    color: #D5CBFF;
                    width: 60%;
                }
                
                &:last-child {
                    font-size: 14px;
                    width: 40%;
                }
            }
        }
    `
}

export const Vote = {
    Holder: styled.div`
        padding: 40px 0;
        border-bottom: 1px solid rgba(213, 203, 255, .1);
        
        .flex-group {
            display: flex;
            justify-content: center;
            align-items: center;
            
            @media (max-width: 767px) {
                flex-direction: column;
            }
            
            &-results {
                align-items: flex-end;
                
                @media (max-width: 767px) {
                    flex-direction: row;
                }
            }
        }
        
        .flex-group + .flex-group {
            margin-top: 30px;
        }
        
        .vs {
            font-weight: 500;
            font-size: 16px;
            color: #FFBE3F;
            margin: 0 90px;
            width: 114px;
            
            &-result {
                font-size: 21px;
                line-height: 30px;
                
                @media (max-width: 767px) {
                    margin: 0 !important;
                    font-size: 18px;
                }
            }
            
            @media (max-width: 1199px) {
                margin: 0 30px;
            }
            
            @media (max-width: 767px) {
                margin: 10px 0;
            }
        }
        
        .result {
            width: 144px;
            
            .votes {
                font-weight: bold;
                font-size: 18px;
                
                &-right {
                    text-align: right;
                }
                
                @media (max-width: 767px) {
                    font-size: 14px;
                }
            }
            
            .view {
                height: 30px;
                border-radius: 3px;
                background: rgba(127, 173, 255, .15);
                margin: 2px 0 0;
                width: 100%;
                position: relative;
            }
            
            .progress {
                position: absolute;
                top: 0;
                left: 0;
                height: 30px;
                z-index: 1;
                border-radius: 3px;
                max-width: 100%;
                
                &-left {
                    background: #7FADFF;
                }
                
                &-right {
                    background: #4A48A0;
                }
            }
            
            .txt {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 2;
                font-weight: bold;
                font-size: 18px;
                line-height: 30px;
                text-align: center;
                
                @media (max-width: 767px) {
                    font-size: 14px;
                }
            }
        }
        
        button {
            height: 44px;
            padding: 0 5px;
            min-width: 144px;
            cursor: pointer;
            background: #D5CBFF;
            border-radius: 22px;
            
            font-size: 14px;
            color: #201941;
            border: none;
            outline: none;
            position: relative;
            overflow: hidden;
            
            .icon {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                opacity: 0;
                background: #D5CBFF;
                display: flex;
                align-items: center;
                justify-content: center;
                
                svg {
                    position: relative;
                    top: -1px;
                }
            }
            
            &:hover .icon {
                opacity: 1;
                transition: opacity .2s ease;
            }
        }
    `
}

export const Details = {
    Wrapper: styled.div`
        padding: 30px 0 20px;
    `,
    Title: styled.div`
        font-weight: bold;
        font-size: 21px;
        margin: 0 0 10px;
        text-align: center;
    `,
    Legend: styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0 16px;
        
        .name {
            font-size: 14px;
        }
        
        .marker {
            height: 10px;
            width: 22px;
            border-radius: 5px;
            margin-right: 6px;
            
            &.left {
                background: #7FADFF;
            }
            
            &.right {
                background: #4A48A0;
            }
        }
        
        .spacer {
            margin: 0 6px;
        }
    `,
    Line: styled.div`
        display: flex;
        align-items: center;
        
        & + & {
            margin-top: 20px;
        }
        
        .name {
            font-weight: 500;
            font-size: 14px;
            color: #D5CBFF;
            width: 90px;
            flex-shrink: 0;
        }
        
        .values {
            width: 50px;
            flex-shrink: 0;
            margin-left: 12px;
            
            .value {
                font-weight: 500;
                font-size: 14px;
                
                &-left {
                    color: #7FADFF;
                }
                
                &-right {
                    color: #4A48A0;
                }
            }
        }
        
        .lines {
            width: 100%;
            
            .base {
                height: 10px;
                border-radius: 5px;
                background: rgba(127, 173, 255, .15);
                position: relative;
                
                & + .base {
                    margin-top: 8px;
                }
            }
            
            .progress {
                height: 10px;
                border-radius: 5px;
                position: absolute;
                left: 0;
                top: 0;
                max-width: 100%;
                
                &.left {
                    background: #7FADFF;
                }
                
                &.right {
                    background: #4A48A0;
                }
            }
        }
    `
}